# Plan: Fix Vercel build failure caused by SSH-only Git dependency

## Objective
- Ensure `npm install` on Vercel succeeds by removing SSH-only Git fetches for the `oks-ui` dependency.
- Keep usage of `oks-ui` components unchanged in application code.

## Current Findings
- `package.json` declares: `oks-ui: git+https://github.com/OKS-ORG/fork-oks-ui-v1.git#main`. See [package.json](file:///Volumes/Work/oks-ui/oks-ui-v1-test/package.json#L1-L32).
- Build logs show npm executes `git ls-remote ssh://git@github.com/OKS-ORG/fork-oks-ui-v1.git`, failing with `Permission denied (publickey)`, indicating an SSH resolution step occurs despite HTTPS in `package.json`.
- No lockfile is committed, so Vercel creates one during build. The remote repo likely contains submodules or nested dependencies using SSH, causing npm to fall back to SSH.

## Root Cause Hypothesis
- The dependency repository or its submodules uses SSH URLs (`git@github.com:`), which Vercel cannot access without deploy keys, causing `npm install` to fail.

## Implementation Plan
1. Audit for SSH references
   - Confirm there are no SSH refs in this repo. If present, convert to HTTPS.
   - Inspect the remote `OKS-ORG/fork-oks-ui-v1` repo for:
     - `.gitmodules` entries using `git@github.com:...`
     - `package.json` dependencies using `git+ssh` or `git@github.com:` shorthands
     - Any scripts fetching via SSH

2. Decide remediation path
   - Path A (preferred if remote is public and has no SSH submodules):
     - Keep HTTPS; use GitHub shorthand `github:OKS-ORG/fork-oks-ui-v1#main` to ensure HTTPS resolution.
   - Path B (robust, avoids external Git during build):
     - Vendor `oks-ui` as a local tarball dependency to eliminate remote Git access on Vercel.

3. Implement Path A (HTTPS-only)
   - Update [package.json](file:///Volumes/Work/oks-ui/oks-ui-v1-test/package.json#L1-L32) dependency to:
     - `"oks-ui": "github:OKS-ORG/fork-oks-ui-v1#main"`
   - Remove any `.npmrc` settings that force SSH (none present currently).
   - Regenerate lockfile locally:
     - Delete `node_modules` and any lockfile.
     - Run `npm install` and commit the generated `package-lock.json`.
   - If Vercel still resolves to SSH (due to upstream submodules), switch to Path B.

4. Implement Path B (Vendor tarball)
   - Create `vendor/` directory at repo root and add an `oks-ui` tarball:
     - Obtain tarball via HTTPS (e.g., `npm pack` or GitHub archive for `main`).
     - Name file `vendor/oks-ui.tgz` and commit it.
   - Update [package.json](file:///Volumes/Work/oks-ui/oks-ui-v1-test/package.json#L1-L32) to:
     - `"oks-ui": "file:vendor/oks-ui.tgz"`
   - Remove lockfile and `node_modules`, then `npm install` locally to verify resolution.
   - Commit `package-lock.json` to ensure deterministic installs on Vercel.

5. Verification
   - Local: `npm install` runs without Git SSH prompts; `vite build` succeeds.
   - CI: Trigger Vercel build; confirm `npm install` completes and site builds.

6. Contingencies
   - If `oks-ui` repo is private and cannot be made public:
     - Continue with Path B (vendor).
     - Alternatively, configure Vercel Project with a read-only deploy key or a GitHub token and convert upstream URLs to HTTPS—requires platform configuration changes.

7. Deliverables
   - Updated `package.json` reflecting chosen path.
   - Committed `package-lock.json`.
   - If Path B: committed `vendor/oks-ui.tgz`.
   - Short note in `README.md` explaining dependency strategy for CI builds.

## Rollback Plan
- Revert `package.json` and lockfile changes via git if needed.
- Remove `vendor/oks-ui.tgz` when switching back to remote Git resolution.

## Notes
- Application imports like `import { Button } from "oks-ui";` remain unchanged.
- This plan avoids introducing SSH credentials into build environments and favors HTTPS-only or vendored dependencies.

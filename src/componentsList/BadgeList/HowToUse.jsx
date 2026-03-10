import React from "react";
import { Badge } from "oks-ui";
import { ShowCode } from "../../components";

const HowToUse = () => {
  return (
    <ShowCode
      title="How to usage"
      preview={
        <div className="flex gap-6 items-center flex-wrap">
          <Badge content={5} aria-label="5 unread notifications">
            <button type="button" className="px-3 py-2 rounded-md border">
              Notifications
            </button>
          </Badge>
          <Badge isDot aria-label="Has new activity">
            <button type="button" className="px-3 py-2 rounded-md border">
              Activity
            </button>
          </Badge>
        </div>
      }
      code={
        <>
          {`import { Badge } from "oks-ui";

<Badge content={5} aria-label="5 unread notifications">
  <button type="button">Notifications</button>
</Badge>

<Badge isDot aria-label="Has new activity">
  <button type="button">Activity</button>
</Badge>`}
        </>
      }
    />
  );
};

export default HowToUse;


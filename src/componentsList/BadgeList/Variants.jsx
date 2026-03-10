import React from "react";
import { Badge } from "oks-ui";
import { ShowCode } from "../../components";

const Variants = () => {
  return (
    <ShowCode
      title="Variants"
      preview={
        <div className="flex gap-6 items-center flex-wrap">
          <Badge content={3} variant="solid" aria-label="3 items">
            <span className="px-3 py-2 rounded-md border">solid</span>
          </Badge>
          <Badge content={3} variant="flat" aria-label="3 items">
            <span className="px-3 py-2 rounded-md border">flat</span>
          </Badge>
          <Badge content={3} variant="faded" aria-label="3 items">
            <span className="px-3 py-2 rounded-md border">faded</span>
          </Badge>
          <Badge content={3} variant="shadow" aria-label="3 items">
            <span className="px-3 py-2 rounded-md border">shadow</span>
          </Badge>
        </div>
      }
      code={
        <>
          {`import { Badge } from "oks-ui";

<Badge content={3} variant="solid">...</Badge>
<Badge content={3} variant="flat">...</Badge>
<Badge content={3} variant="faded">...</Badge>
<Badge content={3} variant="shadow">...</Badge>`}
        </>
      }
    />
  );
};

export default Variants;


import React from "react";
import { ShowCode } from "../../components";
import { Avatar } from "oks-ui";

const ColorDepth = () => {
  return (
    <ShowCode
      title="Color depth"
      preview={
        <div className="flex gap-3 items-center flex-wrap">
          <Avatar name="50" color="primary" colorDepth={50} />
          <Avatar name="200" color="primary" colorDepth={200} />
          <Avatar name="400" color="primary" colorDepth={400} />
          <Avatar name="500" color="primary" colorDepth={500} />
          <Avatar name="700" color="primary" colorDepth={700} />
          <Avatar name="900" color="primary" colorDepth={900} />
        </div>
      }
      code={
        <>
          {`import { Avatar } from "oks-ui";

<Avatar name="50" color="primary" colorDepth={50} />
<Avatar name="200" color="primary" colorDepth={200} />
<Avatar name="400" color="primary" colorDepth={400} />
<Avatar name="500" color="primary" colorDepth={500} />
<Avatar name="700" color="primary" colorDepth={700} />
<Avatar name="900" color="primary" colorDepth={900} />`}
        </>
      }
    />
  );
};

export default ColorDepth;

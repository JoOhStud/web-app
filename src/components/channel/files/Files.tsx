import React from "react";
import { dummyChannels } from "../../../dummyData/dummyData";

interface FilesProps {
  channelId: number;
}

const Files: React.FC<FilesProps> = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h3>Files for {dummyChannels[0].name}</h3>
      <p>Uploaded files and documents will be listed here.</p>
    </div>
  );
};

export default Files;

import React from "react";
import { dummyDog } from "../../../dummyData/dummyDog";

interface DiaryProps {
  dogId: number;
}

const Diary: React.FC<DiaryProps> = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h3>Diary for {dummyDog.name}</h3>
      <p>This section will include a diary or log of events.</p>
    </div>
  );
};

export default Diary;

import React from "react";
import { dummyDog } from "../../../dummyData/dummyDog";

interface DogInfoProps {
  dogId: number;
}

const DogInfo: React.FC<DogInfoProps> = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h3>Dog Info for {dummyDog.name}</h3>
      <p>Details about the dog (breed, age, etc.) will be shown here.</p>
    </div>
  );
};

export default DogInfo;

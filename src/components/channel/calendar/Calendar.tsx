import React from "react";
import { dummyChannels } from "../../../dummyData/dummyData";

interface CalendarProps {
  channelId: number;
}

const Calendar: React.FC<CalendarProps> = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h3>Calendar for {dummyChannels[0].name}</h3>
      <p>Scheduled events and appointments will appear here.</p>
    </div>
  );
};

export default Calendar;

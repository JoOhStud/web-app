import React, { useState } from "react";
import { PostData } from "../../types/Posts.types";
import { Channel } from "../../types/types";
import Diary from "../dogProfile/diary/Diary";
import DogInfo from "../dogProfile/dogInfo/DogInfo";
import Calendar from "./calendar/Calendar";
import { TabsContainer, TabButton } from "./ChannelContent.styles";
import Conversations from "./conversations/Conversations";
import Files from "./files/Files";
import { dummyDog } from "../../dummyData/dummyDog";

interface ChannelContentProps {
  channel: Channel;
  posts: PostData[];
  onAddPost: (content: string) => void;
  onAddComment: (postId: string, comment: string) => void;
}

const ChannelContent: React.FC<ChannelContentProps> = ({
  channel,
  posts,
  onAddPost,
  onAddComment,
}) => {
  const tabs = ["Conversations", "Dog Info", "Diary", "Calendar", "Files"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div>
      <TabsContainer>
        {tabs.map((tab) => (
          <TabButton
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabsContainer>
      <div>
        {activeTab === "Conversations" && (
          <Conversations
            posts={posts}
            onAddPost={onAddPost}
            onAddComment={onAddComment}
          />
        )}
        {activeTab === "Dog Info" && <DogInfo dogId={dummyDog.id} />}
        {activeTab === "Diary" && <Diary dogId={dummyDog.id} />}
        {activeTab === "Calendar" && <Calendar channelId={channel.id} />}
        {activeTab === "Files" && <Files channelId={channel.id} />}
      </div>
    </div>
  );
};

export default ChannelContent;

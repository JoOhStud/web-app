import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "../../services/chat/ChatService";
import { ContactItem } from "./Chat.styles";
import { useAuth } from "react-oidc-context";

const ChatsList: React.FC = () => {
  const auth = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["chats"],
    queryFn: () => fetchChats(auth.user?.access_token || ""),
  });

  if (isLoading) return <div>Loading chats...</div>;
  if (error) return <div>Error loading chats: {(error as Error).message}</div>;

  return (
    <div>
      <h2>Chats</h2>
      {data?.map((chat: any) => (
        <div key={chat.id}>
          <ContactItem>
            <p>{chat.name}</p>
          </ContactItem>
        </div>
      )) || <div>No chats available</div>}
    </div>
  );
};

export default ChatsList;

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChat } from "../../services/chat/ChatService";

const CreateChatComponent: React.FC = () => {
  const [chatName, setChatName] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createChat,
    onSuccess: () => {
      // Invalidate and refetch chats after successful mutation
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ chatName, token: "" });
    setChatName("");
  };

  return (
    <div>
      <input
        type="text"
        value={chatName}
        onChange={(e) => setChatName(e.target.value)}
        placeholder="Enter chat name"
      />
      <button onClick={handleSubmit}>Create Chat</button>
    </div>
  );
};

export default CreateChatComponent;

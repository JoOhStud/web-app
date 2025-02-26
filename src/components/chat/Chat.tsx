// ChatPage.tsx
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MessageList,
  Message,
  MessageInput as ChatInput,
  ConversationList,
  Conversation,
} from "@chatscope/chat-ui-kit-react";
import { useChatWebSocket } from "../../services/chat/useChatWebSocket";
import { Chat, ChatMessage } from "../../types/Chat.types";
import { createChat, fetchChats } from "../../services/chat/ChatService";
import { useAuth } from "react-oidc-context";
import { useSearchUsers } from "../../services/search/SearchService";
import { User } from "../../types/types";

const ChatPage: React.FC = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatName, setChatName] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch chat list
  const {
    data: chats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: () => fetchChats(auth.user?.access_token || ""),
    refetchOnWindowFocus: false,
  });

  // Mutation for creating a chat
  const createChatMutation = useMutation({
    mutationFn: createChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  // Setup WebSocket for real-time messages using your custom hook.
  // When selectedChat changes, useChatWebSocket will re-establish a connection.
  const { messages: wsMessages, sendMessage } = useChatWebSocket(
    selectedChat ? String(selectedChat.id) : ""
  );

  // Append new messages from WebSocket
  useEffect(() => {
    if (wsMessages.length > 0) {
      setMessages((prev) => [...wsMessages]);
    }
  }, [wsMessages]);

  const {
    data: searchResults,
    refetch: refetchSearch,
    isFetching: isSearching,
  } = useSearchUsers(searchTerm);

  const handleJoinChat = (chat: Chat) => {
    // joinChatMutation.mutate(chat.id);
    setSelectedChat(chat);
  };

  const handleUserSearch = () => {
    if (!searchTerm.trim()) return;
    refetchSearch();
  };

  // Po wybraniu użytkownika – utwórz prywatny czat
  const handleUserSelect = (user: User) => {
    createChatMutation.mutate({ userId: user.id });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  if (isLoading) return <div>Loading chats...</div>;
  if (error) return <div>Error loading chats: {(error as Error).message}</div>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Panel: Conversation List and Create Chat */}
      <div
        style={{
          width: "300px",
          borderRight: "1px solid #ccc",
          overflowY: "auto",
        }}
      >
        <ConversationList>
          {chats?.map((chat: Chat) => (
            <Conversation
              key={chat.id.toString()}
              name={
                chat.participants.filter(
                  (p) => p.id !== auth.user?.profile.sub
                )[0]?.username
              }
              info={`ID: ${chat.id}`}
              onClick={() => handleJoinChat(chat)}
              active={selectedChat?.id === chat.id}
            />
          )) || <div>No chats available</div>}
        </ConversationList>
        <div style={{ padding: "1rem" }}>
          <h3>Wyszukaj użytkownika</h3>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Wpisz nazwę użytkownika"
            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
          />
          <button
            onClick={handleUserSearch}
            style={{ width: "100%", padding: "0.5rem" }}
          >
            Szukaj
          </button>
          <div>
            {searchResults?.map((user: User) => (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user)}
                style={{
                  padding: "0.5rem",
                  cursor: "pointer",
                  borderBottom: "1px solid #ccc",
                }}
              >
                {user.username}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel: Chat Room */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {selectedChat ? (
          <>
            <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
              <h2>Chat Room: {selectedChat.name}</h2>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
              <MessageList>
                {messages?.map((msg) => (
                  <Message
                    key={msg.id}
                    model={{
                      message: msg.content,
                      sender:
                        msg.sender === auth.user?.profile.preferred_username
                          ? "You"
                          : msg.sender,
                      direction:
                        msg.sender === auth.user?.profile.preferred_username
                          ? "outgoing"
                          : "incoming",
                      position: "normal",
                    }}
                  />
                ))}
              </MessageList>
            </div>
            <div style={{ padding: "1rem" }}>
              <ChatInput
                placeholder="Type your message..."
                value={newMessage}
                onChange={(msg) => setNewMessage(msg)}
                onSend={handleSendMessage}
              />
            </div>
          </>
        ) : (
          <div style={{ padding: "1rem" }}>
            <h2>Select a chat to join</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

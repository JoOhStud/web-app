import api from "../../axiosInstance";

export const fetchChats = async (token: string) => {
  const response = await api.get("/api/chat/chats/");
  return response.data;
};

export const createChat = async ({ userId }: { userId: string }) => {
  const response = await api.post("/api/chat/chats/", { userId });
  return response.data;
};

export const fetchChatHistory = async (chatId: string, token: string) => {
  const response = await api.get(`/api/chat/chats/${chatId}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const joinChat = async (chatId: string) => {
  const response = await api.post(
    `/api/chat/chats/${chatId}/join`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

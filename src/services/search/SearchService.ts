import { useQuery } from "@tanstack/react-query";
import api from "../../axiosInstance";

export const searchUsers = async (searchTerm: string) => {
  const response = await api.get(
    `/api/chat/users/search?username=${searchTerm}`
  );
  return response.data;
};

export const useSearchUsers = (searchTerm: string) =>
  useQuery({
    queryKey: ["userSearch", searchTerm],
    queryFn: () => searchUsers(searchTerm),
    enabled: false,
  });

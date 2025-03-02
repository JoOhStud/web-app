import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiBase";
import { SearchHit } from "../../types/types";

export interface ProfileData {
  id?: string;
  name?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  description?: string;
  about_me?: string;
  // location?: string;    // jeśli chcesz pobierać location
  specializations?: string[];
}

// Typ payloadu do aktualizacji usera
export interface UpdateUserPayload {
  user_id: string;
  data: ProfileData;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["CurrentUser"],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<ProfileData, void>({
      query: () => `users/users/current`,
      providesTags: ["CurrentUser"],
    }),
    getUserById: builder.query<ProfileData, string>({
      query: (userId) => `users/users/${userId}`,
    }),
    updateUser: builder.mutation<ProfileData, UpdateUserPayload>({
      query: ({ user_id, data }) => ({
        url: `users/users/${user_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CurrentUser"],
    }),
    searchUsers: builder.query<SearchHit[], string>({
      query: (query) => `users/search?query=${encodeURIComponent(query)}`,
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = userApi;

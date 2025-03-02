import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiBase";
import { SearchHit } from "../../types/types";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery,
  endpoints: (builder) => ({
    searchUsers: builder.query<SearchHit[], string>({
      query: (query) => `users/search?query=${encodeURIComponent(query)}`,
    }),
  }),
});

export const { useSearchUsersQuery } = searchApi;

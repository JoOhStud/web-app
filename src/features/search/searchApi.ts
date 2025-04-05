import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiBase";
import { SearchHit } from "../../types/types";
import { Post } from "../blog/blogApi";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery,
  endpoints: (builder) => ({
    searchUsers: builder.query<SearchHit[], string>({
      query: (query) => `users/search?query=${encodeURIComponent(query)}`,
    }),
    searchPosts: builder.query<Post[], string>({
      query: (query) => ({
        url: `/blog/search`,
        params: { query },
      }),
    }),
  }),
});

export const { useSearchUsersQuery, useSearchPostsQuery } = searchApi;

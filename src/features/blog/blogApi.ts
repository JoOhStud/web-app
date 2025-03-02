import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiBase";

export interface Post {
  id: number;
  title: string;
  content: string;
  short_description?: string;
  published: boolean;
  keywords?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Comment {
  id: number;
  post_id: number;
  content: string;
  created_at?: string;
}

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery,
  tagTypes: ["Posts", "NewPosts", "Comments"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/blog/posts/",
      providesTags: ["Posts"],
    }),
    getUnpublishedPosts: builder.query<Post[], void>({
      query: () => "/blog/posts/unpublished",
      providesTags: ["NewPosts"],
    }),
    getPostById: builder.query<Post, number>({
      query: (postId) => `blog/posts/${postId}`,
      providesTags: (result, error, postId) => [{ type: "Posts", id: postId }],
    }),
    createPost: builder.mutation<Post, Omit<Post, "id" | "published">>({
      query: (post) => ({
        url: "/blog/posts/",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation<Post, { postId: number; data: Partial<Post> }>(
      {
        query: ({ postId, data }) => ({
          url: `/blog/posts/${postId}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: (result, error, { postId }) => [
          { type: "Posts", id: postId },
          "NewPosts",
          "Posts",
        ],
      }
    ),
    deletePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/blog/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    getComments: builder.query<Comment[], number>({
      query: (postId) => `/blog/posts/${postId}/comments`,
      providesTags: (result, error, postId) => [
        { type: "Comments", id: postId },
      ],
    }),
    addComment: builder.mutation<Comment, { postId: number; content: string }>({
      query: ({ postId, content }) => ({
        url: `/blog/posts/${postId}/comments`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),
    deleteComment: builder.mutation<
      void,
      { commentId: number; postId: number }
    >({
      query: (commentId) => ({
        url: `/blog/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUnpublishedPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = blogApi;

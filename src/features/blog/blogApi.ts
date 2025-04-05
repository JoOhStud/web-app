import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiBase";
import { getSearchParams } from "../../utils/utils";

export interface Post {
  id: number;
  title: string;
  author_id: string;
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
  author_id: string;
  content: string;
  created_at?: string;
}

type FilterPosts = {
  author_id?: string;
  published?: boolean;
};

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery,
  tagTypes: ["Posts", "NewPosts", "Comments"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], FilterPosts>({
      query: (filters) => `/blog/posts/?${getSearchParams(filters)}`,
      providesTags: ["Posts"],
    }),
    getPostById: builder.query<Post, number>({
      query: (postId) => `blog/posts/${postId}`,
      providesTags: (result, error, postId) => [{ type: "Posts", id: postId }],
    }),
    createPost: builder.mutation<
      Post,
      Omit<Post, "id" | "published" | "author_id">
    >({
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
          method: "PATCH",
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
    getCommentsByPostId: builder.query<Comment[], number>({
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
    updateComment: builder.mutation<
      Comment,
      { commentId: number; content: string; postId: number }
    >({
      query: ({ commentId, content, postId }) => ({
        url: `/blog/comments/${commentId}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),
    uploadImage: builder.mutation<
      { url: string; media_id: number },
      { file: File; postId?: number }
    >({
      query: ({ file, postId }) => {
        const formData = new FormData();
        formData.append("file", file);
        if (postId) {
          formData.append("post_id", String(postId));
        }

        return {
          url: "/blog/upload/",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useGetCommentsByPostIdQuery,
  useUploadImageMutation,
} = blogApi;

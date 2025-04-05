import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiBase";

interface Channel {
  id: string;
  name: string;
  description: string;
  client_id: string;
  behaviorist_id: string;
  created_at: string;
  updated_at: string;
}

export const collaborationsApi = createApi({
  reducerPath: "collaborationsApi",
  baseQuery,
  tagTypes: ["Channels"],
  endpoints: (builder) => ({
    // Pobranie listy kanałów współpracy aktualnego użytkownika
    fetchChannels: builder.query<Channel[], void>({
      query: () => "/channels/channels",
      providesTags: ["Channels"],
    }),

    // Pobranie pojedynczego kanału (szczegóły współpracy)
    fetchChannel: builder.query<Channel, string>({
      query: (channelId) => `/channels/channels/${channelId}`,
    }),

    // Utworzenie nowego kanału
    createChannel: builder.mutation({
      query: (newChannel) => ({
        url: "/channels/channels",
        method: "POST",
        body: newChannel,
      }),
      invalidatesTags: ["Channels"],
    }),
  }),
});

export const {
  useFetchChannelsQuery,
  useFetchChannelQuery,
  useCreateChannelMutation,
} = collaborationsApi;

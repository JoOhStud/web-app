import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiBase";

export interface Specialization {
  id: string;
  title: string;
  short_description?: string;
}

export const specializationApi = createApi({
  reducerPath: "specializationApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllSpecializations: builder.query<Specialization[], void>({
      query: () => "/users/specializations",
    }),
  }),
});

export const { useGetAllSpecializationsQuery } = specializationApi;

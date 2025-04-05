import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiBase";

interface Pet {
  id: string;
  owner_id: string;
  name: string;
  species: string;
  breed?: string;
  gender?: string;
  date_of_birth?: string;
  weight?: number;
  description?: string;
}

export const petsApi = createApi({
  reducerPath: "petsApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchUserPets: builder.query<Pet[], string>({
      query: (userId) => ({
        url: `/users/pets`,
        params: { user_id: userId },
      }),
    }),
    createPet: builder.mutation({
      query: (petData) => ({
        url: "/users/pets",
        method: "POST",
        body: petData,
      }),
    }),
  }),
});

export const { useFetchUserPetsQuery, useCreatePetMutation } = petsApi;

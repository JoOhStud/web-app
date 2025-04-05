import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiBase";
import { getSearchParams } from "../../utils/utils";

export interface Service {
  id: string;
  profile_id: string;
  name: string;
  description?: string;
  price: number;
  times: number[];
}

export interface ServiceCreate {
  name: string;
  description?: string;
  price: number;
  times: number[];
}

type FilterServices = {
  user_id?: string;
};

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery,
  tagTypes: ["ServicesList"],
  endpoints: (builder) => ({
    // Pobiera usługi dla konkretnego usera:
    getServices: builder.query<Service[], FilterServices>({
      query: (filters) => `/services?${getSearchParams(filters)}`, // z endpointu get_services_for_user
      providesTags: ["ServicesList"],
    }),

    // Tworzy usługę dla zalogowanego usera (profile_id brane z tokena w backendzie)
    createService: builder.mutation<Service, ServiceCreate>({
      query: (body) => ({
        url: "/services/current",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ServicesList"],
    }),

    // można dodać getService, updateService, deleteService
  }),
});

export const { useGetServicesQuery, useCreateServiceMutation } = servicesApi;

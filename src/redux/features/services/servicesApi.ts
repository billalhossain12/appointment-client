import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (serviceData) => ({
        url: "/services",
        method: "POST",
        body: serviceData,
      }),
    }),

    getServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateServiceMutation, useGetServicesQuery } = serviceApi;

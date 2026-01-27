import { baseApi } from "../../api/baseApi";

const queuedsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQueueds: builder.query({
      query: () => ({
        url: "/queueds",
        method: "GET",
      }),
      providesTags: ["Queueds"],
    }),

    assignFromQueueds: builder.mutation({
      query: (id: string) => ({
        url: `/queueds/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Queueds"],
    }),
  }),
});

export const { useGetQueuedsQuery, useAssignFromQueuedsMutation } = queuedsApi;

import { baseApi } from "../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    summary: builder.query({
      query: () => ({
        url: "/dashboard/summary",
        method: "GET",
      }),
    }),
  }),
});

export const { useSummaryQuery } = dashboardApi;

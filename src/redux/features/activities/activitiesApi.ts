import { baseApi } from "../../api/baseApi";

const activitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    activities: builder.query({
      query: () => ({
        url: "/activities",
        method: "GET"
      }),
    }),
  }),
});

export const { useActivitiesQuery } = activitiesApi;
import { baseApi } from "../../api/baseApi";

const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStaff: builder.mutation({
      query: (staffData) => ({
        url: "/staffs",
        method: "POST",
        body: staffData,
      }),
    }),
    getStaffLoads: builder.query({
      query: () => ({
        url: "/staffs/load",
        method: "GET",
      }),
      providesTags: ["Staffs"],
    }),
  }),
});

export const { useCreateStaffMutation, useGetStaffLoadsQuery } = staffApi;

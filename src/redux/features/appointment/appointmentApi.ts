import { baseApi } from "../../api/baseApi";

const appointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAppointment: builder.mutation({
      query: (serviceData) => ({
        url: "/appointments",
        method: "POST",
        body: serviceData,
      }),
      invalidatesTags: ["Appointments"],
    }),

    getAppointments: builder.query({
      query: () => ({
        url: "/appointments",
        method: "GET",
      }),
      providesTags: ["Appointments"],
    }),

    getSingleAppointment: builder.query({
      query: (id) => {
        return {
          url: `/appointments/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Appointments"],
    }),

    updateAppointment: builder.mutation({
      query: (data) => {
        console.log("update data", data);
        return {
          url: `/appointments/${data._id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Appointments"],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetAppointmentsQuery,
  useGetSingleAppointmentQuery,
  useUpdateAppointmentMutation,
} = appointmentApi;

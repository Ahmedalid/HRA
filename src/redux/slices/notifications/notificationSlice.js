import { apiSlice } from "../../apiSlice";

const notificationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    pushNotificationForEmployees: builder.mutation({
      query: (payload) => ({
        url: `/admins/push-notifications/employees`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Notifications"],
    }),

    pushNotificationForCompanies: builder.mutation({
      query: (payload) => ({
        url: `/admins/push-notifications/companies`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});
export const {
  usePushNotificationForEmployeesMutation,
  usePushNotificationForCompaniesMutation,
} = notificationSlice;

import { apiSlice } from "../../apiSlice";

const subscriptionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: () => `/admins/subscriptions`,
      providesTags: ["Subscriptions"],
    }),
    getSingleSubscriptions: builder.query({
      query: (id) => `/admins/subscriptions/${id}`,
      providesTags: ["Subscriptions"],
    }),
  }),
});
export const { useGetSubscriptionsQuery, useGetSingleSubscriptionsQuery } =
  subscriptionSlice;

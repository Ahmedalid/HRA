import { apiSlice } from "../../apiSlice";

const profileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => `/admins/profile`,
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: `/admins/profile`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});
export const { useGetProfileQuery, useUpdateProfileMutation } = profileSlice;

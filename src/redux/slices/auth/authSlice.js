import { apiSlice, tags } from "../../apiSlice";

const clientsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => `/user`,
      providesTags: tags,
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: `/admins/login`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: tags,
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/admins/logout`,
        method: "POST",
      }),
      invalidatesTags: tags,
    }),
  }),
});
export const { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery } =
  clientsSlice;

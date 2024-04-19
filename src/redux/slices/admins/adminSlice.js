import { apiSlice } from "../../apiSlice";

const adminSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => `/admins/admins`,
      providesTags: ["Admins"],
    }),
    createAdmin: builder.mutation({
      query: (payload) => ({
        url: `/admins/admins`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Admins"],
    }),
    updateAdmin: builder.mutation({
      query: (payload) => ({
        url: `/admins/admins/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Admins"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admins/admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});
export const {
  useGetAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminSlice;

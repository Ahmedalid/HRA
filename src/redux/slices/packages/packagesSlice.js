import { apiSlice } from "../../apiSlice";

const packagesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => `/admins/packages`,
      providesTags: ["Packages"],
    }),
    createPackage: builder.mutation({
      query: (payload) => ({
        url: `/admins/packages`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Packages"],
    }),
    updatePackage: builder.mutation({
      query: (payload) => ({
        url: `/admins/packages/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Packages"],
    }),
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/admins/employees${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Packages"],
    }),
  }),
});
export const {
  useGetPackagesQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packagesSlice;

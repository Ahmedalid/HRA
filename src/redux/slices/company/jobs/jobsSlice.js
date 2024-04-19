import { apiSlice } from "../../../apiSlice";

const jobsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (id) => `/admins/jobs/${id}`,
      providesTags: ["Jobs"],
    }),
    getSingleCompany: builder.query({
      query: (id) => `/admins/companies/${id}`,
      providesTags: ["Jobs"],
    }),
    createCompany: builder.mutation({
      query: (payload) => ({
        url: "/admins/companies",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Jobs"],
    }),
    updateCompany: builder.mutation({
      query: (payload) => ({
        url: `/admins/companies/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Jobs"],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/admins/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});
export const {
  useGetJobsQuery,
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
} = jobsSlice;

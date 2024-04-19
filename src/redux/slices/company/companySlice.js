import { apiSlice } from "../../apiSlice";

const companySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => "/admins/companies",
      providesTags: ["Company"],
    }),
    getSingleCompany: builder.query({
      query: (id) => `/admins/companies/${id}`,
      providesTags: ["Company"],
    }),
    createCompany: builder.mutation({
      query: (payload) => ({
        url: "/admins/companies",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompany: builder.mutation({
      query: (payload) => ({
        url: `/admins/companies/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Company"],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/admins/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});
export const {
  useGetCompaniesQuery,
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
} = companySlice;

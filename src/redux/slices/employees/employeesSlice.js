import { apiSlice } from "../../apiSlice";

const employeesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/admins/employees",
      providesTags: ["Employees"],
    }),
    getSingleEmployees: builder.query({
      query: (id) => `/admins/employees/${id}`,
      providesTags: ["Employees", "Branches", "Careers", "Sections", "Company"],
    }),
    createEmployees: builder.mutation({
      query: (payload) => ({
        url: "/admins/employees",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Employees"],
    }),
    updateEmployees: builder.mutation({
      query: (payload) => ({
        url: `/admins/employees/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Employees"],
    }),
    deleteEmployees: builder.mutation({
      query: (id) => ({
        url: `/admins/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});
export const {
  useGetEmployeesQuery,
  useGetSingleEmployeesQuery,
  useUpdateEmployeesMutation,
  useCreateEmployeesMutation,
  useDeleteEmployeesMutation,
} = employeesSlice;

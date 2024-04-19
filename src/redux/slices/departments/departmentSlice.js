import { apiSlice } from "../../apiSlice";

const departmentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: (id) => `/admins/categories?subCategory=${id}`,
      providesTags: ["Departments"],
    }),
    createDepartment: builder.mutation({
      query: (payload) => ({
        url: `/admins/categories`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Departments"],
    }),
    updateDepartment: builder.mutation({
      query: (payload) => ({
        url: `/admins/categories/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Departments"],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/admins/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Departments"],
    }),
  }),
});
export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentSlice;

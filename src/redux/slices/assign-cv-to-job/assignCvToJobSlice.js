import { apiSlice } from "../../apiSlice";

const assignCvToJobSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeesByDepartment: builder.query({
      query: (id) => `/admins/employees?category=${id}`,
      providesTags: ["Score", "Employees"],
    }),
    getScore: builder.query({
      query: ({ job_id, employee_id }) =>
        `/admins/get-score/jobs/${job_id}/employees/${employee_id}`,
      providesTags: ["Score", "Employees"],
    }),
    assignCV: builder.mutation({
      query: ({ job_id, employee_id, comment }) => ({
        url: `/admins/assign-cv/jobs/${job_id}/employees/${employee_id}`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Score", "Employees"],
    }),
  }),
});
export const {
  useGetEmployeesByDepartmentQuery,
  useGetScoreQuery,
  useAssignCVMutation,
} = assignCvToJobSlice;

import { apiSlice } from "../../apiSlice";

const skillsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query({
      query: () => `/admins/skills`,
      providesTags: ["Skills"],
    }),
    createSkill: builder.mutation({
      query: (payload) => ({
        url: `/admins/skills`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Skills"],
    }),
    updateSkill: builder.mutation({
      query: (payload) => ({
        url: `/admins/skills/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Skills"],
    }),
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/admins/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),
  }),
});
export const {
  useGetSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillsSlice;

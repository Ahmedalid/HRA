import { apiSlice } from "../../apiSlice";

const aiAiQuestionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAiQuestions: builder.query({
      query: (id) => `/admins/ai-questions/job/${id}`,
      providesTags: ["AiQuestions"],
    }),
    getSingleQuestion: builder.query({
      query: (id) => `/admins/ai-questions/${id}`,
      providesTags: ["AiQuestions"],
    }),
    createAiQuestion: builder.mutation({
      query: (payload) => ({
        url: `/admins/ai-questions/job/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["AiQuestions"],
    }),
    updateAiQuestion: builder.mutation({
      query: (payload) => ({
        url: `/admins/ai-questions/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["AiQuestions"],
    }),
    deleteAiQuestion: builder.mutation({
      query: (id) => ({
        url: `/admins/ai-questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AiQuestions"],
    }),
  }),
});
export const {
  useGetAiQuestionsQuery,
  useCreateAiQuestionMutation,
  useUpdateAiQuestionMutation,
  useDeleteAiQuestionMutation,
} = aiAiQuestionSlice;

import { apiSlice } from "../../apiSlice";

const questionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: (id) => `/admins/questions/job/${id}`,
      providesTags: ["Questions"],
    }),
    getSingleQuestion: builder.query({
      query: (id) => `/admins/questions/${id}`,
      providesTags: ["Questions"],
    }),
    createQuestion: builder.mutation({
      query: (payload) => ({
        url: `/admins/questions/job/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Questions"],
    }),
    updateQuestion: builder.mutation({
      query: (payload) => ({
        url: `/admins/questions/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Questions"],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/admins/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Questions"],
    }),
  }),
});
export const {
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionSlice;

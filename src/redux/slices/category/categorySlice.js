import { apiSlice } from "../../apiSlice";

const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/admins/categories`,
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation({
      query: (payload) => ({
        url: `/admins/categories`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: (payload) => ({
        url: `/admins/categories/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/admins/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});
export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categorySlice;

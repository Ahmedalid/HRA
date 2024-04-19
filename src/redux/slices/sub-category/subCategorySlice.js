import { apiSlice } from "../../apiSlice";

const subCategorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubCategories: builder.query({
      query: (id) => `/admins/categories?mainCategory=${id}`,
      providesTags: ["subCategories"],
    }),
    createSubCategory: builder.mutation({
      query: (payload) => ({
        url: `/admins/categories`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["subCategories"],
    }),
    updateSubCategory: builder.mutation({
      query: (payload) => ({
        url: `/admins/categories/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["subCategories"],
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/admins/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subCategories"],
    }),
  }),
});
export const {
  useGetSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategorySlice;

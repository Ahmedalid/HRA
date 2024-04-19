import { apiSlice } from "../../apiSlice";

const settingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => `/admins/settings`,
      providesTags: ["Settings"],
    }),
    getSingleSetting: builder.query({
      query: (id) => `/admins/settings/${id}`,
      providesTags: ["Settings"],
    }),
    updateSetting: builder.mutation({
      query: (payload) => ({
        url: `/admins/settings/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});
export const {
  useGetSettingsQuery,
  useGetSingleSettingQuery,
  useUpdateSettingMutation,
} = settingSlice;

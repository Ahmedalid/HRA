import { apiSlice } from "../../apiSlice";

const statusSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatus: builder.query({
      query: () => `/admins`,
      providesTags: ["Status"],
    }),
  }),
});
export const { useGetStatusQuery } = statusSlice;

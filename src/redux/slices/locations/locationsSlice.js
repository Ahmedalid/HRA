import { apiSlice } from "../../apiSlice";

const locationsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: () => "/admins/locations",
      providesTags: ["Locations"],
    }),
    createCountry: builder.mutation({
      query: (payload) => ({
        url: `/admins/locations`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Locations"],
    }),
    updateCountry: builder.mutation({
      query: (payload) => ({
        url: `/admins/locations/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Locations"],
    }),
    deleteCountry: builder.mutation({
      query: (id) => ({
        url: `/admins/locations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Locations"],
    }),
    // Cities
    getCities: builder.query({
      query: (id) => `/admins/locations?countries=${id}`,
      providesTags: ["Locations"],
    }),
    createCity: builder.mutation({
      query: (payload) => ({
        url: `/admins/locations`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Locations"],
    }),
    updateCity: builder.mutation({
      query: (payload) => ({
        url: `/admins/locations/${payload.id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Locations"],
    }),
    deleteCity: builder.mutation({
      query: (id) => ({
        url: `/admins/locations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Locations"],
    }),
  }),
});
export const {
  useGetLocationsQuery,
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
  useGetCitiesQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
} = locationsSlice;

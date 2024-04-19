import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_API } from "../utils";
import { getCookies } from "../utils/Cookies";

const baseQuery = fetchBaseQuery({
  baseUrl: URL_API,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = getCookies("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
export const tags = [
  "Employees",
  "Company",
  "Locations",
  "Cities",
  "Categories",
  "subCategories",
  "Departments",
  "Skills",
  "Subscriptions",
  "Notifications",
  "Packages",
  "Jobs",
  "Questions",
  "AiQuestions",
  "Profile",
  "Settings",
];
export const apiSlice = createApi({
  baseQuery,
  tagTypes: tags,
  endpoints: (builder) => ({}),
});

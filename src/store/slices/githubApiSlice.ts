import type { components } from "@octokit/openapi-types";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Release = components["schemas"]["release"];

export const githubApiSlice = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com" }),
  endpoints: (builder) => ({
    getLatestRelease: builder.query<Release, void>({
      query: () => "/repos/jimhigson/head-over-heels-online/releases/latest",
    }),
  }),
});

export const { useGetLatestReleaseQuery } = githubApiSlice;

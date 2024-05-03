import { IApiResponse, IUser } from "@/lib/typing";
import {
    BaseQueryApi,
    FetchArgs,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { authSuccess, logOut } from "../features/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state?.auth?.access_token;

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReAuth = async (
    args: FetchArgs,
    api: BaseQueryApi,
    extraOptions: object
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        // send refresh token to get new access token
        const { data } = await baseQuery("/api/v1/refresh", api, extraOptions);

        const refreshResult = data as IApiResponse<{ accessToken: string }>;
        if (refreshResult?.statusCode === 200) {
            const state = api.getState() as RootState;
            const user = state?.auth?.user as IUser;
            // store the new token
            api.dispatch(
                authSuccess({
                    accessToken: refreshResult.data.accessToken as string,
                    user,
                })
            );
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: () => ({}),
});

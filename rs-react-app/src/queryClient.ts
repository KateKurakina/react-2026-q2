import { QueryClient } from "@tanstack/react-query";

const cacheTime = Number(import.meta.env.VITE_QUERY_CACHE_TIME);

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: cacheTime,
            gcTime: cacheTime,
            retry: 1,
        },
    },
});
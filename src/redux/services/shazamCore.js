import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const shazamCoreAPI = createApi({
    reducerPath: "shazamCoreAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://spotify23.p.rapidapi.com",
        prepareHeaders: (headers) => {
            headers.set("X-RapidAPI-Key", "d349022226mshe51878db5478fa0p1bd6adjsn922c3fc6f190")
            return headers
        }
    }),
    endpoints: (builder) => ({
        getTop100: builder.query({query:() => "/playlist_tracks/?id=37i9dQZF1DX9AFOBBZSMWw"}),
    }) 
})


export const {
    useGetTop100Query,
} = shazamCoreAPI
import { MasterdataDetailRes } from "#/types/other/IMasterdata";
import { useQuery } from "@tanstack/react-query";
import { getByMasterdataCode } from "../queries/masterdataQueriesKey";
import { getByMasterdataCodeApi } from "#/app/api/other/masterdataApi";

export const useGetByMasterdataCode = (masterdataCode: String) => {
    return useQuery<MasterdataDetailRes[], { message: string }>(
        [getByMasterdataCode],
        async () => await getByMasterdataCodeApi(masterdataCode)
    );
};
import { ICandidateDetail } from "#/types/candidate/ICandidate";
import { useQuery } from "@tanstack/react-query";
import { getByIdentityCode } from "../queries/candidate/candidateQueriesKey";
import { getByIdentityCodeApi } from "#/app/api/candidate/candidateApi";

// UnAvailable
export const useGetByIdentityCode = (identityCode: string) => {
    return useQuery<ICandidateDetail[], { message: string }>(
        [getByIdentityCode, identityCode],
        async () => await getByIdentityCodeApi(identityCode)
    );
};
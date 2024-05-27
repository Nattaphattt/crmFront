import { useQuery } from "@tanstack/react-query";
import { getCandidateBySearch } from "../queries/candidate/candidateQueriesKey";
import { ICandidateSearch } from "#/types/candidate/ICandidate";
import { getCandidateBySearchApi } from "#/app/api/candidate/candidateApi";
import { IPagination, IResponseInterviewDTO } from "#/types/other/IResponse";

export const useGetCandidateBySearch = (payload: ICandidateSearch) => {
    return useQuery<IResponseInterviewDTO<IPagination<ICandidateSearch>>, { message: string }>(
        [getCandidateBySearch , payload],
        async () => await getCandidateBySearchApi(payload),
        {
            enabled: !!payload,
        }
    );
};
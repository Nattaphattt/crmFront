import { ICandidate, ICandidateBackup } from "#/types/candidate/ICandidate";
import { useQuery } from "@tanstack/react-query";
import { getByCandidateIdApi } from "#/app/api/candidate/candidateApi";
import { IResponseInterviewDTO } from "#/types/other/IResponse";
import { getByCandidateId } from "../queries/candidate/candidateQueriesKey";

export const useGetByCandidateId = (candidateId: number) => {
    return useQuery<IResponseInterviewDTO<ICandidate>, { message: string }>(
        [getByCandidateId, candidateId],
        async () => await getByCandidateIdApi(candidateId)
    );
};
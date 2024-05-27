import { ICandidate } from "#/types/candidate/ICandidate";
import { IResponseInterviewDTO } from "#/types/other/IResponse";
import { useQuery } from "@tanstack/react-query";
import { getAllCandidate } from "../queries/candidate/candidateQueriesKey";
import { getAllCandidateApi } from "#/app/api/candidate/candidateApi";

export default function useGetAllCandidate() {
    return useQuery<IResponseInterviewDTO<ICandidate>, { message: string }, any>(
        [getAllCandidate],
        async () => await getAllCandidateApi(),
    );
}
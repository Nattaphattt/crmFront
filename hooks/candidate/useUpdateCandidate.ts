import { ICandidate } from "#/types/candidate/ICandidate";
import { IResponseInterviewDTO } from "#/types/other/IResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getByCandidateId, updateCandidate } from "../queries/candidate/candidateQueriesKey";
import { updateCandidateApi } from "#/app/api/candidate/candidateApi";

export default function useUpdateCandidate() {
    const queryClient = useQueryClient();
    return useMutation<IResponseInterviewDTO<null>, { message: string }, any>(
        [updateCandidate], // ['key', 'payload']
        async (payload: ICandidate) => await updateCandidateApi(payload),
        // {
        //     onSuccess: () => {
        //         queryClient.invalidateQueries([getByCandidateId]);
        //     },
        // }
    );
}
import { ICandidate } from "#/types/candidate/ICandidate";
import { IResponseInterviewDTO } from "#/types/other/IResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCandidate, getCandidateBySearch } from "../queries/candidate/candidateQueriesKey";
import { addCandidateApi } from "#/app/api/candidate/candidateApi";

export default function useAddCandidate() {
  const queryClient = useQueryClient();
  return useMutation<IResponseInterviewDTO<null>, { message: string }, any>(
    [addCandidate], // ['key', 'payload']
    async (payload: ICandidate) => await addCandidateApi(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([getCandidateBySearch]);
      },
    }
  );
}
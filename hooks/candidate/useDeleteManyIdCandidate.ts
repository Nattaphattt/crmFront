import { deleteManyIdCandidateApi } from "#/app/api/candidate/candidateApi";
import { deleteManyIdCandidate, getCandidateBySearch } from "#/hooks/queries/candidate/candidateQueriesKey";
import { IResponse } from "#/types/other/IResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteManyIdCandidate() {
  const queryClient = useQueryClient()
  return useMutation<IResponse, { message: string }, any>(
    [deleteManyIdCandidate],
    (newPayload) => deleteManyIdCandidateApi(newPayload),
    {
      onSuccess: () => queryClient.invalidateQueries([getCandidateBySearch]),
    }
  )
}

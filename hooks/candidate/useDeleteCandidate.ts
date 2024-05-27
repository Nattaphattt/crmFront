import { deleteCandidateApi } from "#/app/api/candidate/candidateApi";
import { deleteCandidate } from "#/hooks/queries/candidate/candidateQueriesKey";
import { ICandidateResponse } from "#/types/candidate/ICandidate";
import { IResponseInterviewDTO } from "#/types/other/IResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteCandidate() {
  // const queryClient = useQueryClient();
  // return useMutation<IResponseInterviewDTO<null>, { message: string }, any>(
  //   [deleteCandidate],
  //   async (candidateId: number) => await deleteCandidateApi(candidateId),
  //   {
  //     // onSuccess: () => queryClient.invalidateQueries([getCandidate]),
  //   }
  // );
}

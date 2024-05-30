import { getAccountApi } from '#/app/api/accounts/getAccountApi'
import IAccount from '#/types/account/IAccount'
import { useQuery } from '@tanstack/react-query'

type Props = {}

export default function useGetAccounts() {
  const {data, isLoading, isError} = useQuery<IAccount[], { message: string }>({
    queryKey: ["getAccounts"],
    queryFn: async () => await getAccountApi()
  })
  return {data, isLoading, isError}
}

// export default function useGetAllCandidate() {
//     return useQuery<IResponseInterviewDTO<ICandidate>, { message: string }, any>(
//         [getAllCandidate],
//         async () => await getAllCandidateApi(),
//     );
// }
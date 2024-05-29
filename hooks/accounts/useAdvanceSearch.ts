import { getAccountApiByAdvSearch } from '#/app/api/accounts/getAccountApi'
import IAccount from '#/types/account/IAccount'
import { IAdvSearch } from '#/types/account/IAdvSearch'
import { useQuery } from '@tanstack/react-query'
import React from 'react'



export default function useAdvanceSearch(payload: IAdvSearch) {
    const {data, isLoading, isError} = useQuery<IAccount[], { message: string }>({
        queryKey: ["getString"],
        queryFn: async () => await getAccountApiByAdvSearch(payload)
      })
      return {data, isLoading, isError}
}
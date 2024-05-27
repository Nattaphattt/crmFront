import { getParameterDetailByCodeApi } from "#/app/api/admParameter/parameterApi";
import { getParameterDetailByCode } from "#/hooks/queries/parameter/parameterQueriesKey";
import { IResponse } from "#/types/other/IResponse";
import { useQuery } from "@tanstack/react-query";

export const useGetParameterDetailByCode = (code: string) => {
    return useQuery<IResponse, { message: string }>(
        [getParameterDetailByCode, code],
        async () => await getParameterDetailByCodeApi(code)
    );
};
import { useMutation } from "@tanstack/react-query";
import { getThaiDataFindByPostalCodeApi } from "#/app/api/other/thaiDataApi";
import { getThaiDataFindByPostalCode } from "../queries/thaiDataQueriesKey";
import { IResponse } from "#/types/other/IResponse";

export const useGetThaiDataFindByPostalCode = () => {
    return useMutation<IResponse, { message: string }, any>(
        [getThaiDataFindByPostalCode],
        async (postalCode) => await getThaiDataFindByPostalCodeApi(postalCode)
    );
};
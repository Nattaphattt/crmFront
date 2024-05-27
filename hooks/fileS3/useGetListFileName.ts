import { useQuery } from "@tanstack/react-query";
import { getListFileName } from "../queries/fileS3/fileS3QueriesKey";
import { getListFileNameApi } from "#/app/api/fileS3/fileS3Api";
import { IListFileName, IReqFolderS3 } from "#/types/fileS3/IFileS3";

export const useGetListFileName = (payload: IReqFolderS3) => {
    return useQuery<IListFileName[], { message: string }, any>(
        [getListFileName, payload],
        async () => await getListFileNameApi(payload),
        {
            enabled: !!payload
        }
    );
};
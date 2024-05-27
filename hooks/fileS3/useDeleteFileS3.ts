
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFileS3, getListFileName } from "../queries/fileS3/fileS3QueriesKey";
import { IResFileS3 } from "#/types/fileS3/IFileS3";
import { deleteFileS3Api } from "#/app/api/fileS3/fileS3Api";

export default function useDeleteFileS3() {
    const queryClient = useQueryClient();
    return useMutation<IResFileS3, { message: string }, any>(
        [deleteFileS3],
        (value) => deleteFileS3Api(value),
        {
            onSuccess: async () => await queryClient.invalidateQueries([getListFileName]),
        }
    );
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getListFileName, uploadFileS3 } from "../queries/fileS3/fileS3QueriesKey";
import { uploadFileS3Api } from "#/app/api/fileS3/fileS3Api";
import { IResFileS3 } from "#/types/fileS3/IFileS3";

export default function useUploadFileS3() {
    const queryClient = useQueryClient();
    return useMutation<IResFileS3, { message: string }, any>(
        [uploadFileS3],
        (value) => uploadFileS3Api(value),
        {
            onSuccess: async () => await queryClient.invalidateQueries(
                [getListFileName],
            ),
        }
    );
}
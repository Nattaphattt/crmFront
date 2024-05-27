
import { useMutation } from "@tanstack/react-query";
import { downloadFileS3 } from "../queries/fileS3/fileS3QueriesKey";
import { downloadFileS3Api } from "#/app/api/fileS3/fileS3Api";

export default function useDownloadFileS3() {
    return useMutation<Buffer, { message: string }, any>(
        [downloadFileS3],
        (value) => downloadFileS3Api(value)
    );
}
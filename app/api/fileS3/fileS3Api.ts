import { IDownloadFileS3, IListFileName, IReqFolderS3, IResFileS3, IUploadFileS3 } from "#/types/fileS3/IFileS3";
import axiosApi from "#/utils/axiosApi";
import { isAxiosError } from "axios";

export const getListFileNameApi = async (payload: IReqFolderS3) => {
    try {
        const response = await axiosApi.post<IListFileName[]>(
            `/fileS3/listFilename`,
            payload
        );
        if (response?.data === undefined) {
            throw ("error indefine")
        }
        return response?.data;
    } catch (err) {
        if (isAxiosError(err)) {
            console.error(err);
            throw Promise.reject(err);
        } else {
            console.error(err);
            throw Promise.reject(err);
        }
    }
}

export const uploadFileS3Api = async (payload: IUploadFileS3) => {
    try {
        const response = await axiosApi
            .post<IResFileS3>(
                `/fileS3/uploadFile`,
                payload,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
        if (response?.data === undefined) {
            throw "error undefined";
        }
        return response?.data;
    } catch (err) {
        if (isAxiosError(err)) {
            console.error(err);
            throw Promise.reject(err);
        } else {
            console.error(err);
            throw Promise.reject(err);
        }
    }
}

export const downloadFileS3Api = async (payload: IDownloadFileS3) => {
    try {
        const response = await axiosApi
            .post<Buffer>(
                `/fileS3/downloadFileSingleObject`,
                payload,
                {
                    responseType: "arraybuffer",
                }
            )
        if (response?.data === undefined) {
            throw "error undefined";
        }
        return response?.data;
    } catch (err) {
        if (isAxiosError(err)) {
            console.error(err);
            throw Promise.reject(err);
        } else {
            console.error(err);
            throw Promise.reject(err);
        }
    }
}

export const deleteFileS3Api = async (payload: IDownloadFileS3) => {
    try {
        const response = await axiosApi
            .post<IResFileS3>(
                `/fileS3/deleteFileFromS3`,
                payload,
            )
        if (response?.data === undefined) {
            throw "error undefined";
        }
        return response?.data;
    } catch (err) {
        if (isAxiosError(err)) {
            console.error(err);
            throw Promise.reject(err);
        } else {
            console.error(err);
            throw Promise.reject(err);
        }
    }
}
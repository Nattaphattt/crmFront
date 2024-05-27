export interface IListFileName {
    fileName?: string;
    uploadDate?: Date;
    size?: number;
}

export interface IReqFolderS3 {
    nameModule?: string;
    id?: number;
}

export interface IUploadFileS3 {
    file: File;
    nameModule: string;
    id: number;
}

export interface IResFileS3 {
    status : boolean;
    message : string;
}

export interface IDownloadFileS3 {
    nameModule: string;
    id: number;
    fileName: string;
}
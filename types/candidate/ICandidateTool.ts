import { Dayjs } from "dayjs";

export interface ICandidateTool {
    id?: number,
    idCandidate?: number,
    idTool?: String,
    createdDate?: Dayjs,
    createdBy?: String,
    updatedDate?: Dayjs,
    updatedBy?: String,
    identityCode?: String,
}

export interface IUpdateAndAddCandidateTool {
    listIdTool?: number[],
    idCandidate?: number,
    createdBy?: String,
    identityCode?: String,
}

import { Dayjs } from "dayjs";

export interface ICandidatePosition {
    id?: number,
    idCandidate?: number,
    idPosition?: String,
    createdDate?: Dayjs,
    createdBy?: String,
    updatedDate?: Dayjs,
    updatedBy?: String,
    identityCode?: String,
}

export interface IUpdateAndAddCandidatePosition {
    listIdPosition?: number[],
    idCandidate?: number,
    createdBy?: String,
    identityCode?: String,
}

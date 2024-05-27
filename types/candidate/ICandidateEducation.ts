import { Dayjs } from "dayjs";

export interface ICandidateEducation {
    id?: number
    idCandidate?: number
    institute?: string
    major?: string
    degree?: string
    durationFrom?: Dayjs
    durationTo?: Dayjs
    createdDate?: Dayjs
    createdBy?: string
    updatedDate?: Dayjs
    updatedBy?: string
    identityCode?: string
}

export interface ICandidateEducationResponse {
    status: boolean;
    message: string;
}

export interface IInputAddCandidateEducation {
    institute: string;
    major: string;
    degree: string;
    durationFrom: Dayjs;
    durationTo: Dayjs;
}

import { Dayjs } from "dayjs";

export interface ICandidateEmergencyContact {
    id?: number
    idCandidate?: number
    name?: string
    phoneNumber?: string
    relationship?: string
    address?: string
    email?: string
    createdDate?: Dayjs
    createdBy?: string
    updatedDate?: Dayjs
    updatedBy?: string
    identityCode?: string
}

export interface ICandidateEmergencyContactResponse {
    status: boolean;
    message: string;
}

export interface IInputAddCandidateEmergencyContact {
    name?: string
    phoneNumber?: string
    relationship?: string
    address?: string
    email?: string
}
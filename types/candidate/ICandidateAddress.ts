import { Dayjs } from "dayjs"

export interface ICandidateAddress {
    id?: number
    idCandidate?: number
    postalCode?: string
    province?: string
    country?: string
    createdDate?: Dayjs
    createdBy?: string
    updatedDate?: Dayjs
    updatedBy?: string
    addressLine1?: string
    addressLine2?: string
    district?: string
    subDistrict?: string
    addressType?: string
    identityCode?: string
}

export interface ICandidateAddressResponse {
    status: boolean;
    message: string;
}

export interface IInputAddCandidateAddress {
    addressLine1?: string
    addressLine2?: string
    subDistrict?: string
    district?: string
    province?: string
    country?: string
    postalCode?: string
    addressType?: string
}
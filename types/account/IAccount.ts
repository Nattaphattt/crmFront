import dayjs, { Dayjs } from "dayjs";

export default interface IAccount {

    accountId?: string | null,
    accountStatus?: string | null,
    address?: string | null,
    annualRevenue?: number | null,
    attachment_id?: string | null,
    billingAddress?: string | null,
    billingCity?: string | null,
    billingContact?: string | null,
    billingCountry?: string | null,
    billingMail?: string | null,
    billingNote?: string | null,
    billingPostalCode?: string | null,
    billingProvince?: string | null,
    billingTel?: string | null,
    city?: string | null,
    companyName?: string | null,
    country?: string | null,
    createdBy?: string | null,
    createdDate?:string | null,
    favoriteFlag?: string | null,
    followUpDate?:string | null,
    followUpFlag?: string | null,
    followUpNote?: string | null,
    hideFlag?: string | null,
    industry?: string | null,
    leadsId?: string | null,
    leadsOwner?: string | null,
    noEmployees?: string | null,
    note?: string | null,
    postalCode?: string | null,
    province?: string | null,
    refId?: string | null,
    skypeId?: string | null,
    source?: string | null,
    taxId?: string | null,
    twitter?: string | null,
    updatedBy?: string | null,
    updatedDate?:string | null,
    website?: string | null
}

export interface IAccountSearch {
    id?: number | null,
    companyName?: string | null,
    billingContact?: string | null,// assume it's contact person
    accountStatus?: string | null,
    favoriteFlag?: string | null,
    followUpFlag?: string | null,
    createdBy?: string | null,
    updatedDate?:string | null,

    
}
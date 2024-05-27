import dayjs, { Dayjs } from "dayjs";

export default interface IAccount {
    leads_id?: string | null,
    attachment_id?: string | null,
    annual_revenue?: number | null,
    follow_up_date?: Dayjs | null,
    no_employees?: number | null,
    created_date?: Dayjs | null,
    updated_date?: Dayjs | null,
    account_id?: number | null,
    account_status?: string | null,
    follow_up_flag?: string | null,
    follow_up_note?: string | null,
    favorite_flag?: string | null,
    country?: string | null,
    postal_code?: string | null,
    province?: string | null,
    city?: string | null,
    address?: string | null,
    note?: string | null,
    tax_id?: string | null,
    billing_tel?: string | null,
    billing_contact?: string | null,
    billing_mail?: string | null,
    billing_country?: string | null,
    billing_postal_code?: string | null,
    billing_province?: string | null,
    billing_city?: string | null,
    billing_address?: string | null,
    billing_note?: string | null,
    hide_flag?: string | null,
    created_by?: string | null,
    updated_by?: string | null,
    ref_id?: string | null,
    company_name?: string | null,
    leads_owner?: string | null,
    industry?: string | null,
    website?: string | null,
    skype_id?: string | null,
    twitter?: string | null,
    source?: string | null
}

export interface IAccountSearch {
    id?: number | null,
    company_name?: string | null,
    billing_contact?: string | null,// assume it's contact person
    account_status?: string | null,
    favorite_flag?: string | null,
    follow_up_flag?: string | null,
    created_by?: string | null,
    updated_date?: Dayjs | null,

    
}
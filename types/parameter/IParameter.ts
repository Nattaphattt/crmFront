import { Dayjs } from "dayjs";

export interface IParameter {
    id?: number | null;
    code?: string | null;
    name?: string | null;
    description?: string | null;
    flagActive?: string | null;
    createBy?: string | null;
    createDate?: Dayjs | null;
    updateBy?: string | null;
    updateDate?: Dayjs | null;
}
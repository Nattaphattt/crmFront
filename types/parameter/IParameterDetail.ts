import { Dayjs } from "dayjs";

export interface IParameterDetail {
    id?: number | null;
    code?: string | null;
    name?: string | null;
    description?: string | null;
    variable1?: string | null;
    variable2?: string | null;
    variable3?: string | null;
    variable4?: string | null;
    variable5?: string | null;
    variable6?: string | null;
    variable7?: string | null;
    variable8?: string | null;
    variable9?: string | null;
    flagActive?: string | null;
    parameterId?: number | null;
    createdBy?: string | null;
    createdDate?: Dayjs | null;
    updatedBy?: string | null;
    updatedDate?: Dayjs | null;
}
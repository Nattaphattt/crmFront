import { Dayjs } from "dayjs";

export interface ICandidateSkill {
    id?: number,
    idCandidate?: number,
    idSkill?: String,
    createdDate?: Dayjs,
    createdBy?: String,
    updatedDate?: Dayjs,
    updatedBy?: String,
    identityCode?: String,
}

export interface IUpdateAndAddCandidateSkill {
    listIdSkill?: number[],
    idCandidate?: number,
    createdBy?: String,
    identityCode?: String,
}

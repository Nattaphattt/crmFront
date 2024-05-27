import { Dayjs } from "dayjs";

export interface ICandidateExperience {
  id?: number; 
  idCandidate?: number;
  occupation?: string;
  company?: string;
  jobDescription?: string;
  workDurationFrom?: string;
  workDurationTo?: string;
  createdDate?: string;
  createdBy?: string;
  updatedDate?: string;
  updatedBy?: string;
  identityCode?: string;
}

export interface ICandidateExperienceResponse {
  status: boolean;
  message: string;
}

export interface IInputAddCandidateExperience {
  identityCode?: string;
  occupation: string;
  company: string;
  jobDescription: string;
  workDurationFrom: Dayjs;
  workDurationTo: Dayjs;
}

export interface IAddCandidateExperience {
  identityCode?: string;
  id?: number;
  idCandidate?: number;
  occupation?: string;
  company?: string;
  jobDescription?: string;
  workDurationFrom?: string;
  workDurationTo?: string;
  createdDate?: string;
  createdBy?: string;
  updatedBy?: string;
}
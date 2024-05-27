import { Dayjs } from "dayjs";
import { IUpdateAndAddCandidateSkill } from "./ICandidateSkill";
import { IUpdateAndAddCandidatePosition } from "./ICandidatePosition";
import { IUpdateAndAddCandidateTool } from "./ICandidateTool";

export interface ICandidate {
  candidateId?: number | null;
  candidateCode?: string | null;

  // Basic Info
  nameTitle?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  fullNameTh?: string | null;
  nickName?: string | null;
  dateOfBirth?: Dayjs | null;
  age?: number | null;
  email?: string | null;
  phoneNumber?: string | null;
  lineId?: string | null;
  englishSkill?: string | null;
  gender?: string | null;
  notebook?: string | null;
  startWorking?: string | null;
  vehicle?: string | null;
  currency?: string | null;
  moveHousing?: string | null;
  // Address
  country?: string | null;
  postalCode?: string | null;
  province?: string | null;
  city?: string | null;
  candidateAddress?: string | null;

  //Professional Details
  experienceProfessional?: string | null;
  currentJobTitle?: string | null;
  currentSalary?: string | null;
  expectedSalary?: string | null;
  contractExpectedSalary?: string | null;
  skillSet?: string | null;
  totalExperience?: string | null;
  profileSummary?: string | null;

  //Other infomations
  source?: string | null;
  candidateStatus?: string | null;
  candidateOwner?: string | null;
  candidateStages?: string | null;
  convenientToInterview?: string | null;
  advantages?: string | null;
  disadvantages?: string | null;
  ableToTravelToWorkInTheArea?: string | null;
  ableToTravelToWorkInOtherProvinces?: string | null;

  comment?: string | null;

  profileUpload?: string | null;
  rating?: number | null;
  remarkRating?: string | null;

  education?: EducationDetails[];
  experience?: ExperienceDetails[];
  attachments: FileAttachment[]

  createDate?: Dayjs | null;
  createBy?: string | null;
  updateDate?: Dayjs | null;
  updateBy?: string | null;
}

interface FileAttachment {
  type?: string;
  fileName?: string;
  file?: File;
  url?: string;
}

interface EducationDetails {
  educationId?: number | null;
  candidateId?: number | null;
  university?: string | null;
  degree?: string | null;
  department?: string | null;
  major?: string | null;
  durationFrom?: Dayjs | null;
  durationTo?: Dayjs | null;
  gpa?: string | null;
  currentPersuing?: boolean | null;
}

interface ExperienceDetails {
  candidateId?: number | null;
  position?: string | null;
  company?: string | null;
  summary?: string | null;
  workDurationFrom?: Dayjs | null;
  workDurationTo?: Dayjs | null;
  workDurationYear?: number | null;
  salary?: number | null;
  currentlyWorkHere?: boolean | null;
  projectReference?: projectReference[];
}

interface projectReference {
  experienceId?: number | null;
  projectName?: string | null;
  position?: string | null;
  techStack?: string | null;
}

export interface ICandidateSearch {
  id?: number | null;
  rating?: string | null;
  candidateCode?: string | null;
  candidateName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  currentJobTitle?: string | null;
  source?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  updateDate?: string | null;
  candidateStages?: string | null;
  createBy?: string | null;
  createDate?: string | null;
  candidateOwner?: string | null;
}

// -----------------------------

export interface ICandidateBackup {
  identityCode?: string | null;
  idCandidate?: number | null;
  candidateFirstName?: string;
  candidateLastName?: string;
  age?: number | null;
  phoneNumber?: string | null;
  gender?: string | null;
  degree?: string | null;
  institute?: string | null;
  currentCompany?: string | null;
  currentPosition?: string | null;
  location?: string | null;
  birthDate?: Dayjs | null;
  address?: string | null;
  email?: string | null;
  screenDate?: Dayjs | null;
  yearOfExperience?: string | null;
  resourceChannel?: string | null;
  presentRate?: string | null;
  expectPermanentRate?: string | null;
  expectOutsourceRate?: string | null;
  processStatus?: string | null;
  remark?: string | null;
  imgProfile?: File | null;
  createdDate?: Dayjs | null;
  createdBy?: string | null;
  updatedDate?: Dayjs | null;
  updatedBy?: string | null;
}

export interface ICandidateAdd {
  identityCode?: string | null;
  candidateFirstName: string | null;
  candidateLastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  yearOfExperience: string | null;
  resourceChannel: string | null;
  presentRate: string | null;
  expectPermanentRate: string | null;
  expectOutsourceRate: string | null;
  remark: string | null;
  createdBy?: string | null;
  imgProfile?: File | null;
}

export interface ICandidateResponse {
  status: boolean;
  message: string;
}

export interface IInputAddCandidate {
  firstname: string;
  lastname: string;
  email: string;
  mobilePhone: string;
  yearOfAllExp: string;
  resources: string;
  presentRate: string;
  expectPermRate: string;
  expectOsRate: string;
  remark: string;
}

export interface IInputAddCandidateDetail {
  candidateFirstName: string | null;
  candidateLastName: string | null;
  phoneNumber: string | null;
  age?: number | null;
  gender?: string | null;
  degree?: string | null;
  institute?: string | null;
  currentCompany?: string | null;
  currentPosition?: string | null;
  location?: string | null;
  birthDate?: Dayjs | null;
  address?: string | null;
  email?: string | null;
  screenDate?: Dayjs | null;
  yearOfExperience?: string | null;
  resourceChannel?: string | null;
  presentRate?: string | null;
  expectPermanentRate?: string | null;
  expectOutsourceRate?: string | null;
  processStatus?: string | null;
  remark?: string | null;
}

export interface IUpdateCandidateReq {
  candidate?: IInputAddCandidateDetail;
  skill?: IUpdateAndAddCandidateSkill;
  position?: IUpdateAndAddCandidatePosition;
  tool?: IUpdateAndAddCandidateTool;
  updatedBy?: string;
}

export interface IUpdateCandidate {
  idCandidate?: string;
  payload?: IUpdateCandidateReq;
}

export interface ICandidateDetail {
  identityCode?: string | null;
  idCandidate?: number | null;
  candidateFirstName?: string;
  candidateLastName?: string;
  age?: number | null;
  phoneNumber?: string | null;
  gender?: string | null;
  degree?: string | null;
  institute?: string | null;
  currentCompany?: string | null;
  currentPosition?: string | null;
  location?: string | null;
  birthDate?: Dayjs | null;
  address?: string | null;
  email?: string | null;
  screenDate?: Dayjs | null;
  yearOfExperience?: string | null;
  resourceChannel?: string | null;
  presentRate?: string | null;
  expectPermanentRate?: string | null;
  expectOutsourceRate?: string | null;
  processStatus?: string | null;
  remark?: string | null;
  imagePath?: string | null;
  createdDate?: Dayjs | null;
  createdBy?: string | null;
  updatedDate?: Dayjs | null;
  updatedBy?: string | null;
  idSkillList?: string | null;
  idToolList?: string | null;
  idPositionList?: string | null;
}
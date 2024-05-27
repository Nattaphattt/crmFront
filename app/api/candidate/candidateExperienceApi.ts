import { isAxiosError } from "axios";
import axiosApi from "#/utils/axiosApi";
import { IAddCandidateExperience, ICandidateExperience, ICandidateExperienceResponse } from "#/types/candidate/ICandidateExperience";

export const getExperienceByIdCandidateApi = async (idCandidate: number) => {
    try {
        const response = await axiosApi.get<ICandidateExperience[]>(
            `/ats/candidateExperience/getByIdCandidate/${idCandidate}`
        );
        if (response?.data === undefined) {
            throw ("error indefine")
        }
        return response?.data;
    } catch (err) {
        if (isAxiosError(err)) {
            console.error(err);
            throw Promise.reject(err);
        } else {
            console.error(err);
            throw Promise.reject(err);
        }
    }
}

export const addCandidateExperienceApi = async (payload: IAddCandidateExperience) => {
    try {
        const response = await axiosApi.post<ICandidateExperienceResponse>(
            `/ats/candidateExperience/add`,
            payload
        );
        return response?.data;
    } catch (err) {
        if (isAxiosError(err)) {
            console.error(err);
            throw Promise.reject(err);
        } else {
            console.error(err);
            throw Promise.reject(err);
        }
    }
};

export const updateCandidateExperienceApi = async (payload: IAddCandidateExperience) => {
    try {
        const response = await axiosApi.post<ICandidateExperienceResponse>(
            `/ats/candidateExperience/update`,
            payload
        );
        return response?.data;
    } catch (err) {
        if (isAxiosError(err)) {
            console.error(err);
            throw Promise.reject(err);
        } else {
            console.error(err);
            throw Promise.reject(err);
        }
    }
};

export const deleteCandidateExperienceApi = async (id:number) => {
    try {
        const response = await axiosApi.delete(
            `/ats/candidateExperience/delete/${id}`
        );
        return response?.data;
    } catch (err) {
        if (isAxiosError(err)) {
            console.error(err);
            throw Promise.reject(err);
        } else {
            console.error(err);
            throw Promise.reject(err);
        }
    }
};
import { isAxiosError } from "axios";
import axiosApi from "#/utils/axiosApi";
import { ICandidateEducation, ICandidateEducationResponse } from "#/types/candidate/ICandidateEducation";

export const getEducationByIdCandidateApi = async (idCandidate: number) => {
    try {
        const response = await axiosApi.get<ICandidateEducation[]>(
            `/ats/candidateEducation/getByIdCandidate/${idCandidate}`
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

export const addCandidateEducationApi = async (payload: ICandidateEducation) => {
    try {
        const response = await axiosApi.post<ICandidateEducationResponse>(
            `/ats/candidateEducation/add`,
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

export const updateCandidateEducationApi = async (payload: ICandidateEducation) => {
    try {
        const response = await axiosApi.post<ICandidateEducationResponse>(
            `/ats/candidateEducation/update`,
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

export const deleteCandidateEducationApi = async (id:number) => {
    try {
        const response = await axiosApi.delete(
            `/ats/candidateEducation/delete/${id}`
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
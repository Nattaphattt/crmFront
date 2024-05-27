import { isAxiosError } from "axios";
import axiosApi from "#/utils/axiosApi";
import { ICandidateEmergencyContact, ICandidateEmergencyContactResponse } from "#/types/candidate/ICandidateEmergencyContact";

export const getEmergencyContactByIdCandidateApi = async (idCandidate: number) => {
    try {
        const response = await axiosApi.get<ICandidateEmergencyContact[]>(
            `/ats/candidateEmergencyContact/getByIdCandidate/${idCandidate}`
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

export const addCandidateEmergencyContactApi = async (payload: ICandidateEmergencyContact) => {
    try {
        const response = await axiosApi.post<ICandidateEmergencyContactResponse>(
            `/ats/candidateEmergencyContact/add`,
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

export const updateCandidateEmergencyContactApi = async (payload: ICandidateEmergencyContact) => {
    try {
        const response = await axiosApi.post<ICandidateEmergencyContactResponse>(
            `/ats/candidateEmergencyContact/update`,
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

export const deleteCandidateEmergencyContactApi = async (id:number) => {
    try {
        const response = await axiosApi.delete(
            `/ats/candidateEmergencyContact/delete/${id}`
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
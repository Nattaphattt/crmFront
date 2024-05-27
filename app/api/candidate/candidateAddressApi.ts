import { isAxiosError } from "axios";
import axiosApi from "#/utils/axiosApi";
import { ICandidateAddress, ICandidateAddressResponse } from "#/types/candidate/ICandidateAddress";

export const getAddressByIdCandidateApi = async (idCandidate: number) => {
    try {
        const response = await axiosApi.get<ICandidateAddress[]>(
            `/ats/candidateAddress/getByIdCandidate/${idCandidate}`
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

export const addCandidateAddressApi = async (payload: ICandidateAddress) => {
    try {
        const response = await axiosApi.post<ICandidateAddressResponse>(
            `/ats/candidateAddress/add`,
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

export const updateCandidateAddressApi = async (payload: ICandidateAddress) => {
    try {
        const response = await axiosApi.post<ICandidateAddressResponse>(
            `/ats/candidateAddress/update`,
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

export const deleteCandidateAddressApi = async (id:number) => {
    try {
        const response = await axiosApi.delete(
            `/ats/candidateAddress/delete/${id}`
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
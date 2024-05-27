import { ICandidate, ICandidateAdd, ICandidateBackup, ICandidateDetail, ICandidateResponse, ICandidateSearch, IUpdateCandidate } from "#/types/candidate/ICandidate";
import { ISearch } from "#/types/candidate/ISearch";
import { IPagination, IResponse, IResponseInterviewDTO } from "#/types/other/IResponse";
import axiosApi from "#/utils/axiosApi";
import { isAxiosError } from "axios";

export const getAllCandidateApi = async () => {
    try {
        const response = await axiosApi.get<IResponseInterviewDTO<ICandidate>>(
            `/ats/candidate/getAll`
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

export const getByCandidateIdApi = async (candidateId: number) => {
    try {
        const response = await axiosApi.get<IResponseInterviewDTO<ICandidate>>(
            `/ats/candidate/getByCandidateId/${candidateId}`
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

export const addCandidateApi = async (payload: ICandidate) => {
    try {
        const response = await axiosApi.post<IResponseInterviewDTO<null>>(
            `/ats/candidate/add`, payload
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

export const updateCandidateApi = async (payload: ICandidate) => {
    try {
        const response = await axiosApi.put<IResponseInterviewDTO<null>>(
            `/ats/candidate/update`, payload
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

export const deleteCandidateApi = async (candidateId: number) => {
    try {
        const response = await axiosApi.delete<ICandidateResponse>(
            `/ats/candidate/delete/${candidateId}`
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

export const deleteManyIdCandidateApi = async (payload: string[]) => {
    try {
      const response = await axiosApi.post<IResponse>(
        `/ats/candidate/delete`, payload
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
  }

export const getByIdentityCodeApi = async (identityCode: string) => {
    try {
        const response = await axiosApi.get<ICandidateDetail[]>(
            `/ats/candidate/getByIdentityCode/${identityCode}`
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

export const searchCandidateApi = async (payload: ISearch) => {
    try {
        const response = await axiosApi.post<ICandidateDetail[]>(
            `/ats/candidate/search`,
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

export const getCandidateBySearchApi = async (payload: ICandidateSearch) => {
    try {
        const response = await axiosApi
            .post<IResponseInterviewDTO<IPagination<ICandidateSearch>>>(
                `ats/candidate/search?page=0&size=10`, payload
            );
        if (response?.data === undefined) {
            throw "error undefined";
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
};

// {
//     headers: {
//         'Content-Type': 'multipart/form-data'
//     }
// }
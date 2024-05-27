import { ICandidateTool } from "#/types/candidate/ICandidateTool";
import axiosApi from "#/utils/axiosApi";
import { isAxiosError } from "axios";

export const getCandidateToolByIdCandidateApi = async (idCandidate: number) => {
    try {
        const response = await axiosApi.get<ICandidateTool>(
            `/ats/candidateTool/getByIdCandidate/${idCandidate}`
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
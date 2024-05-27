import { IResponse } from "#/types/other/IResponse";
import axiosApi from "#/utils/axiosApi";
import { isAxiosError } from "axios";


export const getParameterDetailByCodeApi = async (code: String) => {
    try {
        const response = await axiosApi.get<IResponse>(
            `/master/admParameter/getParameterDetailByCode?code=${code}`
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
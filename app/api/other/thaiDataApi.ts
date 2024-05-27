import { IResponse } from "#/types/other/IResponse";
import { IThaiDataFindByPostalCode } from "#/types/other/IThaiData";
import axiosApi from "#/utils/axiosApi";
import { isAxiosError } from "axios";

export const getThaiDataFindByPostalCodeApi = async (postalCode : number) => {
    try {
        const response = await axiosApi.get<IResponse>(
            `/master/thaiData/getThaiDataFindByPostalCode/${postalCode}`
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
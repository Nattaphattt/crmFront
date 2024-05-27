import { MasterdataDetailRes } from "#/types/other/IMasterdata";
import { IPosition } from "#/types/other/IPosition";
import axiosApi from "#/utils/axiosApi";
import { isAxiosError } from "axios";

export const getAllPositionApi = async () => {
    try {
        const response = await axiosApi.get<IPosition[]>(
            `/position/getAll`
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
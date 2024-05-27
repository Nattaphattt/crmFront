import { MasterdataDetailRes } from "#/types/other/IMasterdata";
import axiosApi from "#/utils/axiosApi";
import { isAxiosError } from "axios";

export const getByMasterdataCodeApi = async (masterdataCode: String) => {
    try {
        const response = await axiosApi.get<MasterdataDetailRes[]>(
            `/masterdata/getByMasterdataCode/${masterdataCode}`
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
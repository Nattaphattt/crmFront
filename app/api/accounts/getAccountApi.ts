import IAccount from "#/types/account/IAccount";
import axiosApi, { isAxiosError } from "#/utils/axiosApi";
import axios from "axios";

export const getAccountApi = async () => {
    try {
        const response = await axios.get<IAccount[]>(
            `http://localhost:8088/api/v1/getAllAccounts`
        );
        if (response?.data === undefined) {
            throw ("error indefine")
        }
        return response?.data;
    } catch (err) {
        if (isAxiosError(err)) {
            console.error(err);
        }
    }
}
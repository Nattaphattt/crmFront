import IAccount from "#/types/account/IAccount";
import { IAdvSearch } from "#/types/account/IAdvSearch";
import axiosApi, { isAxiosError } from "#/utils/axiosApi";
import axios from "axios";

export const getAccountApi = async (): Promise<IAccount[]> => {
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
    return []
}

export const getAccountApiByAdvSearch = async (advSearchPredicate: IAdvSearch): Promise<IAccount[]> => {
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
    return []
}
import axiosApi, { IAxiosError, isAxiosError } from "#/utils/axiosApi";
import { IUserResponse } from "#/types/other/IUser";

export const getUserApi = async (username: string, token: any) => {
  try {
    const response = await axiosApi.get<IUserResponse>(
      `/master/admUser/getUser?username=${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(`Axios error in function`);
      console.error(err);
    } else {
      console.info(`display information text.`);
    }
  }
};

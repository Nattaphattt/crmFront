import axiosApi, { IAxiosError, isAxiosError } from "#/utils/axiosApi";
import { IRoleResponse } from "#/types/other/IRole";

export const getRoleApi = async (username: string) => {
    try {
      const response = await axiosApi.get<Array<IRoleResponse>>(
        `/master/admRole/getRoleByUsername?username=${username}`
      );
      // console.info(
      //   "getRoleApi: ",
      //   response.data,
      // );
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        // Access to config, request, and response
        console.error(`Axios error in function`);
        console.error(err);
      } else {
        console.info(`display information text.`);
      }
    }
  };
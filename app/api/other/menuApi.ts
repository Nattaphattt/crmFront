import axiosApi, { IAxiosError, isAxiosError } from "#/utils/axiosApi";
import { IMenuResponse } from "#/types/other/IMenu";

export const getMenuApi = async (username: string) => {
  try {
    const response = await axiosApi.get<Array<IMenuResponse>>(
      `/master/admMenu/findByUsername?username=${username}`
    );
    // console.info(
    //   "getMenuApi: ",
    //   response.data,
    //   convertArrayToNested(response.data)
    // );
    return convertArrayToNested(response.data);
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

function convertArrayToNested(array: IMenuResponse[]): IMenuResponse[] {
  const menuMap: { [key: number]: IMenuResponse } = {};

  array.forEach((item) => {
    item.child = null;
    menuMap[item.menuId] = item;
  });

  const result: IMenuResponse[] = [];
  array.forEach((item, idex) => {
    if (item.parent === item.menuId) {
      result.push(item);
    } else {
      if (item.parent) {
        const parent = menuMap[item.parent];
        if (parent) {
          if (!parent.child) {
              const newArr: IMenuResponse[] = [];
              newArr.push(item)
              parent.child = newArr;
          } else if (Array.isArray(parent.child)) {
            parent.child.push(item);
          } else {
            parent.child = [parent.child, item];
          }
        }
      }
    }
  });
  return result;
}

import { ISkill, ISkillSelect } from "#/types/other/ISkill";
import axiosApi from "#/utils/axiosApi";
import { isAxiosError } from "axios";

export const getAllSkillApi = async () => {
    try {
        const response = await axiosApi.get<ISkill[]>(
            `/ats/skill/getAll`
        );

        let skillSelect: ISkillSelect[] = [];
        response?.data?.map((item) => {
            skillSelect.push({
                idSkill: item.idSkill,
                skillName: item.skillName
            })
        })

        return skillSelect;
        
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
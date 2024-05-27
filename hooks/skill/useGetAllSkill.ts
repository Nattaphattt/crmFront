import { ISkillSelect } from "#/types/other/ISkill";
import { useQuery } from "@tanstack/react-query";
import { getAllSkillApi } from "#/app/api/other/skillApi";
import { getAllSkill } from "../queries/skillQueriesKey";

export const useGetAllSkill = (isDetail: boolean) => {
    return useQuery<ISkillSelect[], { message: string }>(
        [getAllSkill, isDetail],
        async () => {
            const res = await getAllSkillApi()
            if (isDetail) return res
            res.unshift({
                idSkill: 0,
                skillName: "All",
            })
            return res
        }
    );
};
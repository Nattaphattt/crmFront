import React from 'react'
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

type Props = {
    title: string;
}

const ExportBtn = ({ title }: Props) => {
    return (
        <button className="items-center text-sm justify-center flex gap-2 border-2 text-[#C60000] border-[#C60000] rounded-lg px-2 py-1 shadow-lg hover:text-white hover:bg-[#C60000] duration-300">
            {title}
            <DescriptionOutlinedIcon />
        </button>
    )
}



export default ExportBtn
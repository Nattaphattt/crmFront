"use client";
import React from "react";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

type Props = {};

const AddDateBtn = (props: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div className=" cursor-pointer  bg-[#F58AC6] border-l-2 border-y-2 border-[#F58AC6] rounded-l-lg w-8 h-10 flex justify-center items-center">
        <AddRoundedIcon className="text-white" />
      </div>
      <button className=" w-24 h-10 hover:bg-[#F58AC6] hover:text-white duration-300  border-2 border-[#F58AC6] rounded-r-lg text-[#F58AC6]">
        Add Date
      </button>
    </div>
  );
};

export default AddDateBtn;
"use client";
import React from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

type Props = {};

const BackBtn = (props: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div className=" cursor-pointer bg-[#8E919D] border-l-2 border-y-2 border-[#8E919D] rounded-l-lg w-8 h-10 flex justify-center items-center">
        <ArrowBackIosNewRoundedIcon className="text-white" />
      </div>
      <button className=" w-24 h-10 hover:bg-[#8E919D] hover:text-white duration-300 border-2 border-[#8E919D] rounded-r-lg text-[#8E919D]">
        Back
      </button>
    </div>
  );
};

export default BackBtn;
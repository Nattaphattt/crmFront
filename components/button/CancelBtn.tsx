"use client";
import React from "react";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Typography } from "@mui/material";

type Props = {};

const CancelBtn = (props: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div className=" cursor-pointer bg-[#8E919D] border-l-2 border-y-2 border-[#8E919D] rounded-l-lg w-8 h-10 flex justify-center items-center">
        <ClearRoundedIcon className="text-white" />
      </div>
      <button className=" w-24 h-10 hover:bg-[#8E919D] hover:text-white duration-300 border-2 border-[#8E919D] rounded-r-lg text-[#8E919D]">
        <Typography variant="button">
          Cancel
        </Typography>
      </button>
    </div>
  );
};

export default CancelBtn;
"use client";
import React from "react";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Typography } from "@mui/material";

type Props = {};

const ConfirmBtn = (props: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div className=" cursor-pointer bg-[#8286FF] border-l-2 border-y-2 border-[#8286FF] rounded-l-lg w-8 h-10 flex justify-center items-center">
        <CheckRoundedIcon className="text-white" />
      </div>
      <button className=" w-24 h-10 hover:bg-[#8286FF] hover:text-white duration-300 border-2 border-[#8286FF] rounded-r-lg text-[#8286FF]">
        <Typography variant="button">
          Confirm
        </Typography>
      </button>
    </div>
  );
};

export default ConfirmBtn;
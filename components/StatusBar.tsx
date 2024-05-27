import React from "react";

type Props = {
  status: String | undefined;
};

const StatusBar = (props: Props) => {
  return (
    <div className="p-1 bg-gradient-to-r rounded-2xl from-[#B44BFF] to-[#39DCFF]">
      <div className=" bg-white px-3 rounded-2xl flex justify-center flex-row items-center">
        <h1 className="text-lg">Status: </h1>
        <div
          className={`w-4 h-4 rounded-full ml-2 ${
            props.status == "Draft"
              ? "bg-[#C2C2C2]"
              : props.status == "Wait"
              ? "bg-[#1D4ED8]"
              : props.status == "Reject"
              ? "bg-[#DC2626]"
              : props.status == "Approve"
              ? "bg-[#84CC16]"
              : ""
          }`}
        />
      </div>
    </div>
  );
};

export default StatusBar;

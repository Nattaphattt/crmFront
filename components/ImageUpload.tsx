"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";

interface ImageUploadProps {
  onChange: (base64: string) => void;
  label?: string;
  value: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  label,
  value,
  disabled,
}) => {
  const [base64, setBase64] = useState(value);
  const [nameImg, setNameImg] = useState("");
  const handlerChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();
      /*************************************************/
      console.log(file.path);
      setNameImg(file.path);

      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handlerChange(event.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handlerChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <>
      <div className="flex justify-between gap-5">
        <Button
          variant="contained"
          component="label"
          className="flex justify-center text-xs md:text-base items-center gap-3 h-10">
          Choose File
          <input {...getInputProps()} />
          <BackupOutlinedIcon />
        </Button>

        <h1 className=" font-semibold text-xs md:text-base">
          {nameImg ? nameImg : "No file selecttion"}
        </h1>
        <div className="flex items-center justify-center">
          {/* {base64 ? (
            <div className="flex items-center justify-center">
              <Image src={base64} height={100} width={100} alt="Upload image" />
            </div>
          ) : (
            <h1 className="text-white">{label}</h1>
          )} */}
        </div>
      </div>
    </>
  );
};

export default ImageUpload;

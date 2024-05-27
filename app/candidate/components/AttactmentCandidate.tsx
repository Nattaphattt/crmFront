"use client"
import { Box, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, UseFormReturn, useFieldArray } from 'react-hook-form';
import { ICandidate } from '#/types/candidate/ICandidate';
import ActionBtn from '#/components/button/ActionBtn'
import PlusIcon from '#/public/assets/icon-svg/plus.svg';
import React from 'react'
import Image from "next/image";
import { Clear } from '@mui/icons-material';

type Props = {
  hookForm: UseFormReturn<ICandidate, any>
}

export default function AttactmentCandidate({ hookForm }: Props) {
  const {
    register: regCandidate,
    formState: { errors: errorsCandidate },
    control,
  } = hookForm

  const { fields, append, prepend, remove, swap, move, insert, update } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "attachments", // unique name for your Field Array
  });

  const typeItems = ["CV", "Port", "Certificate"];

  const handleClickAdd = () => {
    console.log("[Attachment] @handleClickAdd >>>")
    append({ type: undefined, fileName: undefined, file: undefined, url: undefined });
  }

  // { type: string, fileName: string, url: string }[]

  const handleFileChange = (files: FileList | null, index: number) => {
    console.log("[Attachment] @handleFileChange index >>>", index)
    if (files) {
      const file = files[0];
      // setFileName(file.name);
      // TODO: set file and fileName to the hook form
      update(index, { ...fields[index], file: file, fileName: file.name })
    }
  };

  const handleClickDelete = (index: number) => {
    console.log("[Attachment] @handleClickDelete index >>>", index)
    remove(index);
  }

  return (
    <>
      {fields.map((field, index) => (
        <Box key={field.id} className="m-4 flex justify-center gap-4">
          <Controller
            control={control}
            name={`attachments.${index}.type`}
            render={({ field: f, fieldState }) => {
              return (
                <FormControl className='w-[121px] mr-4' size="small">
                  <InputLabel>Select</InputLabel>
                  <Select
                    value={f.value || ''}
                    onChange={(e) => f.onChange(e.target.value)}
                    error={Boolean(fieldState.invalid)}
                    label="Select"
                    size="small"
                  >
                    {typeItems.map((option) => (
                      <MenuItem key={option} value={option} className="text-start">
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldState.invalid && (<FormHelperText error>{fieldState.error?.message}</FormHelperText>)}
                </FormControl>
              );
            }}
          />
          <Box className="flex items-center">
            <TextField
              className="w-full"
              label="File"
              variant='outlined'
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "4px 0px 0px 4px" } }}
              disabled
              size="small"
              {...regCandidate(`attachments.${index}.fileName`)}
              error={!!errorsCandidate.attachments}
              helperText={errorsCandidate.country?.message}
            />
            {/* <Controller
              control={control}
              name={`attachments.${index}.file`}
              render={({ field: ff, fieldState }) => (
                <>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-r">Browse</label>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        console.log("e.target.files[0] >>>", e.target.files[0])
                        // TODO: recheck why file was not set to hook form
                        ff.onChange(e.target.files ? e.target.files[0] : undefined);
                        handleFileChange(e.target.files, index);
                      }
                    }}
                  />
                </>
              )}
            /> */}

            <label
              htmlFor={`file-upload-${index}`}
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-r">Browse</label>
            <input
              type="file"
              id={`file-upload-${index}`}
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files, index)}
            />
          </Box>
          <IconButton aria-label="delete-file" size="small"
            className='rounded bg-[#FF7E7E] hover:bg-[#ff6c6c]'
            onClick={() => handleClickDelete(index)}>
            <Clear className=' text-white' />
          </IconButton>
        </Box>
      ))}
      <ActionBtn
        title='Add Attachment'
        type='button'
        icon={<Image src={PlusIcon} alt="Plus Icon" />}
        onClick={handleClickAdd}
        color='#3190FF'
      />
    </>
  )
}
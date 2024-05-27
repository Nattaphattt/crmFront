import { ICandidate } from '#/types/candidate/ICandidate'
import React, { useEffect, useState } from 'react'
import { Controller, UseFormReturn, useFieldArray } from 'react-hook-form'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Autocomplete, Box, Checkbox, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { IParameterDetail } from '#/types/parameter/IParameterDetail';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ActionBtn from '#/components/button/ActionBtn';
import Image from 'next/image';
import PlusIcon from '#/public/assets/icon-svg/plus.svg';
import { useGetParameterDetailByCode } from '#/hooks/parameter/parameter/useGetParameterDetailByCode';
import ProjectReference from './ProjectReference';
import RTEditor from '#/components/richTextEditor/RTEditor';


type Props = {
  hookForm: UseFormReturn<ICandidate, any>
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ExperienceDetails({ hookForm }: Props) {
  const { data: position, isLoading: isLoadingPosition } = useGetParameterDetailByCode("POSITION");
  const [textRTE, setTextRTE] = useState<string>('');
  const [editorState, setEditorState] = useState<any>(null);

  const {
    control,
    register: regCandidate,
    handleSubmit: handleSubmitCandidate,
    formState :{ errors },
    watch,
    setValue
} = hookForm

const { fields: fieldExperience, append: appendExperience, remove: removeExperience } = useFieldArray({
  control,// control props comes from useForm (optional: if you are using FormProvider)
  name: "experience", // unique name for your Field Array
});

const handleDeleteExperience = (index: number) => {
  console.log("[Education] @handleDeleteEducation >>>", index)
  removeExperience(index);
}

const handleClickAddExperience = () => {
  console.log("[Education] @handleClickAdd >>>")
  appendExperience({
    position: null,
    company: null,
    summary: null,
    workDurationFrom: null,
    workDurationTo: null,
    workDurationYear: null,
    salary: null,
    currentlyWorkHere: null,
    projectReference: []
  });
}

const calculateWorkDurationYear = (from: string, to: string) => {
  const fromDate = dayjs(from);
  const toDate = dayjs(to);
  const year = toDate.diff(fromDate, 'year');
  return year.toFixed(1);
}

useEffect(() => {
  fieldExperience.map((field, index) => {
    if (field.workDurationFrom && field.workDurationTo) {
      const year = calculateWorkDurationYear(field.workDurationFrom.toString(), field.workDurationTo.toString());
      setValue(`experience.${index}.workDurationYear`, Number(year));
      console.log("[Experience] @useEffect >>>", field.workDurationFrom, field.workDurationTo, year);

    }
  })
}, [fieldExperience])


return (
  <>
    {fieldExperience.map((field, index) => (
      <>
        <main className="flex h-full mx-24 ">
          {/* Line */}
          <div className="flex flex-col justify-evenly">
            <div className="flex h-10 w-10 justify-center items-center rounded-full border-2 p-2">{index + 1}</div>
            <div className="flex h-full justify-center">
              <div className="h-full w-[1px] bg-[#C0C0C0]" />
            </div>
            <div className="flex h-10 w-10 justify-center rounded-full border bg-red-50 p-2 hover:bg-red-400 duration-500" onClick={() => handleDeleteExperience(index)}>
              <DeleteRoundedIcon color='error' />
            </div>
          </div>
          {/* Form */}
          <div className='w-full mx-4'>
            <div className='grid grid-cols-2 gap-6 mb-3'>

              <Controller
                control={control}
                name={`experience.${index}.position`}
                rules={{ required: 'Position is required' }}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <FormControl sx={{ minWidth: 100 }} size="small">
                        <Autocomplete
                          className="w-full col-span-2"
                          limitTags={2}
                          size='small'
                          loading={isLoadingPosition}
                          filterSelectedOptions
                          options={position?.data as IParameterDetail[] || []}
                          onChange={(e, value) => field.onChange(value?.code)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Position"
                              placeholder="Position"
                              error={!!errors.currentJobTitle}
                              helperText={errors.currentJobTitle?.message}
                              required
                            />
                          )}
                          renderOption={(props, option) => (
                            <li {...props} value={option.code!!}>{option.name}</li>
                          )}
                          getOptionLabel={(option) => option.name!!}
                          value={position?.data?.find((item: IParameterDetail) => item.code === field.value) || null}
                        />
                      </FormControl>
                      {/* <FormControl sx={{ minWidth: 100 }} size='small' required>
                          <InputLabel>Position</InputLabel>
                          <Select
                            value={String(field.value)}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={Boolean(fieldState.invalid)}
                            label="Position"
                          >
                            {
                              isLoadingPosition ? <MenuItem className='flex justify-center'><CircularProgress size={15} /></MenuItem> :
                                position?.data?.map((item: IParameterDetail, index: number) => (
                                  <MenuItem key={index} value={item.code!!}>{item.name}</MenuItem>
                                ))
                            }
                          </Select>
                          {fieldState.invalid && (
                            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                          )}
                        </FormControl> */}
                    </>
                  );
                }}
              />

              <TextField
                {...regCandidate(`experience.${index}.company`)}
                size='small'
                label="Company"
              // helperText={errorsCandidate.experience?.[index]?.company?.message ?? ''}
              // error={Boolean(errorsCandidate.experience?.[index]?.company)}
              />

              <div className='w-full col-span-2'>
                <Controller
                  name={`experience.${index}.summary`}
                  control={control}
                  render={({ field }) => (
                    <RTEditor
                      value={String(field.value)}
                      onChange={(value) => field.onChange(value)}
                      placeholder='Summary'
                    />
                  )}
                />
              </div>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name={`experience.${index}.workDurationFrom`}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Work Duration from"
                      views={['month', 'year']}
                      className="w-full"
                      {...field}
                      format="MM/YYYY"
                      value={dayjs(field.value) || null}
                      onChange={(newValue) => field.onChange(newValue)}
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          error: false,
                          size: "small",
                        }
                      }}

                    />
                  )}
                />
                <Controller
                  name={`experience.${index}.workDurationTo`}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Work DurationTo"
                      views={['month', 'year']}
                      className="w-full"
                      {...field}
                      format="MM/YYYY"
                      value={dayjs(field.value) || null}
                      onChange={(newValue) => field.onChange(newValue)}
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          error: false,
                          size: "small",
                        }
                      }}
                    />
                  )}
                />
              </LocalizationProvider>

              <TextField
                {...regCandidate(`experience.${index}.workDurationYear`)}
                size='small'
                type='number'
                label="Work Duration Year"
                aria-readonly
              // helperText={errorsCandidate.experience?.[index]?.workDurationYear?.message}
              // error={Boolean(errorsCandidate.experience?.[index]?.workDurationYear)}
              />

              <TextField
                {...regCandidate(`experience.${index}.salary`)}
                size='small'
                label="GPA"
                type='number'
              // helperText={errorsCandidate.experience?.[index]?.salary?.message}
              // error={Boolean(errorsCandidate.experience?.[index]?.salary)}
              />

              <Box>
                <Controller
                  name={`experience.${index}.currentlyWorkHere`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <Checkbox
                        {...label}
                        checked={Boolean(field.value)}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <span>I currently work here</span>
                    </>

                  )}
                />
              </Box>
            </div>

            <ProjectReference
              indexProjectReference={index}
              control={control}
              register={regCandidate}
            // error={errorsCandidate}
            />
          </div>
        </main>



        {index !== fieldExperience.length - 1 && <hr className='my-9' />}
      </>
    ))
    }
    <div className={`mx-24 px-20 ${fieldExperience.length !== 0 ? "flex" : ""}`}>
      <ActionBtn
        className='mt-9'
        title='Add Experience Details'
        icon={<Image src={PlusIcon} alt="Plus Icon" />}
        onClick={handleClickAddExperience}
        color='#8286FF'
      />
    </div>

  </>
)
}
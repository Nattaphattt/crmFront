import { ICandidate } from '#/types/candidate/ICandidate'
import { Box, Checkbox, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useEffect } from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Controller, UseFormReturn, useFieldArray } from 'react-hook-form'
import ActionBtn from '#/components/button/ActionBtn'
import Image from 'next/image'
import PlusIcon from '#/public/assets/icon-svg/plus.svg';
import dayjs from 'dayjs'
import { useGetParameterDetailByCode } from '#/hooks/parameter/parameter/useGetParameterDetailByCode'
import { IParameterDetail } from '#/types/parameter/IParameterDetail'


type Props = {
    hookForm: UseFormReturn<ICandidate, any>
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function EducationDetails({ hookForm }: Props) {
    const { data: degree, isLoading: isLoadingDegree } = useGetParameterDetailByCode("DEGREE");

    const {
        control,
        register: regCandidate,
        formState: { errors: errorsCandidate }
    } = hookForm

    const { fields, append, prepend, remove, swap, move, insert, update } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "education", // unique name for your Field Array

    });

    const handleClickAdd = () => {
        console.log("[Attachment] @handleClickAdd >>>")
        append({
            university: undefined,
            degree: undefined,
            department: undefined,
            major: undefined,
            durationFrom: undefined,
            durationTo: undefined,
            gpa: undefined,
            currentPersuing: false
        });
    }

    const handleDeleteEducation = (index: number) => {
        console.log("[Education] @handleDeleteEducation >>>", index)
        remove(index);
    }


    return (
        <>
            {fields.map((field, index) => (
                <>
                    <main className="flex h-full mx-24 ">
                        {/* Line */}
                        <div className="flex flex-col justify-evenly">
                            <div className="flex h-10 w-10 justify-center items-center rounded-full border-2 p-2">{index + 1}</div>
                            <div className="flex h-full justify-center">
                                <div className="h-full w-[1px] bg-[#C0C0C0]" />
                            </div>
                            <div className="flex h-10 w-10 justify-center rounded-full border bg-red-50 p-2 hover:bg-red-400 duration-500" onClick={() => handleDeleteEducation(index)}>
                                <DeleteRoundedIcon color='error' />
                            </div>
                        </div>
                        {/* Form */}
                        <div className='w-full mx-4'>
                            <div className='grid grid-cols-2 gap-6'>

                                <TextField
                                    {...regCandidate(`education.${index}.university`)}
                                    size='small'
                                    label="University"
                                    required
                                    helperText={errorsCandidate.education?.[index]?.university?.message ?? ''}
                                    error={Boolean(errorsCandidate.education?.[index]?.university)}
                                />

                                <Controller
                                    control={control}
                                    rules={{
                                        required: { value: true, message: 'Degree is required' }
                                    }}
                                    name={`education.${index}.degree`}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <>
                                                <FormControl sx={{ minWidth: 100 }} size='small' required>
                                                    <InputLabel>Degree</InputLabel>
                                                    <Select
                                                        value={String(field.value)}
                                                        onChange={(e) => field.onChange(e.target.value)}
                                                        error={Boolean(fieldState.invalid)}
                                                        label="Currency"
                                                    >
                                                        {
                                                            isLoadingDegree ? <MenuItem className='flex justify-center'><CircularProgress size={15} /></MenuItem> :
                                                                degree?.data.map((item: IParameterDetail, index: number) => (
                                                                    <MenuItem key={index} value={item.code!!}>{item.name}</MenuItem>
                                                                ))
                                                        }
                                                    </Select>
                                                    {fieldState.invalid && (
                                                        <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            </>
                                        );
                                    }}
                                />

                                <TextField
                                    {...regCandidate(`education.${index}.department`)}
                                    size='small'
                                    label="Department"
                                    helperText={errorsCandidate.education?.[index]?.department?.message}
                                    error={Boolean(errorsCandidate.education?.[index]?.department)}
                                />

                                <TextField
                                    {...regCandidate(`education.${index}.major`)}
                                    size='small'
                                    label="Major"
                                    helperText={errorsCandidate.education?.[index]?.major?.message}
                                    error={Boolean(errorsCandidate.education?.[index]?.major)}
                                />

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Controller
                                        name={`education.${index}.durationFrom`}
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Duration from"
                                                views={['month', 'year']}
                                                className="w-full"
                                                {...field}
                                                format="DD/MM/YYYY"
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
                                        name={`education.${index}.durationTo`}
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                label="To"
                                                views={['month', 'year']}
                                                className="w-full"
                                                {...field}
                                                format="DD/MM/YYYY"
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
                                    // format x.xx
                                    {...regCandidate(`education.${index}.gpa`, {
                                        // valueAsNumber: true,
                                        min: {
                                            value: 0,
                                            message: 'GPA must be greater than 0'
                                        },
                                        max: {
                                            value: 4,
                                            message: 'GPA must be less than 4'
                                        }
                                    })}
                                    size='small'
                                    label="GPA"
                                    type='number'
                                    helperText={errorsCandidate.education?.[index]?.gpa?.message}
                                    error={Boolean(errorsCandidate.education?.[index]?.gpa)}
                                />

                                <Box>
                                    <Controller
                                        name={`education.${index}.currentPersuing`}
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                <Checkbox
                                                    {...label}
                                                    checked={Boolean(field.value)}
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                />
                                                <span>Current Persuing</span>
                                            </>

                                        )}
                                    />
                                </Box>

                            </div>
                        </div>
                    </main>
                    {
                        index !== fields.length - 1 && <hr className='my-9' />
                    }
                </>
            ))}
            <ActionBtn
                className='mt-9'
                title='Add Educational Details'
                icon={<Image src={PlusIcon} alt="Plus Icon" />}
                onClick={handleClickAdd}
                color='#8286FF'
            />
        </>
    )
}
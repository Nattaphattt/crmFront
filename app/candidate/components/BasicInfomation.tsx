import { useGetParameterDetailByCode } from '#/hooks/parameter/parameter/useGetParameterDetailByCode';
import { ICandidate } from '#/types/candidate/ICandidate';
import { IParameterDetail } from '#/types/parameter/IParameterDetail';
import { Box, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form';

type Props = {
    hookForm: UseFormReturn<ICandidate, any>
}

export default function BasicInfomation({ hookForm }: Props) {
    const {
        control: controlCandidate,
        register: regCandidate,
        handleSubmit: handleSubmitCandidate,
        formState: { errors: errorsCandidate },
        watch
    } = hookForm


    const { data: nameTitleEn, isLoading: isLoadingNameTitleEn } = useGetParameterDetailByCode("NAME_TITLE_EN");
    const { data: englishSkill, isLoading: isLoadingEnglishSkill } = useGetParameterDetailByCode("ENGLISH_SKILL");
    const { data: gender, isLoading: isLoadingGender } = useGetParameterDetailByCode("GENDAR");
    const { data: noteBook, isLoading: isLoadingNoteBook } = useGetParameterDetailByCode("NOTEBOOK");
    const { data: startWork, isLoading: isLoadingStartWork } = useGetParameterDetailByCode("START_WORK");
    const { data: housing, isLoading: isLoadingHousing } = useGetParameterDetailByCode("HOUSING");
    const { data: vehicle, isLoading: isLoadingVehicle } = useGetParameterDetailByCode("VEHICLE");
    const { data: currency, isLoading: isLoadingCurrency } = useGetParameterDetailByCode("CURRENCY");


    return (
        <>
            <div className='grid grid-cols-2 mx-24 gap-6'>
                <div className='flex flex-row'>
                    <Controller
                        control={controlCandidate}
                        name="nameTitle"
                        rules={{ required: 'Address type is required' }}
                        render={({ field, fieldState }) => {
                            return (
                                <>
                                    <FormControl sx={{ minWidth: 100 }} required size='small' >
                                        <InputLabel>Name title</InputLabel>
                                        <Select
                                            inputProps={{ shrink: !!field.value }}
                                            value={String(field.value)}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            error={Boolean(fieldState.invalid)}
                                            sx={{ borderRadius: "5px 0px 0px 5px" }}
                                            label="Name title"
                                        >
                                            {
                                                isLoadingNameTitleEn ? <MenuItem className='flex justify-center'><CircularProgress size={15} /></MenuItem> :
                                                    nameTitleEn?.data.map((item: IParameterDetail, index: number) => (
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
                        {...regCandidate('firstName', {
                            required: {
                                value: true,
                                message: 'Please enter your first name',
                            },
                            pattern: {
                                value: /^[^\d]+$/,
                                message: 'Field should not contain numbers',
                            },
                        })}
                        fullWidth
                        label="First Name (ENG)"
                        InputProps={{
                            style: { borderRadius: '0px 5px 5px 0px' },
                        }}
                        required
                        size='small'
                        helperText={errorsCandidate.firstName?.message}
                        error={Boolean(errorsCandidate.firstName)}
                        InputLabelProps={{ shrink: watch('firstName') ? true : false }}
                    />
                </div>

                <TextField
                    {...regCandidate('lastName', {
                        required: {
                            value: true,
                            message: 'Please enter your last name',
                        },
                        pattern: {
                            value: /^[^\d]+$/,
                            message: 'Field should not contain numbers',
                        },
                    })}
                    label="Last Name (ENG)"
                    size='small'
                    required
                    helperText={errorsCandidate.lastName?.message}
                    error={Boolean(errorsCandidate.lastName)}
                    InputLabelProps={{ shrink: watch('lastName') ? true : false }}
                />

                <TextField
                    {...regCandidate('fullNameTh', {
                        required: {
                            value: true,
                            message: 'Please enter your full name',
                        },
                        pattern: {
                            value: /^[^\d]+$/,
                            message: 'Field should not contain numbers',
                        },
                    })}
                    label="Full Name (TH)"
                    size='small'
                    required
                    helperText={errorsCandidate.fullNameTh?.message}
                    error={Boolean(errorsCandidate.fullNameTh)}
                    InputLabelProps={{ shrink: watch('fullNameTh') ? true : false }}
                />

                <TextField
                    {...regCandidate('nickName', {
                        pattern: {
                            value: /^[^\d]+$/,
                            message: 'Field should not contain numbers',
                        },
                    })}
                    size='small'
                    label="Nickname"
                    helperText={errorsCandidate.nickName?.message}
                    error={Boolean(errorsCandidate.nickName)}
                    InputLabelProps={{ shrink: watch('nickName') ? true : false }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                        name="dateOfBirth"
                        control={controlCandidate}
                        defaultValue={undefined}
                        render={({ field }) => (
                            <DatePicker
                                label="Date of Birth"
                                className="w-full"
                                {...field}
                                format="DD/MM/YYYY"
                                value={dayjs(field.value) || undefined}
                                onChange={(newValue) => field.onChange(newValue)}
                                defaultValue={undefined}
                                slotProps={{
                                    textField: {
                                        variant: "outlined",
                                        error: false,
                                        size: "small",
                                        InputLabelProps: { shrink: true },
                                    }
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>

                <TextField
                    {...regCandidate('age',{
                        min: {
                            value: 0,
                            message: 'Invalid age'
                        },
                        max: {
                            value: 100,
                            message: 'Invalid age'
                        },
                        pattern: {
                            value: /^[0-9]+$/,
                            message: 'Invalid age'
                        }
                    })}
                    label="Age"
                    size='small'
                    helperText={errorsCandidate.age?.message}
                    error={Boolean(errorsCandidate.age)}
                    InputLabelProps={{ shrink: watch('age') ? true : false }}
                />

                <TextField
                    {...regCandidate('email', {
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/,
                            message: 'Invalid email format',
                        },
                    })}
                    label="Email"
                    size='small'
                    required
                    helperText={errorsCandidate.email?.message}
                    error={Boolean(errorsCandidate.email)}
                    InputLabelProps={{ shrink: watch('email') ? true : false }}
                />

                <TextField
                    {...regCandidate('phoneNumber', {
                        required: false,
                        pattern: {
                            value: /[0-9]{10}$/,
                            message: 'Invalid Phone number format (0-9) 10 characters'
                        },
                        minLength: {
                            value: 10,
                            message: 'Invalid Phone number format (0-9) 10 characters'
                        },
                        maxLength: {
                            value: 10,
                            message: 'Invalid Phone number format (0-9) 10 characters'
                        },
                    })}
                    size='small'
                    label="Phone number"
                    required
                    helperText={errorsCandidate.phoneNumber?.message}
                    error={Boolean(errorsCandidate.phoneNumber)}
                    InputLabelProps={{ shrink: watch('phoneNumber') ? true : false }}
                />

                <TextField
                    {...regCandidate('lineId')}
                    size='small'
                    label="Line ID"
                    helperText={errorsCandidate.lineId?.message}
                    error={Boolean(errorsCandidate.lineId)}
                    InputLabelProps={{ shrink: watch('lineId') ? true : false }}
                />

                <Controller
                    control={controlCandidate}
                    name="englishSkill"
                    render={({ field, fieldState }) => {
                        return (
                            <>
                                <FormControl sx={{ minWidth: 100 }} size='small'>
                                    <InputLabel>English Skill</InputLabel>
                                    <Select
                                        value={String(field.value)}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        error={Boolean(fieldState.invalid)}
                                        label="English Skill"
                                    >
                                        {
                                            isLoadingEnglishSkill ? <MenuItem className='flex justify-center'><CircularProgress size={15} /></MenuItem> :
                                                englishSkill?.data.map((item: IParameterDetail, index: number) => (
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

                <Controller
                    control={controlCandidate}
                    name="gender"
                    render={({ field, fieldState }) => {
                        return (
                            <>
                                <FormControl sx={{ minWidth: 100 }} size='small'>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        value={String(field.value)}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        error={Boolean(fieldState.invalid)}
                                        label="Gender"
                                    >
                                        {
                                            isLoadingGender ? <MenuItem className='flex justify-center'><CircularProgress size={15} /></MenuItem> :
                                                gender?.data.map((item: IParameterDetail, index: number) => (
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

                <Controller
                    control={controlCandidate}
                    name="notebook"
                    render={({ field, fieldState }) => {
                        return (
                            <>
                                <FormControl sx={{ minWidth: 100 }} size='small'>
                                    <InputLabel>Notebook</InputLabel>
                                    <Select
                                        value={String(field.value)}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        error={Boolean(fieldState.invalid)}
                                        label="Notebook"
                                    >
                                        {
                                            isLoadingNoteBook ? <MenuItem className='flex justify-center'><CircularProgress size={15} /></MenuItem> :
                                                noteBook?.data.map((item: IParameterDetail, index: number) => (
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

                <Controller
                    control={controlCandidate}
                    name="startWorking"
                    render={({ field, fieldState }) => {
                        return (
                            <>
                                <FormControl sx={{ minWidth: 100 }} size='small'>
                                    <InputLabel>Can start working in?</InputLabel>
                                    <Select
                                        value={String(field.value)}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        error={Boolean(fieldState.invalid)}
                                        label="Can start working in?"
                                    >
                                        {
                                            isLoadingStartWork ? <MenuItem className='flex justify-center'><CircularProgress size={15} /></MenuItem> :
                                                startWork?.data.map((item: IParameterDetail, index: number) => (
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

                <Controller
                    control={controlCandidate}
                    name="vehicle"
                    render={({ field, fieldState }) => {
                        return (
                            <>
                                <FormControl sx={{ minWidth: 100 }} size='small'>
                                    <InputLabel>Vehicle</InputLabel>
                                    <Select
                                        value={String(field.value)}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        error={Boolean(fieldState.invalid)}
                                        label="Vehicle"
                                    >
                                        {
                                            isLoadingVehicle ? <MenuItem className='flex justify-center'><CircularProgress size={15} /></MenuItem> :
                                                vehicle?.data.map((item: IParameterDetail, index: number) => (
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

                <Controller
                    control={controlCandidate}
                    name="currency"
                    render={({ field, fieldState }) => {
                        return (
                            <>
                                <FormControl sx={{ minWidth: 100 }} size='small'>
                                    <InputLabel>Currency</InputLabel>
                                    <Select
                                        value={String(field.value)}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        error={Boolean(fieldState.invalid)}
                                        label="Currency"
                                    >
                                        {
                                            isLoadingCurrency ? <MenuItem className='flex justify-center'><CircularProgress size={15} /></MenuItem> :
                                                currency?.data.map((item: IParameterDetail, index: number) => (
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

                <Controller
                    control={controlCandidate}
                    name="moveHousing"
                    render={({ field, fieldState }) => {
                        return (
                            <>
                                <FormControl sx={{ minWidth: 100 }} size='small'>
                                    <InputLabel>Can move housing?</InputLabel>
                                    <Select
                                        value={String(field.value)}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        error={Boolean(fieldState.invalid)}
                                        label="Can move housing?"
                                    >
                                        {
                                            isLoadingHousing ? <Box className='flex justify-center'><CircularProgress size={15} /></Box> :
                                                housing?.data.map((item: IParameterDetail, index: number) => (
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

            </div>
        </>
    )
}
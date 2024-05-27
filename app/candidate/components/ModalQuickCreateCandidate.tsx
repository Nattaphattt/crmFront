"use client"
import AlertForm from '#/components/modal/AlertForm'
import React, { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Autocomplete, Box, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ActionBtn from '#/components/button/ActionBtn';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ICandidate } from '#/types/candidate/ICandidate';
import { useGetParameterDetailByCode } from '#/hooks/parameter/parameter/useGetParameterDetailByCode';
import { useRouter } from 'next/navigation';
import { IParameterDetail } from '#/types/parameter/IParameterDetail';
import AlertBox from '#/components/modal/Alert';
import useAddCandidate from '#/hooks/candidate/useAddCandidate';
import { useSession } from 'next-auth/react';

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalQuickCreateCandidate({ isOpen, setIsOpen }: Props) {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;

    const { data: nameTitleEn, isLoading } = useGetParameterDetailByCode("NAME_TITLE_EN");
    const { data: currentJobTitle, isLoading: isLoadingCurrentJobTitle } = useGetParameterDetailByCode("CURRNT_JOB");
    const { data: source, isLoading: isLoadingSource } = useGetParameterDetailByCode("SOURCE");
    const { data: candidateOwner, isLoading: isLoadingCandidateOwner } = useGetParameterDetailByCode("CANDIDATE_OWNER");
    const { data: candidateStatus, isLoading: isLoadingCandidateStatus } = useGetParameterDetailByCode("CANDIDATE_STATUS");
    const { mutateAsync: addCandidate, isLoading: isLoadingCandidate } = useAddCandidate();

    const [alertIsOpen, setAlertIsOpen] = useState(false)
    const [textAlert, setTextAlert] = useState('')
    const [typeAlert, setTypeAlert] = useState('')
    const [loadingAddMoreInfomation, setLoadingAddMoreInfomation] = useState(false)

    const {
        register: regCandidate,
        handleSubmit,
        formState: { errors },
        control: controlCandidate,
    } = useForm<ICandidate>({
        defaultValues: {
            education: [],
            experience: [],
            attachments: [],
        }
    })


    const handleSave: SubmitHandler<ICandidate> = (formData) => {
        formData.createBy = user?.name
        addCandidate(formData)
            .then((res) => {
                setAlertIsOpen(true)
                setTextAlert(res.message)
                setTypeAlert(res.success ? 'success' : 'error')
                setTimeout(() => { setIsOpen(false), setAlertIsOpen(false) }, 2000)
            })
            .catch((err) => {
                setAlertIsOpen(true)
                setTextAlert('Save failed !')
                setTypeAlert('error')
            })
    }

    const handleAddMoreInfomation = () => {
        setLoadingAddMoreInfomation(true)
        router.push('/candidate/create')
    }

    return (
        <>
            <AlertForm isOpen={isOpen} setIsOpen={setIsOpen} style={{ width: '1024px' }}>
                <form onSubmit={handleSubmit(handleSave)}>
                    <div className='flex justify-between pb-2 items-center'>
                        <p className='font-normal text-3xl'>Quick Create Candidate</p>
                        <div className='bg-[#9796F0] rounded-2xl p-2 hover:bg-[#615fe0] duration-500' onClick={() => setIsOpen(false)}>
                            <CloseRoundedIcon sx={{ color: 'white' }} />
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div className='flex'>
                            <p className='font-normal text-xl m-3'>Basic Information</p>
                        </div>
                        <div className='grid grid-cols-2 mx-24 gap-6'>
                            <div className='flex flex-row'>
                                <Controller
                                    control={controlCandidate}
                                    name="nameTitle"
                                    rules={{ required: 'Address type is required' }}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <>
                                                <FormControl sx={{ minWidth: 100, textAlign: 'start' }} required size='small'>
                                                    <InputLabel>Name title</InputLabel>
                                                    <Select
                                                        value={field.value}
                                                        onChange={(e) => field.onChange(e.target.value)}
                                                        error={Boolean(fieldState.invalid)}
                                                        sx={{ borderRadius: "5px 0px 0px 5px" }}
                                                        label="Name title"
                                                    >
                                                        {
                                                            isLoading ? <Box className='flex justify-center'><CircularProgress size={30} /></Box> :
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
                                    size='small'
                                    fullWidth
                                    label="First Name (ENG)"
                                    InputProps={{
                                        style: { borderRadius: '0px 5px 5px 0px' },
                                    }}
                                    required
                                    helperText={errors.firstName?.message}
                                    error={Boolean(errors.firstName)}
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
                                required
                                size='small'
                                helperText={errors.lastName?.message}
                                error={Boolean(errors.lastName)}
                            />
                            <TextField
                                {...regCandidate('email', {
                                    pattern: {
                                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/,
                                        message: 'Invalid email format',
                                    },
                                })}
                                label="Email"
                                required
                                size='small'
                                helperText={errors.email?.message}
                                error={Boolean(errors.email)}
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
                                label="Phone number"
                                required
                                size='small'
                                helperText={errors.phoneNumber?.message}
                                error={Boolean(errors.phoneNumber)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='flex'>
                            <p className='font-normal text-xl m-3'>Professional Details</p>
                        </div>
                        <div className='grid grid-cols-2 mx-24 gap-6'>
                            <TextField
                                {...regCandidate('experienceProfessional')}
                                label="Experience"
                                size='small'
                            />
                            <Controller
                                control={controlCandidate}
                                name="currentJobTitle"
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <FormControl sx={{ minWidth: 100 }} size="small">
                                                <Autocomplete
                                                    className="w-full col-span-2"
                                                    limitTags={2}
                                                    size='small'
                                                    loading={isLoadingCurrentJobTitle}
                                                    filterSelectedOptions
                                                    options={currentJobTitle?.data as IParameterDetail[] || []}
                                                    onChange={(e, value) => field.onChange(value?.code)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Current Job Title"
                                                            placeholder="Current Job Title"
                                                            error={!!errors.currentJobTitle}
                                                            helperText={errors.currentJobTitle?.message}
                                                        />
                                                    )}
                                                    renderOption={(props, option) => (
                                                        <li {...props} value={option.code!!}>{option.name}</li>
                                                    )}
                                                    getOptionLabel={(option) => option.name!!}
                                                    value={currentJobTitle?.data?.find((item: IParameterDetail) => item.code === field.value) || null}
                                                />
                                            </FormControl>
                                        </>
                                    );
                                }}
                            />
                            <TextField
                                {...regCandidate('currentSalary')}
                                label="Current Salary"
                                size='small'
                                helperText={errors.currentSalary?.message}
                                error={Boolean(errors.currentSalary)}
                            />
                            <TextField
                                {...regCandidate('expectedSalary')}
                                label="Expected Salary"
                                size='small'
                                helperText={errors.expectedSalary?.message}
                                error={Boolean(errors.expectedSalary)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='flex'>
                            <p className='font-normal text-xl m-3'>Other Information</p>
                        </div>
                        <div className='grid grid-cols-2 mx-24 gap-6'>
                            <Controller
                                control={controlCandidate}
                                name="source"
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <FormControl sx={{ minWidth: 100, textAlign: 'start' }} size='small'>
                                                <InputLabel>Source</InputLabel>
                                                <Select
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    error={Boolean(fieldState.invalid)}
                                                    label="Source"
                                                >
                                                    {
                                                        isLoadingSource ? <Box className='flex justify-center'><CircularProgress size={30} /></Box> :
                                                            source?.data.map((item: IParameterDetail, index: number) => (
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
                                name="candidateStatus"
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <FormControl sx={{ minWidth: 100, textAlign: 'start' }} size='small'>
                                                <InputLabel>Candidate Status</InputLabel>
                                                <Select
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    error={Boolean(fieldState.invalid)}
                                                    label="Candidate Status"
                                                >
                                                    {
                                                        isLoadingCandidateStatus ? <Box className='flex justify-center'><CircularProgress size={30} /></Box> :
                                                            candidateStatus?.data.map((item: IParameterDetail, index: number) => (
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
                                name="candidateOwner"
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <FormControl sx={{ minWidth: 100, textAlign: 'start' }} size='small'>
                                                <InputLabel>Candidate Owner</InputLabel>
                                                <Select
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    error={Boolean(fieldState.invalid)}
                                                    label="Candidate Owner"
                                                >
                                                    {
                                                        isLoadingCandidateOwner ? <Box className='flex justify-center'><CircularProgress size={30} /></Box> :
                                                            candidateOwner?.data.map((item: IParameterDetail, index: number) => (
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

                            {/* <TextField
                                {...regCandidate('comment')}
                                label="Comment"
                                size='small'
                                multiline
                                fullWidth
                            /> */}
                        </div>
                    </div>
                    <div>
                        <div className='grid grid-cols-2 gap-6 mt-6'>
                            <div className='flex items-center'>
                                <p className='font-light text-lg hover:underline text-[#3190FF] cursor-pointer' onClick={handleAddMoreInfomation}>
                                    + Add more information {loadingAddMoreInfomation && <CircularProgress size={20} sx={{ color: '#3190FF' }} />}
                                </p>
                            </div>
                            <div className='flex justify-end'>
                                <ActionBtn title='Confirm' icon={<CheckRoundedIcon />} type='submit' />
                            </div>
                        </div>
                    </div>
                </form>
            </AlertForm>
            <AlertBox setIsOpen={setAlertIsOpen} isOpen={alertIsOpen} text={textAlert} type={typeAlert} />
        </>
    )
}
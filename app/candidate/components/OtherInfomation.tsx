import { useGetParameterDetailByCode } from '#/hooks/parameter/parameter/useGetParameterDetailByCode'
import { ICandidate } from '#/types/candidate/ICandidate'
import { IParameterDetail } from '#/types/parameter/IParameterDetail'
import { Box, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'

type Props = {
  hookForm: UseFormReturn<ICandidate, any>
}

export default function OtherInfomation({ hookForm }: Props) {
  const { data: source, isLoading: isLoadingSource } = useGetParameterDetailByCode("SOURCE");
  const { data: candidateOwner, isLoading: isLoadingCandidateOwner } = useGetParameterDetailByCode("CANDIDATE_OWNER");
  const { data: candidateStatus, isLoading: isLoadingCandidateStatus } = useGetParameterDetailByCode("CANDIDATE_STATUS");

  const {
    control: controlCandidate,
    register: regCandidate,
    handleSubmit: handleSubmitCandidate,
    formState: { errors: errorsCandidate }
  } = hookForm

  return (
    <>
      <div className='grid grid-cols-2 mx-24 gap-6'>
        <Controller
          control={controlCandidate}
          name="source"
          render={({ field, fieldState }) => {
            return (
              <>
                <FormControl sx={{ minWidth: 100 }} size='small'>
                  <InputLabel>Source</InputLabel>
                  <Select
                    value={String(field.value)}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={Boolean(fieldState.invalid)}
                    label="Source"
                  >
                    {
                      isLoadingSource ? <MenuItem className='flex justify-center'><CircularProgress size={15} /></MenuItem> :
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
                <FormControl sx={{ minWidth: 100 }} size='small'>
                  <InputLabel>Candidate Status</InputLabel>
                  <Select
                    value={String(field.value)}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={Boolean(fieldState.invalid)}
                    label="Candidate Status"
                  >
                    {
                      isLoadingCandidateStatus ? <MenuItem className='flex justify-center'><CircularProgress size={15} /></MenuItem> :
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
                <FormControl sx={{ minWidth: 100 }} size='small'>
                  <InputLabel>Candidate Owner</InputLabel>
                  <Select
                    value={String(field.value)}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={Boolean(fieldState.invalid)}
                    label="Candidate Owner"
                  >
                    {
                      isLoadingCandidateOwner ? <MenuItem className='flex justify-center'><CircularProgress size={15} /></MenuItem> :
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

        <TextField
          {...regCandidate('convenientToInterview')}
          size='small'
          label="Convenient To Interview"
          helperText={errorsCandidate.convenientToInterview?.message}
          error={Boolean(errorsCandidate.convenientToInterview)}
        />

        <TextField
          {...regCandidate('advantages')}
          size='small'
          label="Advantages"
          helperText={errorsCandidate.advantages?.message}
          error={Boolean(errorsCandidate.advantages)}
        />

        <TextField
          {...regCandidate('disadvantages')}
          size='small'
          label="Disadvantages"
          helperText={errorsCandidate.disadvantages?.message}
          error={Boolean(errorsCandidate.disadvantages)}
        />

        <TextField
          {...regCandidate('ableToTravelToWorkInTheArea')}
          size='small'
          label="Able To Travel To Work In The Area"
          helperText={errorsCandidate.ableToTravelToWorkInTheArea?.message}
          error={Boolean(errorsCandidate.ableToTravelToWorkInTheArea)}
        />

        <TextField
          {...regCandidate('ableToTravelToWorkInOtherProvinces')}
          size='small'
          label="Able To Travel To Work In Other Provinces"
          helperText={errorsCandidate.ableToTravelToWorkInOtherProvinces?.message}
          error={Boolean(errorsCandidate.ableToTravelToWorkInOtherProvinces)}
        />
      </div>
    </>
  )
}
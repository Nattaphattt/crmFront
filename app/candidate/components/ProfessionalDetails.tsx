import RTEditor from '#/components/richTextEditor/RTEditor'
import { useGetParameterDetailByCode } from '#/hooks/parameter/parameter/useGetParameterDetailByCode'
import { ICandidate } from '#/types/candidate/ICandidate'
import { IParameterDetail } from '#/types/parameter/IParameterDetail'
import { Autocomplete, Box, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'


type Props = {
  hookForm: UseFormReturn<ICandidate, any>
}

export default function ProfessionalDetails({ hookForm }: Props) {
  const { data: currentJobTitle, isLoading: isLoadingCurrentJobTitle } = useGetParameterDetailByCode("CURRNT_JOB");
  const [textRTE, setTextRTE] = useState<string>('');

  const {
    control: controlCandidate,
    register: regCandidate,
    handleSubmit: handleSubmitCandidate,
    formState: { errors: errorsCandidate }
  } = hookForm

  return (
    <div className='grid grid-cols-2 mx-24 gap-6'>
      <TextField
        {...regCandidate('experienceProfessional')}
        label="Experience"
        size='small'
        helperText={errorsCandidate.experience?.message}
        error={Boolean(errorsCandidate.experience)}
      />

      <Controller
        control={controlCandidate}
        name="currentJobTitle"
        render={({ field, fieldState }) => {
          return (
            <>
              <FormControl sx={{ minWidth: 100 }} size='small'>
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
                      error={!!errorsCandidate.currentJobTitle}
                      helperText={errorsCandidate.currentJobTitle?.message}
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
        size='small'
        label="Current Salary"
        required
        helperText={errorsCandidate.currentSalary?.message}
        error={Boolean(errorsCandidate.currentSalary)}
      />

      <TextField
        {...regCandidate('expectedSalary')}
        size='small'
        label="Expected Salary"
        required
        helperText={errorsCandidate.expectedSalary?.message}
        error={Boolean(errorsCandidate.expectedSalary)}
      />

      <TextField
        {...regCandidate('contractExpectedSalary')}
        size='small'
        label="Expected Salary (Contract)"
        required
        helperText={errorsCandidate.contractExpectedSalary?.message}
        error={Boolean(errorsCandidate.contractExpectedSalary)}
      />

      <TextField
        {...regCandidate('skillSet')}
        size='small'
        label="Skill Set"
        required
        helperText={errorsCandidate.skillSet?.message}
        error={Boolean(errorsCandidate.skillSet)}
      />

      <TextField
        {...regCandidate('totalExperience')}
        size='small'
        label="Total Experience"
        helperText={errorsCandidate.totalExperience?.message}
        error={Boolean(errorsCandidate.totalExperience)}
      />

      <div></div>


      <div className='w-full col-span-2'>
        <Controller
          name={`profileSummary`}
          control={controlCandidate}
          render={({ field }) => (
            <RTEditor
              value={String(field.value)}
              onChange={(value) => field.onChange(value)}
              placeholder='Summary'
            />
          )}
        />
      </div>

    </div>
  )
}
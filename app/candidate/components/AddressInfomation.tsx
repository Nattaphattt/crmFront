import { ICandidate } from '#/types/candidate/ICandidate'
import { TextField } from '@mui/material'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

type Props = {
    hookForm: UseFormReturn<ICandidate, any>
}

export default function AddressInfomation({ hookForm }: Props) {
    const {
        register: regCandidate,
        formState: { errors: errorsCandidate }
    } = hookForm
    
    return (
        <>
            <div className='grid grid-cols-2 mx-24 gap-6'>
                <div className='flex flex-row'>

                    <TextField
                        {...regCandidate('country')}
                        fullWidth
                        label="Country"
                        InputProps={{
                            style: { borderRadius: '0px 5px 5px 0px' },
                        }}
                        size='small'
                        helperText={errorsCandidate.country?.message}
                        error={Boolean(errorsCandidate.country)}
                    />
                </div>

                <TextField
                    {...regCandidate('postalCode', {
                        pattern: {
                            value: /^[0-9]+$/,
                            message: 'Field should contain only numbers',
                        },
                        minLength: {
                            value: 5,
                            message: 'Field should contain 5 digits',
                        },
                        maxLength: {
                            value: 5,
                            message: 'Field should contain 5 digits',
                        },
                    })}
                    label="Postal Code"
                    size='small'
                    helperText={errorsCandidate.postalCode?.message}
                    error={Boolean(errorsCandidate.postalCode)}
                />

                <TextField
                    {...regCandidate('province')}
                    label="Province"
                    size='small'
                    helperText={errorsCandidate.province?.message}
                    error={Boolean(errorsCandidate.province)}
                />

                <TextField
                    {...regCandidate('city')}
                    size='small'
                    label="City"
                    helperText={errorsCandidate.city?.message}
                    error={Boolean(errorsCandidate.city)}
                />

                <TextField
                    label="Address"
                    className="w-full col-span-2"
                    {...regCandidate('candidateAddress')}
                    multiline
                    size='small'
                    rows={2}
                />

            </div>
        </>
    )
}
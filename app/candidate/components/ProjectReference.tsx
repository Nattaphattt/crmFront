import ActionBtn from '#/components/button/ActionBtn';
import { ICandidate } from '#/types/candidate/ICandidate';
import React from 'react'
import { Control, FieldErrors, UseFormRegister, useFieldArray } from 'react-hook-form';
import PlusIcon from '#/public/assets/icon-svg/plus.svg';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { TextField } from '@mui/material';
import Image from 'next/image';


type Props = {
    indexProjectReference: number;
    control: Control<ICandidate, any>;
    register: UseFormRegister<ICandidate>;
    error?: FieldErrors<ICandidate>;

}

export default function ProjectReference({
    indexProjectReference,
    control,
    register,
    error
}: Props) {

    const { fields: fieldProjectReference, append: appendProjectReference, remove: removeProjectReference } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: `experience.${indexProjectReference}.projectReference`, // unique name for your Field Array
    });

    const handleDeleteProjectReference = (index: number) => {
        removeProjectReference(index);
    }

    const handleClickAddProjectReference = () => {
        appendProjectReference({
            projectName: null,
            position: null,
            techStack: null
        });
    }

    return (
        <>
            {fieldProjectReference.map((field, index) => (
                <>
                    <main className="flex h-48 mx-48 flex-col">
                        <p className='mb-4 text-lg'><u>Project Reference</u></p>
                        <div className='flex flex-row justify-center'>
                            {/* Line */}
                            <div className="flex flex-col justify-evenly">
                                <div className="flex h-10 w-10 justify-center items-center rounded-full border-2 p-2">{index + 1}</div>
                                <div className="flex h-full justify-center">
                                    <div className="h-full w-[1px] bg-[#C0C0C0]" />
                                </div>
                                <div className="flex h-10 w-10 justify-center rounded-full border bg-red-50 p-2 hover:bg-red-400 duration-500" onClick={() => handleDeleteProjectReference(index)}>
                                    <DeleteRoundedIcon color='error' />
                                </div>
                            </div>

                            {/* Form */}
                            <div className='w-full mx-4'>
                                <div className='grid grid-cols-1 gap-6'>
                                    <TextField
                                        {...register(`experience.${indexProjectReference}.projectReference.${index}.projectName`)}
                                        size='small'
                                        label="Project Name"
                                        className='col-span-2'
                                        // helperText={error.experience?.[index]?.company?.message ?? ''}
                                        // error={Boolean(error.experience?.[index]?.company)}
                                    />

                                    <TextField
                                        {...register(`experience.${indexProjectReference}.projectReference.${index}.position`)}
                                        size='small'
                                        label="Position"
                                        className='col-span-2'
                                        // helperText={error.experience?.[index]?.company?.message ?? ''}
                                        // error={Boolean(error.experience?.[index]?.company)}
                                    />

                                    <TextField
                                        {...register(`experience.${indexProjectReference}.projectReference.${index}.techStack`)}
                                        size='small'
                                        label="Tech Stack"
                                        className='col-span-2'
                                        // helperText={error.experience?.[index]?.company?.message ?? ''}
                                        // error={Boolean(error.experience?.[index]?.company)}
                                    />
                                </div>
                            </div >
                        </div>
                    </main>
                    {index !== fieldProjectReference.length - 1 && <hr className='my-9 mx-48' />}


                </>
            ))
            }

            <ActionBtn
                className='mt-9'
                title='Add Project Reference'
                icon={<Image src={PlusIcon} alt="Plus Icon" />}
                onClick={handleClickAddProjectReference}
                color='#8286FF'
            />

    
        </>
    )
}
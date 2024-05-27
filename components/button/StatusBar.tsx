import React from 'react'

type Props = {}

export default function StatusBar({ }: Props) {
    return (
        <div className='p-1 bg-gradient-to-r rounded-2xl from-[#B44BFF] to-[#39DCFF]'>
            <div className=' bg-white px-3 rounded-2xl flex justify-center flex-row items-center'>
                <h1 className='text-lg'>Status: </h1>
                <div className="w-4 h-4 rounded-full  mt-1 ml-2 bg-[#C2C2C2]" />
            </div>
        </div>
    )
}
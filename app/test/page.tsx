"use client";

import PageContentLayout from '#/components/layout/PageContentLayout'
import { PathUrls } from '#/constants/pathUrls';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {}

export default function page({ }: Props) {
  const router = useRouter();
  return (
    <>

      <div className="flex justify-center m-4 gap-4">
        <Button onClick={() => router.push(PathUrls.home)} variant="contained" className=" self-center">GO TO HOME PAGE</Button>
        <Button onClick={() => router.push(PathUrls.candidate.root)} variant="contained" className=" self-center">GO TO EXAMPLE CANDIDATE PAGE</Button>
      </div>

      <PageContentLayout>
        <div className=' text-9xl bg-ats-pink'> test page</div>
        <div className=' font-sarabun'>this is sarabun</div>
        <div className=' font-kanit '>this is kanit</div>
      </PageContentLayout>
    </>
  )
}
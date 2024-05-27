'use client';
import { Box } from '@mui/material';
import React from 'react'
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import Link from "next/link";
import { PathUrls as Paths } from '#/constants/pathUrls';

export interface TracksType {
  level: number;
  name: string;
  linkTo: string;
}
export interface MatchUrlType {
  url: string;
  tracks: TracksType[];
}

export default function ApplicantTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const dynamicParams = useParams()

  let pathnameWithoutDynamicParams = pathname
  const dynamicParamsKeys = Object.keys(dynamicParams)
  if (dynamicParamsKeys.length > 0) {
    dynamicParamsKeys.forEach(param => {
      pathnameWithoutDynamicParams = pathnameWithoutDynamicParams.replace(`/${dynamicParams[param]}`, '')
    })
  }

  // console.log("[ApplicantTracking] dynamicParams >>>", dynamicParams)
  // console.log("[ApplicantTracking] pathname >>>", pathname)
  // console.log("[ApplicantTracking] pathnameWithoutDynamicParams >>>", pathnameWithoutDynamicParams)
  // console.log("[ApplicantTracking] searchParams name >>>", searchParams.get('name'))

  const nameParams = searchParams.get('name')

  const pathUrls: MatchUrlType[] = [
    // Candidate
    {
      url: Paths.candidate.root, tracks: [
        { level: 1, name: 'Candidate', linkTo: Paths.candidate.root },
      ]
    },
    {
      url: Paths.candidate.create, tracks: [
        { level: 1, name: 'Candidate', linkTo: Paths.candidate.root },
        { level: 2, name: 'Create', linkTo: Paths.candidate.create },
      ]
    },
    {
      url: Paths.candidate.detail, tracks: [
        { level: 1, name: "Candidate", linkTo: Paths.candidate.root },
        { level: 2, name: nameParams || "Detail Candidate", linkTo: Paths.candidate.detail }
      ]
    },
  ]

  const findMatchPath = pathUrls.find(item => item.url === pathnameWithoutDynamicParams)?.tracks.sort((a, b) => a.level - b.level) || [];

  return (
    <>
      {findMatchPath.length !== 0 && <Box className=" w-auto flex mx-auto max-w-screen-2xl space-y-8 px-8 mb-4">
        <Box className=" px-3.5 lg:px-6 text-xl">
          {"Applicant Tracking"}
          {findMatchPath.map((track, index) => {
            if (index === (findMatchPath.length - 1)) {
              return (
                <span key={track.name + index} className=' text-[#3190FF]'>{' > '} {track.name}</span>
              )
            } else {
              return (
                <Link key={track.name + index} href={track.linkTo}>
                  <span className=' hover:text-ats-blue' >{' > '} {track.name}</span>
                </Link>
              )
            }
          })}
        </Box>
      </Box>}
    </>
  )
}

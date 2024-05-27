"use client"
import { createColumn } from '#/components/table/Table2';
import { Box, Select, MenuItem, FormControl, Paper, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Image from "next/image";
import CandidateIcon from '#/public/assets/images/Candidate.png';
import ConnectionPointTwoIcon from '#/public/assets/icon-svg/connection-point-two.svg';
import DownloadIcon from '#/public/assets/icon-svg/download.svg';
import PlusIcon from '#/public/assets/icon-svg/plus.svg';
import ActionBtn from '#/components/button/ActionBtn';
import { GridColDef } from '@mui/x-data-grid';
import ModalQuickCreateCandidate from './components/ModalQuickCreateCandidate';
import PageContentLayout from '#/components/layout/PageContentLayout';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Table2WithSearch from '#/components/table/Table2WithSearch';
import { ICandidateSearch } from '#/types/candidate/ICandidate';
import { useRouter } from 'next/navigation';
import OptionAction from '#/components/option/OptionAction';
import ItemOptionAction from '#/components/option/ItemOptionAction';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetCandidateBySearch } from '#/hooks/candidate/useSearchCandidate';
import { useGetParameterDetailByCode } from '#/hooks/parameter/parameter/useGetParameterDetailByCode';
import { IParameterDetail } from '#/types/parameter/IParameterDetail';
import dayjs from 'dayjs';
import ModalBox from '#/components/customModal/Modal';
import ModalConfirm from '#/components/customModal/ModalConfirm';
import useDeleteManyIdCandidate from '#/hooks/candidate/useDeleteManyIdCandidate';
import { PathUrls } from '#/constants/pathUrls';
import { IPagination, IResponse, IResponseInterviewDTO } from '#/types/other/IResponse';

const mockData = {
  currentJobTitle: {
    "success": true,
    "message": "Get all parameter detail success",
    "data": [
      {
        "id": 302,
        "code": "CURRNT_JOB_09",
        "name": "Senior Full Stack Developer",
        "description": "Senior Full Stack Developer",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 30,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-22T03:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 294,
        "code": "CURRNT_JOB_01",
        "name": "Programmer",
        "description": "Programmer",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 30,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-22T03:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 295,
        "code": "CURRNT_JOB_02",
        "name": "Web Admin",
        "description": "Web Admin",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 30,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-22T03:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 296,
        "code": "CURRNT_JOB_03",
        "name": "Mobile Developer",
        "description": "Mobile Developer",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 30,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-22T03:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 297,
        "code": "CURRNT_JOB_04",
        "name": "Business System Analyst",
        "description": "Business System Analyst",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 30,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-22T03:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
    ],
    "error": null
  },
  source: {
    "success": true,
    "message": "Get all parameter detail success",
    "data": [
      {
        "id": 37,
        "code": "SOURCE_01",
        "name": "Jobbkk",
        "description": "Jobbkk",
        "variable1": "",
        "variable2": "",
        "variable3": "",
        "variable4": "",
        "variable5": "",
        "variable6": "",
        "variable7": "",
        "variable8": "",
        "variable9": "",
        "flagActive": "Y",
        "parameterId": 10,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-09T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 38,
        "code": "SOURCE_02",
        "name": "Jobthai",
        "description": "Jobthai",
        "variable1": "",
        "variable2": "",
        "variable3": "",
        "variable4": "",
        "variable5": "",
        "variable6": "",
        "variable7": "",
        "variable8": "",
        "variable9": "",
        "flagActive": "Y",
        "parameterId": 10,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-09T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 39,
        "code": "SOURCE_03",
        "name": "Jobsdb",
        "description": "Jobsdb",
        "variable1": "",
        "variable2": "",
        "variable3": "",
        "variable4": "",
        "variable5": "",
        "variable6": "",
        "variable7": "",
        "variable8": "",
        "variable9": "",
        "flagActive": "Y",
        "parameterId": 10,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-09T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 40,
        "code": "SOURCE_04",
        "name": "Facebook",
        "description": "Facebook",
        "variable1": "",
        "variable2": "",
        "variable3": "",
        "variable4": "",
        "variable5": "",
        "variable6": "",
        "variable7": "",
        "variable8": "",
        "variable9": "",
        "flagActive": "Y",
        "parameterId": 10,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-09T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 41,
        "code": "SOURCE_05",
        "name": "Internal Referral",
        "description": "Internal Referral",
        "variable1": "",
        "variable2": "",
        "variable3": "",
        "variable4": "",
        "variable5": "",
        "variable6": "",
        "variable7": "",
        "variable8": "",
        "variable9": "",
        "flagActive": "Y",
        "parameterId": 10,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-09T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 42,
        "code": "SOURCE_06",
        "name": "Convert OS staff",
        "description": "Convert OS staff",
        "variable1": "",
        "variable2": "",
        "variable3": "",
        "variable4": "",
        "variable5": "",
        "variable6": "",
        "variable7": "",
        "variable8": "",
        "variable9": "",
        "flagActive": "Y",
        "parameterId": 10,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-09T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 43,
        "code": "SOURCE_07",
        "name": "Event/Job Fair",
        "description": "Event/Job Fair",
        "variable1": "",
        "variable2": "",
        "variable3": "",
        "variable4": "",
        "variable5": "",
        "variable6": "",
        "variable7": "",
        "variable8": "",
        "variable9": "",
        "flagActive": "Y",
        "parameterId": 10,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-09T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 44,
        "code": "SOURCE_08",
        "name": "Jobs2new",
        "description": "Jobs2new",
        "variable1": "",
        "variable2": "",
        "variable3": "",
        "variable4": "",
        "variable5": "",
        "variable6": "",
        "variable7": "",
        "variable8": "",
        "variable9": "",
        "flagActive": "Y",
        "parameterId": 10,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-09T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 45,
        "code": "SOURCE_09",
        "name": "JobsTopGun",
        "description": "JobsTopGun",
        "variable1": "",
        "variable2": "",
        "variable3": "",
        "variable4": "",
        "variable5": "",
        "variable6": "",
        "variable7": "",
        "variable8": "",
        "variable9": "",
        "flagActive": "Y",
        "parameterId": 10,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-09T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 46,
        "code": "SOURCE_10",
        "name": "Own connection",
        "description": "Own connection",
        "variable1": "",
        "variable2": "",
        "variable3": "",
        "variable4": "",
        "variable5": "",
        "variable6": "",
        "variable7": "",
        "variable8": "",
        "variable9": "",
        "flagActive": "Y",
        "parameterId": 10,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-09T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 47,
        "code": "SOURCE_11",
        "name": "Sosecure",
        "description": "Sosecure",
        "variable1": "",
        "variable2": "",
        "variable3": "",
        "variable4": "",
        "variable5": "",
        "variable6": "",
        "variable7": "",
        "variable8": "",
        "variable9": "",
        "flagActive": "Y",
        "parameterId": 10,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-09T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      }
    ],
    "error": null
  },
  candidateOwner: {
    "success": true,
    "message": "Get all parameter detail success",
    "data": [
      {
        "id": 108,
        "code": "CANDIDATE_OWNER_01",
        "name": "Suwitcha Thuranuch",
        "description": "Suwitcha Thuranuch",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 23,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-20T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 109,
        "code": "CANDIDATE_OWNER_02",
        "name": "Wimol Banpab",
        "description": "Wimol Banpab",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 23,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-20T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 110,
        "code": "CANDIDATE_OWNER_03",
        "name": "Wipada Niranphan",
        "description": "Wipada Niranphan",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 23,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-20T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 111,
        "code": "CANDIDATE_OWNER_04",
        "name": "Orada Khongwicha",
        "description": "Orada Khongwicha",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 23,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-20T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      }
    ],
    "error": null
  },
  candidateStatus: {
    "success": true,
    "message": "Get all parameter detail success",
    "data": [
      {
        "id": 101,
        "code": "CANDIDATE_STATUS_01",
        "name": "New",
        "description": "New",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 22,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-20T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 102,
        "code": "CANDIDATE_STATUS_02",
        "name": "Unqualified",
        "description": "Unqualified",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 22,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-20T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 104,
        "code": "CANDIDATE_STATUS_04",
        "name": "Offered",
        "description": "Offered",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 22,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-20T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 107,
        "code": "CANDIDATE_STATUS_07",
        "name": "Blacklist",
        "description": "Blacklist",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 22,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-20T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 103,
        "code": "CANDIDATE_STATUS_03",
        "name": "In Review",
        "description": "Not Looking for new job",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 22,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-20T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 105,
        "code": "CANDIDATE_STATUS_05",
        "name": "Hired",
        "description": "HiredNot pick up",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 22,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-20T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      },
      {
        "id": 106,
        "code": "CANDIDATE_STATUS_06",
        "name": "Onborad",
        "description": "Got a new job already",
        "variable1": null,
        "variable2": null,
        "variable3": null,
        "variable4": null,
        "variable5": null,
        "variable6": null,
        "variable7": null,
        "variable8": null,
        "variable9": null,
        "flagActive": "Y",
        "parameterId": 22,
        "createdBy": "Tanapumin Boonbutr",
        "createdDate": "2024-04-20T09:00:00.000+00:00",
        "updatedBy": null,
        "updatedDate": null
      }
    ],
    "error": null
  },
  dataCandidate: {
    "success": true,
    "message": "Get Candidate By Search Success",
    "data": {
      "content": [
        {
          "id": 50,
          "candidateCode": "PTCV_000000044_CDD",
          "rating": null,
          "firstName": "นัฐวุฒิeeee",
          "lastName": "รัตนะบูชาeee",
          "currentJobTitle": null,
          "source": null,
          "phoneNumber": "0640607955",
          "email": "nattawut_r@protossgroup.come",
          "updateDate": "2024-05-16T13:36:11.809+07:00",
          "candidateStages": null,
          "createBy": "Nattawut Rattanabucha",
          "createDate": "2024-05-16T13:36:11.809+07:00",
          "candidateOwner": null
        },
        {
          "id": 49,
          "candidateCode": "PTCV_000000043_CDD",
          "rating": null,
          "firstName": "นัฐวุฒิf",
          "lastName": "รัตนะบูชาf",
          "currentJobTitle": "CURRNT_JOB_01",
          "source": "SOURCE_03",
          "phoneNumber": "0640607954",
          "email": "nattawut_r@protossgroup.com",
          "updateDate": "2024-05-15T20:49:14.330+07:00",
          "candidateStages": null,
          "createBy": null,
          "createDate": "2024-05-15T20:49:14.330+07:00",
          "candidateOwner": "CANDIDATE_OWNER_01"
        },
        {
          "id": 48,
          "candidateCode": "PTCV_000000042_CDD",
          "rating": null,
          "firstName": "นัฐวุฒิ",
          "lastName": "รัตนะบูชา",
          "currentJobTitle": "CURRNT_JOB_09",
          "source": null,
          "phoneNumber": "0640607954",
          "email": "nattawut_r@protossgroup.com",
          "updateDate": "2024-05-15T20:45:46.995+07:00",
          "candidateStages": null,
          "createBy": null,
          "createDate": "2024-05-15T20:45:46.995+07:00",
          "candidateOwner": null
        },
        {
          "id": 47,
          "candidateCode": null,
          "rating": null,
          "firstName": "นัฐวุฒิwwwww",
          "lastName": "รัตนะบูชาqwwwwww",
          "currentJobTitle": "CURRNT_JOB_16",
          "source": "SOURCE_03",
          "phoneNumber": "0640607954",
          "email": "nattawut_r@protossgroup.com",
          "updateDate": null,
          "candidateStages": null,
          "createBy": null,
          "createDate": "2024-05-15T20:28:09.116+07:00",
          "candidateOwner": "CANDIDATE_STATUS_02"
        },
        {
          "id": 46,
          "candidateCode": "PTCV_000000040_CDD",
          "rating": null,
          "firstName": "นัฐวุฒิqqq",
          "lastName": "รัตนะบูชาqqq",
          "currentJobTitle": "POSTION_11",
          "source": "SOURCE_03",
          "phoneNumber": "0640607954",
          "email": "nattawut_r@protossgroup.com",
          "updateDate": "2024-05-15T20:25:03.492+07:00",
          "candidateStages": null,
          "createBy": null,
          "createDate": "2024-05-15T20:25:03.492+07:00",
          "candidateOwner": "CANDIDATE_OWNER_02"
        },
        {
          "id": 45,
          "candidateCode": null,
          "rating": null,
          "firstName": "นัฐวุฒิqq",
          "lastName": "รัตนะบูชาqq",
          "currentJobTitle": "CURRNT_JOB_09",
          "source": "SOURCE_03",
          "phoneNumber": "0640607954",
          "email": "nattawut_r@protossgroup.com",
          "updateDate": null,
          "candidateStages": null,
          "createBy": null,
          "createDate": "2024-05-15T20:24:22.968+07:00",
          "candidateOwner": "CANDIDATE_STATUS_02"
        },
        {
          "id": 44,
          "candidateCode": "PTCV_000000038_CDD",
          "rating": "0",
          "firstName": "นัฐวุฒิq",
          "lastName": "รัตนะบูชาq",
          "currentJobTitle": "POSTION_11",
          "source": "SOURCE_03",
          "phoneNumber": "0640607954",
          "email": "nattawut_r@protossgroup.com",
          "updateDate": "2024-05-15T20:22:59.175+07:00",
          "candidateStages": null,
          "createBy": null,
          "createDate": "2024-05-15T20:22:59.175+07:00",
          "candidateOwner": "CANDIDATE_OWNER_02"
        },
        {
          "id": 38,
          "candidateCode": "PTCV_000000026_CDD",
          "rating": "0",
          "firstName": "John1",
          "lastName": "Doe2",
          "currentJobTitle": "CURRNT_JOB_05",
          "source": "SOURCE_02",
          "phoneNumber": "0646468975",
          "email": "john29.doe@email.com",
          "updateDate": "2024-05-13T13:55:05.013+07:00",
          "candidateStages": "NEW",
          "createBy": "John Doe",
          "createDate": "2024-05-13T13:55:05.013+07:00",
          "candidateOwner": "CANDIDATE_OWNER_03"
        },
        {
          "id": 18,
          "candidateCode": null,
          "rating": "3",
          "firstName": "Johneee",
          "lastName": "Doeeee",
          "currentJobTitle": "CURRNT_JOB_05",
          "source": "SOURCE_03",
          "phoneNumber": "0646468920",
          "email": "john2.doe2@email.come",
          "updateDate": null,
          "candidateStages": "NEW",
          "createBy": "John Doe",
          "createDate": "2024-05-10T10:07:49.183+07:00",
          "candidateOwner": "CANDIDATE_STATUS_04"
        },
        {
          "id": 37,
          "candidateCode": "PTCV_000000025_CDD",
          "rating": "0",
          "firstName": "John",
          "lastName": "Doe",
          "currentJobTitle": "CURRNT_JOB_05",
          "source": "SOURCE_04",
          "phoneNumber": "0646468975",
          "email": "john29.doe@email.com",
          "updateDate": "2024-05-07T10:00:00.000+07:00",
          "candidateStages": "NEW",
          "createBy": "John Doe",
          "createDate": "2024-05-10T10:07:49.183+07:00",
          "candidateOwner": "CANDIDATE_OWNER_01"
        }
      ],
      "totalPages": 1,
      "totalElements": 10,
      "last": true,
      "number": 0,
      "first": true
    },
    "error": null
  },
}

export default function candidate() {
  const router = useRouter()

  //Modal
  const [isOpenAlertBox, setIsOpenAlertBox] = useState(false);
  const [textAlertBox, setTextAlertBox] = useState("");
  const [typeAlertBox, setTypeAlertBox] = useState("");
  // AlertConfirm
  const [isOpenAlertConfirm, setIsOpenAlertConfirm] = useState(false);
  const [textAlertConfirm, setTextAlertConfirm] = useState("");

  const [searchFilter, setSearchFilter] = useState<ICandidateSearch>({});
  const [openModalQuickCreate, setOpenModalQuickCreate] = useState<boolean>(false);
  const [candidateType, setCandidateType] = useState<any>(1);
  const [searchType, setSearchType] = useState<string>('candidateCode');
  const [searchText, setSearchText] = useState<string>('');
  const [rows, setRows] = useState<ICandidateSearch[]>([])
  const [isSelectedRows, setisSelectedRows] = useState<boolean>(false)
  const [selectedRows, setSelectedRows] = useState<String[]>([])

  // const { data: currentJobTitle, isLoading: isLoadingCurrentJobTitle } = useGetParameterDetailByCode("CURRNT_JOB");
  // const { data: source, isLoading: isLoadingSource } = useGetParameterDetailByCode("SOURCE");
  // const { data: candidateOwner, isLoading: isLoadingCandidateOwner } = useGetParameterDetailByCode("CANDIDATE_OWNER");
  // const { data: candidateStatus, isLoading: isLoadingCandidateStatus } = useGetParameterDetailByCode("CANDIDATE_STATUS");
  // const { data: dataCandidate, isLoading: isLoadingCandidate } = useGetCandidateBySearch(searchFilter);
  // const { mutateAsync: deleteManyId, isLoading: isLoadingDelete } = useDeleteManyIdCandidate();

  const currentJobTitle = mockData.currentJobTitle as IResponse | undefined
  const source = mockData.source as IResponse | undefined
  const candidateOwner = mockData.candidateOwner as IResponse | undefined
  const candidateStatus = mockData.candidateStatus as IResponse | undefined
  const dataCandidate = mockData.dataCandidate as IResponseInterviewDTO<IPagination<ICandidateSearch>> | undefined
  const deleteManyId = (ids: String[]): IResponse => { return {} as IResponse }
  const isLoadingCurrentJobTitle = false
  const isLoadingSource = false
  const isLoadingCandidateOwner = false
  const isLoadingCandidateStatus = false
  const isLoadingCandidate = false
  const isLoadingDelete = false


  const mockCandidateTypes = [
    { id: 1, value: 1, name: "All Candidate" },
    { id: 2, value: 2, name: "My Candidate" },
  ]

  const columns: GridColDef<any>[] = [
    createColumn('rating', 'Rating', 80),
    createColumn('candidateCode', 'Candidate Id', 180,),
    createColumn('candidateName', 'Candidate Name', 230, {
      renderCell: (params) => (
        <h3 className='text-blue-500 hover:underline hover:cursor-pointer' onClick={() => handleView(params.value, Number(params.id))}>{params.value}</h3>
      )
    }),
    createColumn('currentJobTitle', 'Current Job Title', 190, {
      renderCell: (params) => (
        <>
          {
            isLoadingCurrentJobTitle
              ? 'Loading...'
              : params.value == null || params.value == ""
                ? "-"
                : currentJobTitle?.data?.find((item: IParameterDetail) => item.code === params.value)?.name
          }
        </>
      )
    }),
    createColumn('source', 'Source', 130, {
      renderCell: (params) => (
        <>
          {
            isLoadingSource
              ? 'Loading...'
              : params.value == null || params.value == ""
                ? "-"
                : source?.data?.find((item: IParameterDetail) => item.code === params.value)?.name
          }
        </>
      )
    }),
    createColumn('phoneNumber', 'Mobile', 110),
    createColumn('email', 'Email', 240),
    createColumn('updateDate', 'Modify Time', 140),
    createColumn('candidateStage', 'Candidate Stage', 140),
    createColumn('createBy', 'Create By', 180),
    createColumn('createDate', 'Create date', 140),
    createColumn('candidateOwner', 'Candidate owner', 180, {
      renderCell: (params) => (
        <>
          {
            isLoadingCandidateOwner
              ? 'Loading...'
              : params.value == null || params.value == ""
                ? "-"
                : candidateOwner?.data?.find((item: IParameterDetail) => item.code === params.value)?.name
          }
        </>
      )
    }),
    createColumn('documentStatus', 'Document status', 160)
  ];

  useEffect(() => {
    if (dataCandidate) {
      setRows(dataCandidate.data?.content.map((item) => ({
        id: item.id,
        rating: item.rating,
        candidateCode: item.candidateCode,
        candidateName: `${item.firstName} ${item.lastName}`,
        currentJobTitle: item.currentJobTitle,
        source: item.source,
        phoneNumber: item.phoneNumber,
        email: item.email,
        updateDate: dayjs(item.updateDate).format('DD/MM/YYYY HH:mm'),
        candidateStage: item.candidateStages,
        createBy: item.createBy,
        createDate: dayjs(item.createDate).format('DD/MM/YYYY HH:mm'),
        candidateOwner: item.candidateOwner,
        documentStatus: "Quick Create"
      })) || [])
    }
  }, [dataCandidate])

  useEffect(() => {
    if (searchText) {
      setSearchFilter({ [searchType]: searchText.toLowerCase() })
    } else {
      setSearchFilter({ [searchType]: null })
    }
  }, [searchType, searchText])

  const handleClickAdd = () => {
    setOpenModalQuickCreate(true)
  }

  const handleSearchChange = (value: string) => {
    console.log(value);
    console.log(searchFilter);
    setSearchText(value);
  };

  const handleViewRow = (data: ICandidateSearch) => {
    router.push(`/candidate/detail/${data.id}?name=${data.candidateName}`)
  }

  const handleView = (name: String, id: number) => {
    router.push(`/candidate/detail/${id}?name=${name}`)
  }

  const handleSelectRows = (rows: String[]) => {
    console.log(rows)
    setSelectedRows(rows)
    if (rows.length > 0) {
      setisSelectedRows(true)
    } else {
      setisSelectedRows(false)
    }
  }

  type CandidateStage = {
    id: number | null;
    value: string | null;
    name: string | null;
    count: number | null;
  }

  const [candidateStage, setCandidateStage] = useState<CandidateStage | null>(null);
  const [candidateStages, setCandidateStages] = useState<CandidateStage[]>([]);

  useEffect(() => {
    if (isLoadingCandidateStatus === false && candidateStatus?.data) {
      setCandidateStages([
        ...candidateStatus?.data.map(
          (item: IParameterDetail) => ({
            id: item.id,
            value: item.code,
            name: item.name,
            count: 0
          })
        )
      ])
    }
  }, [candidateStatus, isLoadingCandidateStatus])


  const handleClickStage = (stage: CandidateStage) => {
    setCandidateStage((prev: CandidateStage | null) => prev === stage ? null : stage)
  }

  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        setIsOpenAlertConfirm(false);
        const res = await deleteManyId(selectedRows)
        if (res.success == true) {
          setTimeout(() => {
            setTextAlertBox(res.message);
            setTypeAlertBox('success');
            setIsOpenAlertBox(true);
            setTimeout(() => {
              setIsOpenAlertBox(false);
            }, 1300)
          }, 1000)
        } else {
          setTimeout(() => {
            setTextAlertBox(res.message);
            setTypeAlertBox('error');
            setIsOpenAlertBox(true);
            setTimeout(() => {
              setIsOpenAlertBox(false);
            }, 1300)
          }, 1000)
        }
      } catch (err: any) {
        setIsOpenAlertBox(true);
        setTextAlertBox(err);
        setTypeAlertBox('error');
        setTimeout(() => {
          setIsOpenAlertBox(false);
        }, 1000);
      }
    }
  }

  const handleOpenAlertDelete = () => {
    setIsOpenAlertConfirm(true);
    setTextAlertConfirm("Are you sure you want to delete?");
  };


  return (
    <>

      <div className="flex justify-center m-4 gap-4">
        <Button onClick={() => router.push(PathUrls.home)} variant="contained" className=" self-center">GO TO HOME PAGE</Button>
        <Button onClick={() => router.push(PathUrls.test.root)} variant="contained" className=" self-center">GO TO TEST PAGE</Button>
      </div>

      <PageContentLayout
        title='Candidate'
        icon={<Image src={CandidateIcon} alt="edit table column" className='w-8 h-8' />}
        actions={(
          <>
            <ActionBtn
              title='Associate'
              icon={<Image src={ConnectionPointTwoIcon} alt="Connection Point Two Icon" />}
              // onClick={handleClickAdd}
              color='#8286FF'
              disabled={!isSelectedRows}
            />
            <ActionBtn
              title='Export CV'
              icon={<Image src={DownloadIcon} alt="Download Icon" />}
              // onClick={handleClickAdd}
              color='#8286FF'
              disabled={!isSelectedRows}
            />

            <ActionBtn
              title='Create Candidate'
              icon={<Image src={PlusIcon} alt="Plus Icon" />}
              onClick={handleClickAdd}
              color='#8286FF'
            />
          </>
        )
        }
      >

        <Table2WithSearch<ICandidateSearch>
          searchType={searchType}
          searchText={searchText}
          onSearchTypeChange={(newSearchType) => setSearchType(newSearchType)}
          onSearchTextChange={(newSearchText) => handleSearchChange(newSearchText)}
          onSearchTextClear={() => setSearchText('')}
          columns={columns}
          rows={rows}
          loading={isLoadingCandidate}
          isMultiSelectRow
          onSelectRows={(rowsSelected: ICandidateSearch[]) => handleSelectRows(rowsSelected.map((item) => item.id!!.toString()))}
          onViewRow={(rowSelected: ICandidateSearch) => handleViewRow(rowSelected)}
          requiredColumn={["candidateCode"]}
          slotAboveTable={(
            <>
              <Box className="mb-2 font-bold text-2xl">Candidate Stages</Box>
              <Paper elevation={2} className=' mb-4'>
                <Box className=' w-full h-20 flex justify-between'>
                  {candidateStages ? candidateStages.map((item, index) => (
                    <Box
                      key={index}
                      className={`text-center font-medium content-center cursor-pointer hover:bg-gray-100 border-t-4 
                      ${item.value === candidateStage?.value
                          ? 'border-t-violet-500 text-[#8B5DF5]'
                          : 'border-t-gray-300'}`}
                      sx={{ width: `${(100 / candidateStages.length).toFixed(2)}%` }}
                      onClick={() => handleClickStage(item)}
                    >
                      <p>{item.count}</p>
                      <p>{item.name}</p>
                    </Box>
                  )) : null}
                </Box>
              </Paper>
            </>
          )}

          slotOppositeSearch={(
            <>
              <Box className='flex justify-between gap-4'>
                <FormControl fullWidth className='' variant="outlined" size='small'>
                  <Select
                    className='w-48'
                    value={candidateType}
                    // onChange={(e) => setCandidateType(e.target.value as CandidateType || null)}
                    onChange={(e) => setCandidateType(e.target.value || null)}
                  >
                    {mockCandidateTypes?.map((item, index) => (
                      <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </>
          )}
        />
        <ModalQuickCreateCandidate isOpen={openModalQuickCreate} setIsOpen={setOpenModalQuickCreate} />
      </PageContentLayout >

      <ModalBox setIsOpen={setIsOpenAlertBox} isOpen={isOpenAlertBox} text={textAlertBox} type={typeAlertBox} size="small" />
      <ModalConfirm isOpen={isOpenAlertConfirm} setIsOpen={setIsOpenAlertConfirm} title={textAlertConfirm} onConfirm={handleDelete} size="large" />
    </>
  )
}
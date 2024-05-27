"use client";
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ICandidate } from '#/types/candidate/ICandidate';
import { SubmitHandler, useForm } from 'react-hook-form';
import ProfessionalDetails from '../components/ProfessionalDetails';
import AttactmentCandidate from '../components/AttactmentCandidate';
import PageContentLayout from '#/components/layout/PageContentLayout'
import ExperienceDetails from '../components/ExperienceDetails';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddressInfomation from '../components/AddressInfomation';
import EducationDetails from '../components/EducationDetails';
import BasicInfomation from '../components/BasicInfomation';
import OtherInfomation from '../components/OtherInfomation';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ActionBtn from '#/components/button/ActionBtn';
import TabCards from '#/components/tab/TabCards';
import Image from 'next/image';

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import VerticalAlignBottomRoundedIcon from '@mui/icons-material/VerticalAlignBottomRounded';
import { useParams, useRouter } from 'next/navigation';
import AvatarUserBlue from '#/public/assets/avatar_user_blue.png';
import { useGetByCandidateId } from '#/hooks/candidate/useGetByCandidateId';
import useUpdateCandidate from '#/hooks/candidate/useUpdateCandidate';
import ModalBox from '#/components/customModal/Modal';
import { IResponseInterviewDTO } from '#/types/other/IResponse';
import dayjs from 'dayjs';

const mockData = {
  candidateId: {
    "success": true,
    "message": "Get candidate success",
    "data": {
      "candidateId": 50,
      "candidateCode": "PTCV_000000044_CDD",
      "nameTitle": "NAME_TITLE_EN_01",
      "firstName": "นัฐวุฒิeeee",
      "lastName": "รัตนะบูชาeee",
      "dateOfBirth": null,
      "fullNameTh": null,
      "nickName": null,
      "age": null,
      "email": "nattawut_r@protossgroup.come",
      "phoneNumber": "0640607955",
      "lineId": null,
      "englishSkill": null,
      "gender": null,
      "notebook": null,
      "startWorking": null,
      "vehicle": null,
      "currency": null,
      "moveHousing": null,
      "country": null,
      "postalCode": null,
      "province": null,
      "city": null,
      "candidateAddress": null,
      "profileUpload": null,
      "rating": null,
      "experienceProfessional": "",
      "currentJobTitle": null,
      "currentSalary": "",
      "expectedSalary": "",
      "contractExpectedSalary": null,
      "skillSet": null,
      "totalExperience": null,
      "profileSummary": null,
      "source": null,
      "candidateStatus": null,
      "candidateOwner": null,
      "candidateStages": null,
      "convenientToInterview": null,
      "advantages": null,
      "disadvantages": null,
      "ableToTravelToWorkInTheArea": null,
      "ableToTravelToWorkInOtherProvinces": null,
      "education": [],
      "experience": [],
      "attachments": [],
      "createDate": dayjs("2024-05-16T13:36:11.809+07:00"),
      "createBy": "Nattawut Rattanabucha",
      "updateDate": dayjs("2024-05-16T13:36:11.809+07:00"),
      "updateBy": "Nattawut Rattanabucha",
      "remarkRating": null
    } as ICandidate,
    "error": null
  }
}

type Props = {
  title: string;
}

export default function Detail({ title }: Props) {
  const router = useRouter()
  const { id } = useParams()

  // const { data: candidateId, isLoading } = useGetByCandidateId(Number(id))
  // const { mutateAsync: update, isLoading: isLoadingUpdate } = useUpdateCandidate()

  const candidateId = mockData.candidateId as IResponseInterviewDTO<ICandidate> | undefined
  const update = async (data: ICandidate) => { return {} as IResponseInterviewDTO<null> }
  const isLoading = false
  const isLoadingUpdate = false

  const candidateHookForm = useForm<ICandidate>({
    defaultValues: {
      education: [{
        university: undefined,
        degree: undefined,
        department: undefined,
        major: undefined,
        durationFrom: undefined,
        durationTo: undefined,
        gpa: undefined,
        currentPersuing: false
      }],
      experience: [{
        position: undefined,
        company: undefined,
        summary: undefined,
        workDurationFrom: undefined,
        workDurationTo: undefined,
        workDurationYear: undefined,
        salary: undefined,
        currentlyWorkHere: undefined,
        projectReference: undefined,
      }],
      attachments: [{
        type: undefined,
        fileName: undefined,
        file: undefined,
        url: undefined
      }],
      dateOfBirth: undefined,
    }
  })

  const {
    register: regCandidate,
    handleSubmit: handleSubmitCandidate,
    formState: { errors: errorsCandidate },
    control: controlCandidate,
    setValue: setValueCandidate,
  } = candidateHookForm

  const [currentTab, setTab] = useState(0);
  const [dataCandidate, setDataCandidate] = useState<ICandidate | null>(null);

  //Modal
  const [isOpenAlertBox, setIsOpenAlertBox] = useState(false);
  const [textAlertBox, setTextAlertBox] = useState("");
  const [typeAlertBox, setTypeAlertBox] = useState("");

  const handleSubmit: SubmitHandler<ICandidate> = (data) => {
    data.candidateId = Number(id)
    update(data)
      .then((res) => {
        setIsOpenAlertBox(true)
        setTextAlertBox(res.message)
        setTypeAlertBox(res.success ? 'success' : 'error')
        setTimeout(() => { setIsOpenAlertBox(false) }, 2000)
      })
      .catch((err) => {
        setTextAlertBox('Update Failed');
        setTypeAlertBox('error');
        setIsOpenAlertBox(true);
        setTimeout(() => {
          setIsOpenAlertBox(false);
        }, 1300)
      })
  }

  useEffect(() => {
    // Basic Infomation
    setDataCandidate(candidateId?.data!!)
    setValueCandidate('nameTitle', dataCandidate?.nameTitle!!);
    setValueCandidate('firstName', dataCandidate?.firstName!!);
    setValueCandidate('lastName', dataCandidate?.lastName!!);
    setValueCandidate('fullNameTh', dataCandidate?.fullNameTh!!);
    setValueCandidate('nickName', dataCandidate?.nickName!!);
    setValueCandidate('dateOfBirth', dataCandidate?.dateOfBirth!!);
    setValueCandidate('age', dataCandidate?.age!!);
    setValueCandidate('email', dataCandidate?.email!!);
    setValueCandidate('phoneNumber', dataCandidate?.phoneNumber!!);
    setValueCandidate('lineId', dataCandidate?.lineId!!);
    setValueCandidate('englishSkill', dataCandidate?.englishSkill!!);
    setValueCandidate('gender', dataCandidate?.gender!!);
    setValueCandidate('notebook', dataCandidate?.notebook!!);
    setValueCandidate('startWorking', dataCandidate?.startWorking!!);
    setValueCandidate('vehicle', dataCandidate?.vehicle!!);
    setValueCandidate('moveHousing', dataCandidate?.moveHousing!!);
    setValueCandidate('currency', dataCandidate?.currency!!);
    // Address Infomation
    setValueCandidate('country', dataCandidate?.country!!);
    setValueCandidate('postalCode', dataCandidate?.postalCode!!);
    setValueCandidate('province', dataCandidate?.province!!);
    setValueCandidate('city', dataCandidate?.city!!);
    setValueCandidate('candidateAddress', dataCandidate?.candidateAddress!!);
    // Education Details
    setValueCandidate('education', dataCandidate?.education!!);
    // Experience Details
    setValueCandidate('experience', dataCandidate?.experience!!);
    // Professional Details
    setValueCandidate('experienceProfessional', dataCandidate?.experienceProfessional!!);
    setValueCandidate('currentJobTitle', dataCandidate?.currentJobTitle!!);
    setValueCandidate('currentSalary', dataCandidate?.currentSalary!!);
    setValueCandidate('expectedSalary', dataCandidate?.expectedSalary!!);
    setValueCandidate('expectedSalary', dataCandidate?.expectedSalary!!);
    setValueCandidate('skillSet', dataCandidate?.skillSet!!);
    setValueCandidate('totalExperience', dataCandidate?.totalExperience!!);
    setValueCandidate('profileSummary', dataCandidate?.profileSummary!!);
    // Other Infomation
    setValueCandidate('source', dataCandidate?.source!!);
    setValueCandidate('candidateStatus', dataCandidate?.candidateStatus!!);
    setValueCandidate('candidateOwner', dataCandidate?.candidateOwner!!);
    setValueCandidate('comment', dataCandidate?.comment!!);
    // Attachment
    setValueCandidate('attachments', dataCandidate?.attachments!!);
  }, [candidateId, dataCandidate])


  return (
    <>
      <form onSubmit={handleSubmitCandidate(handleSubmit)}>
        <PageContentLayout
          title={title}
          actions={(
            <>
              <ActionBtn
                title='Cancel'
                icon={<CloseIcon />}
                onClick={() => { router.push('/candidate') }}
                color='#FF7E7E'
                style={{ width: '110px' }}
              />
              <ActionBtn
                title='Save'
                icon={<CheckIcon />}
                type='submit'
                color='#8EDF79'
                className='bg-white hover:bg-[#8EDF79] duration-500 rounded-lg'
                style={{ width: '110px' }}
              />
              <ActionBtn
                title='Save and Associate'
                icon={<CheckIcon />}
                color='#9796F0'
              />
              <ActionBtn
                title='Export CV'
                icon={<VerticalAlignBottomRoundedIcon />}
                color='#9796F0'
              />
            </>
          )}
        >

          <Box className="flex justify-center px-9 gap-7">
            <Box className='space-y-4'>
              <div className='w-[224px] h-[202px] rounded-[10px] bg-[#E8E8FA] flex justify-center items-end'>
                <Image src={AvatarUserBlue} width={153} height={153} alt="AvatarUserBlue" />
              </div>
              <ActionBtn
                title='Add Image'
                color='#9796F0'
                icon={<AddRoundedIcon />}
                style={{ width: '100%' }}
                type='button'
              />
              <ActionBtn
                title='Delete Image'
                color='#FF7E7E'
                icon={<DeleteRoundedIcon />}
                style={{ width: '100%' }}
                type='button'
              />
            </Box>

            <Box className=" w-full">
              <TabCards
                currentTab={currentTab}
                setTab={(newTab) => setTab(newTab)}
                tabs={[
                  {
                    name: "Basic Information",
                    component: <BasicInfomation hookForm={candidateHookForm} />,
                  },
                  {
                    name: "Address Information",
                    component: <AddressInfomation hookForm={candidateHookForm} />,
                  },
                  {
                    name: "Education Details",
                    component: <EducationDetails hookForm={candidateHookForm} />,
                  },
                  {
                    name: "Experience Details",
                    component: <ExperienceDetails hookForm={candidateHookForm} />,
                  },
                  {
                    name: "Professional Details",
                    component: <ProfessionalDetails hookForm={candidateHookForm} />,
                  },
                  {
                    name: "Other Information",
                    component: <OtherInfomation hookForm={candidateHookForm} />,
                  },
                  {
                    name: "Attachment",
                    component: <AttactmentCandidate hookForm={candidateHookForm} />,
                  },
                ]} />
            </Box>
          </Box>
        </PageContentLayout>
      </form>

      <ModalBox setIsOpen={setIsOpenAlertBox} isOpen={isOpenAlertBox} text={textAlertBox} type={typeAlertBox} size="small" />
    </>
  )
}
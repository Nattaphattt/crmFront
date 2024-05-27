import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

type Props = {}

export default function EditDetailBtn({ }: Props) {
  return (
    <>
      <button className='duration-500 hover:bg-[#E3E3E3] w-10 h-10 mr-2 text-[#9D50FF] rounded-full '>
        <CreateRoundedIcon className='ml-1' />
      </button>
    </>
  )
}
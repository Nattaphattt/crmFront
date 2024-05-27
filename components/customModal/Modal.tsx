import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { Typography } from '@mui/material';

type Props = {
    text: string;
    desc?: string;
    type: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    size?: 'small' | 'medium' | 'large';
}

export default function ModalBox({ text, desc, type, isOpen, setIsOpen, size }: Props) {
    const closeModal = () => setIsOpen(false)

    let width;
    let height;
    switch (size) {
        case 'small':
            width = '450px'; 
            height = '210px';
            break;
        case 'medium':
            width = '350px';
            height = '350px';
            break;
        case 'large':
            width = '450px'; 
            height = '450px';
            break;
        default:
            width = '350px';
            height = '350px';
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-75"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-75"
                >
                    <div className="fixed inset-0 flex items-center justify-center">
                    <Dialog.Panel className={`size transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all`} style={{ width: width, height: height }}>
                    {/* <Dialog.Panel className={`w-${width}/12 h-${height}/12 max-w-full h-full transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all`}> */}
                    {/* <Dialog.Panel className={`w-full max-w-${width} h-${height} transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all`}> */}
                           <div className="mt-2 flex items-center justify-center">
                                {type === 'success' && <CheckCircleOutlineRoundedIcon sx={{ fontSize: "100px", color: '#00cc88' }} />}
                                {type === 'error' && <HighlightOffRoundedIcon sx={{ fontSize: "100px", color: '#ff0055' }} />}
                                {type === 'warning' && <ErrorOutlineRoundedIcon sx={{ fontSize: "100px", color: '#ffaa00' }} />}
                                {type === 'info' && <HelpOutlineRoundedIcon sx={{ fontSize: "100px", color: '#00aaff' }} />}
                            </div>
                            <div className="text-center text-gray-500 break-words px-10">
                                <Typography variant="titleModal">
                                    {text}
                                </Typography>
                            </div>
                            <div className="text-gray-400">
                                <Typography variant="descModal">{desc}</Typography>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}

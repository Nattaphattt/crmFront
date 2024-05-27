import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ActionBtn from '../button/ActionBtn';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';



type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm: () => void;
    description?: string;
    title: string;
    // width?: string;
    // height?: string;
    size: string;
}

export default function ModalConfirm({ isOpen, title, description, setIsOpen, onConfirm, size}: Props) {
    const closeModal = () => setIsOpen(false);
    let width;
    let height;
    switch (size) {
        case 'small':
            width = '150px';
            height = '150px';
            break;
        case 'medium':
            width = '250px'; 
            height = '250px'; 
            break;
        case 'large':
            width = '450px';
            height = '320px';
            break;
        default:
            width = '250px';
            height = '250px';
    }
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            {/* <Dialog.Panel className={`w-full max-w-${width} h-${height} transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all`}> */}
                            {/* <Dialog.Panel className={`size transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all`}> */}
                            <Dialog.Panel className={`size transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all`} style={{ width: width, height: height }}>
                                <div className="mt-2 flex items-center justify-center">
                                    <ErrorOutlineRoundedIcon sx={{ fontSize: "150px", color: '#ffaa00' }} />
                                </div>
                                <div className="text-2xl text-center text-gray-800 break-words px-10">
                                    {title}
                                </div>
                                <div className="text-md text-center text-gray-500 break-words px-10">
                                    {description}
                                </div>
                                <div className="mt-4 flex items-center justify-evenly">

                                    <ActionBtn
                                        icon={<ClearRoundedIcon />}
                                        title='Cancel'
                                        onClick={() => setIsOpen(false)}
                                        color='#8E919D'
                                        style={{ width: '6rem', paddingLeft: '20px', paddingRight: '20px' }}
                                    />

                                    <ActionBtn
                                        icon={<CheckOutlinedIcon />}
                                        title="Confirm"
                                        onClick={onConfirm}
                                        color="#8286FF"
                                        style={{ width: '6rem', paddingLeft: '20px', paddingRight: '20px' }}
                                    />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

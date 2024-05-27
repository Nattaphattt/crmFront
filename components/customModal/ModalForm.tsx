import { Dialog, Transition } from '@headlessui/react'
// import { Fragment } from 'react'
import { Fragment, useEffect, useRef, useState } from 'react';

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
    // width?: string;
    // height?: string;
    size?: 'supersmall'| 'small' | 'medium' | 'large';
    style?: React.CSSProperties;
}

// export default function ModalForm({ isOpen, setIsOpen, children, width, height, size, style }: Props) {
export default function ModalForm({ isOpen, setIsOpen, children, size , style }: Props) {
    const [contentHeight, setContentHeight] = useState<number | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        if (contentRef.current) {
          const height = contentRef.current.clientHeight;
          setContentHeight(height);
        }
      }, [children, isOpen]);
      
    let width;
    let height;
    let paddingY;

   // let width = '800px';
    // let height = '800px'; 
    switch (size) {

        case 'supersmall':
            width = '250px' ;
            height = '300px' ;
            break;
        case 'small':
            width = '650px';
            height = '525px';
            paddingY = '8';
            break;
        case 'medium':
            width = '660px';   
            height = '540px';
            paddingY = '8';
            break;
        case 'large':
            width = '800px';
            height = '800px';
            paddingY = '8'; 
            break;
        default:
            width = '650px';
            height = '650px';
            paddingY = '8';
            break;

            
    }
    const errorHeight = '525px'; // ความสูงเพิ่มเติมเมื่อมีข้อความข้อผิดพลาด
    


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

                <div className="fixed inset-0">
                    <div className="flex min-h-full items-center justify-center p-4 text-center md:mx-24">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                                {/* <Dialog.Panel style={{ minWidth, minHeight, ...(style?.overflowY === 'auto' && { overflowY: 'auto' }), ...style }} className="relative z-50 bg-white rounded-lg p-6 shadow-xl transform transition-all"> */}

                            {/* <Dialog.Panel style={{ width, height, ...(style?.overflowY === 'auto' && { overflowY: 'auto' }), ...style }} className="relative z-50 bg-white rounded-lg p-6 shadow-xl transform transition-all"> */}
                            {/* <Dialog.Panel style={{ width: width, height: height, overflowY: 'auto', ...style  }}  className="w-full transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all"> */}
                            {/* <Dialog.Panel style={{ width, maxHeight: height, ...style }}  className="w-full transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all"> */}
                                {/* {children} */}
                            {/* </Dialog.Panel> */}
                            <Dialog.Panel style={{width,height: isOpen ? errorHeight : height, ...(style?.overflowY === 'auto' && { overflowY: 'auto' }), ...style }} className={`relative z-50 bg-white rounded-lg p-6 shadow-xl transform transition-all py-${paddingY}`}>
                            {children}
                        </Dialog.Panel>

                                {/* <div className="relative z-50 bg-white rounded-lg shadow-xl" style={{ width, height }}>
                                    <div ref={contentRef} className="p-6 overflow-y-auto max-h-[70vh]">
                                        {children}
                                    </div>
                                </div> */}
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

//     return (
//         <Transition appear show={isOpen} as={Fragment}>
//             <Dialog
//                 as="div"
//                 className="fixed inset-0 z-50 overflow-y-auto"
//                 onClose={closeModal}
//             >
//                 <div className="flex items-center justify-center min-h-screen">
//                     <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0"
//                         enterTo="opacity-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                     >
//                         <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
//                     </Transition.Child>

//                     <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0 scale-95"
//                         enterTo="opacity-100 scale-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100 scale-100"
//                         leaveTo="opacity-0 scale-95"
//                     >
//                         <div className="relative z-50">
//                             <div className="bg-white rounded-lg p-6 shadow-xl" style={{ width, height, ...style }}>
//                                 <div className=" max-h-full">{children}</div>
//                             </div>
//                         </div>
//                     </Transition.Child>
//                 </div>
//             </Dialog>
//         </Transition>
//     );
// }

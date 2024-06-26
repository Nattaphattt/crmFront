import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteIcon from "@mui/icons-material/Delete";
import ItemOptionAction from './ItemOptionAction';

type Props = {
    children?: React.ReactNode
    itemOption?: React.ReactNode
}

export default function OptionAction({ children, itemOption }: Props) {
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button>
                        {children}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            {itemOption}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
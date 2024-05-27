import { Menu } from '@headlessui/react'
import React from 'react'

type Props = {
    children?: React.ReactNode
    hoverColor?: string
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function ItemOptionAction({
    children,
    hoverColor = "#8286FF",
    onClick
}: Props) {
    return (
        <Menu.Item >
            <div onClick={onClick} className={`hover:bg-[${hoverColor}] bg-white hover:text-white text-gray-500 group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                {children}
            </div>
        </Menu.Item >
    )
}
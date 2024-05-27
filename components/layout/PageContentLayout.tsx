import { Box, Divider } from '@mui/material';
import Image from "next/image";
import React from 'react'
import ActionBtn from '../button/ActionBtn';

export default function PageContentLayout({
  children,
  title,
  icon,
  actions
}: {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-8">
        {(title || actions) && <Box className="flex justify-between px-3.5 pb-3.5 lg:px-6 lg:pb-6 pt-0">
          <Box className="flex gap-4 items-center">
            {icon && <>{icon}</>}
            <Box className=" font-light text-4xl">
              {title && <>{title}</>}
            </Box>
          </Box>
          <Box className="flex gap-4 items-center flex-wrap justify-end">
            {actions && <>{actions}</>}
          </Box>
        </Box>}
        <div className="rounded-lg bg-white p-3.5 lg:p-6">
          {children}
        </div>
      </div>
    </>
  )
}

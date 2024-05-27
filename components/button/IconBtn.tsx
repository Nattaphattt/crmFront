import React from 'react';

type IconBtnProps = {
    icon?: React.ReactNode;
    onClick?: () => void;
    color?: string;
    type?: 'button' | 'submit' | 'reset';
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    style?: React.CSSProperties;
};

function IconBtn({ icon, onClick, color, type, onChange,style }: IconBtnProps) {
    const iconWithColor = React.cloneElement(icon as React.ReactElement, { fill: color });

    return (
        <div onClick={onClick} style={style} className="flex flex-row justify-end space-x-3 items-center ml-2">
            <button type={type} style={{ color: color ?? '#8286FF', borderColor: color ?? '#8286FF' }} className='duration-500 hover:bg-[#E3E3E3] w-10 h-10 mr-2  rounded-full '>
                {iconWithColor}
            </button>
        </div>
    );
}

export default IconBtn;
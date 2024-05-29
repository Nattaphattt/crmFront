'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { ActionFunction } from 'react-router-dom';

type ButtonProps = {
    title: string;
    options: string[];
    // onItemClick: () => void
  };
   

export default function ActionButton(props: ButtonProps) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${props.options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <div className = "flex justify-center items-center w-[100%]">
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        className="w-[160px] h-10 "
        onClick={handleToggle}
      >
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          className="bg-gray-300"
        >
          <ArrowDropDownIcon />
        </Button>
        <Button className="w-[100%] bg-white text-gray-300" onClick={handleClick} >{props.title}</Button>
        
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className='w-[160px]'
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" className="center items-center flex items-center justify-center" autoFocusItem 
                // onClick = {props.onItemClick}
                >
                  
                  {props.options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                      className=' center align-center h-6'
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
/*
            "accountId" to rs.getString("accountId"),
            "leadsId" to rs.getString("leadsId"),
            "attachment_id" to rs.getString("attachment_id"),
            "company_name" to rs.getString("company_name"),
            "leadsOwner" to rs.getString("leadsOwner"),
            "industry" to rs.getString("industry"),
            "website" to rs.getString("website"),
            "skypeId" to rs.getString("skypeId"),
            "twitter" to rs.getString("twitter"),
            "annualRevenue" to rs.getString("annualRevenue"),

            "noEmployees" to rs.getString("noEmployees"),
            "followUpFlag" to rs.getString("followUpFlag"),
            "followUpDate" to rs.getString("followUpDate"),
            "followUpNote" to rs.getString("followUpNote"),
            "favoriteFlag" to rs.getString("favoriteFlag"),
            "country" to rs.getString("country"),
            "postal_code" to rs.getString("postal_code"),
            "province" to rs.getString("province"),
            "city" to rs.getString("city"),
            "address" to rs.getString("address"),
            "note" to rs.getString("note"),
            "taxId" to rs.getString("taxId"),

            "billingTel" to rs.getString("billingTel"),
            "billingContact" to rs.getString("billingContact"),
            "billingMail" to rs.getString("billingMail"),
            "billingCountry" to rs.getString("billingCountry"),
            "billingPostalCode" to rs.getString("billingPostalCode"),
            "billingProvince" to rs.getString("billingProvince"),
            "billingCity" to rs.getString("billingCity"),
            "billingAddress" to rs.getString("billingAddress"),
            "billingNote" to rs.getString("billingNote"),
            "hideFlag" to rs.getString("hideFlag"),
            "createdBy" to rs.getString("createdBy"),

            "updatedBy" to rs.getString("updatedBy"),
            "createdDate" to rs.getString("createdDate"),
            "updatedDate" to rs.getString("updatedDate"),
            "refId" to rs.getString("refId"),
*/
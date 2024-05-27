"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


type ButtonProps = {
    options: string[]
    height: number
  };

export default function BasicSelect(props: ButtonProps) {
  const [val, setVal] = React.useState(props.options[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setVal(event.target.value as string);
  };

  return (
    <div>
        <FormControl sx={{ m: 1, minWidth: 120 }} >
        <Select
          value={val}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style = {{height: `${props.height}rem` }}
        >

          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}

          {
            props.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))
          }

        </Select>
      </FormControl>
    </div>
  );
}
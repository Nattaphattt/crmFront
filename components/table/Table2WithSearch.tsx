import React, { ReactNode, useState } from 'react'
import Table2, { Table2Props } from './Table2'
import { Box, FormControl, Select, MenuItem, TextField, InputAdornment, Button, IconButton, Drawer, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { GridValidRowModel } from '@mui/x-data-grid';
import FilterIcon from '#/public/assets/icon-svg/filter.svg';
import Image from "next/image";
import { Clear } from '@mui/icons-material';
import ActionBtn from '../button/ActionBtn';
import PlusIcon from '#/public/assets/icon-svg/plus.svg';

const conditionOptions = ["Equals", "Not equal", "Contains", "Not contains", "Begin with", "End with"]

export type Table2WithSearchProps = {
  searchType: string;
  onSearchTypeChange: (newSearchType: string) => void;
  searchText: string
  onSearchTextChange: (newSearchText: string) => void;
  onSearchTextClear?: () => void; // TODO after all page implement > change to not optional
  slotOppositeSearch?: ReactNode;
  slotAboveTable?: ReactNode;
};
export default function Table2WithSearch<R extends GridValidRowModel>({
  searchType,
  onSearchTypeChange,
  searchText,
  onSearchTextChange,
  onSearchTextClear,
  slotOppositeSearch,
  slotAboveTable,
  ...table2Props
}: Table2WithSearchProps & Table2Props<R>) {
  const searchTypesOptions = table2Props.columns

  const [isOpenAdvanceSearch, setOpenAdvanceSearch] = useState<boolean>(false)
  const [advanceSearch, setAdvanceSearch] = useState<{ topic: string, condition: string, text: string }[]>([
    // { topic: 'source', condition: 'Contains', text: 'test' },
  ])
  const [visibilityOverrideCols, setVisibilityOverrideCols] = useState<boolean[]>([])
  const [hiddenColumns, setHiddenColumns] = useState<{ [field: string]: boolean }>();


  const onClickAdvanceSearch = () => {
    console.log("[Table2WithSearch] @onClickAdvanceSearch >>>")
    setOpenAdvanceSearch(!isOpenAdvanceSearch)
  }

  const onCloseAdvanceSearch = () => {
    console.log("[Table2WithSearch] @onCloseAdvanceSearch >>>")
    setOpenAdvanceSearch(false)
  }

  const handleClickAdd = () => {
    console.log("[Table2WithSearch] @handleClickAdd >>>")
    setAdvanceSearch([
      ...advanceSearch,
      { topic: '', condition: 'Contains', text: '' }
    ])
  }

  const handleClickClearAll = () => {
    console.log("[Table2WithSearch] @handleClickClearAll >>>")
    setAdvanceSearch([{ topic: '', condition: 'Contains', text: '' }])
  }

  if (visibilityOverrideCols.length == 0) {
    for (let i = 0; i < table2Props.columns.length; i++) {
      setVisibilityOverrideCols([...visibilityOverrideCols, false])
    }
  }
  return (
    <>
      <Box className="flex items-center justify-between mb-4">
        <Box>
          {slotOppositeSearch && <>{slotOppositeSearch}</>}
        </Box>
        <Box className="flex items-center justify-end gap-4">
          <FormControl variant="outlined" size='small'>
            <Select
              className='w-48'
              value={searchType}
              onChange={(e) => onSearchTypeChange(e.target.value || '')}
            >
              {searchTypesOptions.map(
                (item, index) => (
                <MenuItem key={index} value={item.field}>{item.headerName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            placeholder="Search"
            variant="outlined"
            size="small"
            className="w-64"
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value || '')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {searchText && <IconButton aria-label="clear-search" size="small" onClick={onSearchTextClear}>
                    <Clear className=' text-[#B2B2B2]' />
                  </IconButton>}
                  <SearchIcon className=' text-ats-icon' />
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            color="secondary"
            aria-label="Filter"
            // onClick={() => console.log('Click Search Filter >>> not implement yet')}
            onClick={() => onClickAdvanceSearch()}
            className='rounded bg-[#8B5CF6] hover:bg-[#9796F0]'>
            <Image src={FilterIcon} alt="Filter Icon" />
          </IconButton>
        </Box>
      </Box>
      <Box className={`avs-container border rounded p-4 mb-4 ${isOpenAdvanceSearch ? "block" : "hidden"}`}>
        <Box className=" avs-content mt-2">
          {advanceSearch.map((avs, index) => (
            <Box className=" avs-item mt-4" key={index}>
              <Box className=" w-full flex flex-wrap">
                <Box className=" w-11/12 lg:w-5/12 p-2">
                  <FormControl className=' w-full' variant="outlined" size='small'>
                    <InputLabel>Select Topic</InputLabel>
                    <Select
                      label="Select Topic"
                      // className='w-full'
                      value={avs.topic}
                      onChange={(e) => setAdvanceSearch(prev => {
                        const newAvs = [...prev]
                        newAvs[index].topic = e.target.value || ''
                        return newAvs
                      })}
                    >
                      {searchTypesOptions.map((item, index) => (
                        hiddenColumns && !(item.field in hiddenColumns) ?  (
                          <MenuItem key={index} value={item.field}>{item.headerName}</MenuItem>
                        ): false
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box className=" w-4/12 lg:w-2/12 p-2">
                  <FormControl className='w-full' variant="outlined" size='small'>
                    <Select
                      // className='w-full'
                      value={avs.condition}
                      onChange={(e) => setAdvanceSearch(prev => {
                        const newAvs = [...prev]
                        newAvs[index].condition = e.target.value || ''
                        return newAvs
                      })}
                    >
                      {conditionOptions.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box className=" w-7/12 lg:w-4/12 p-2">
                  <TextField
                    placeholder="Enter Text Here"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    value={searchText}
                    onChange={(e) => setAdvanceSearch(prev => {
                      const newAvs = [...prev]
                      newAvs[index].text = e.target.value || ''
                      return newAvs
                    })}
                  />
                </Box>

                <Box className=" w-1/12 lg:w-1/12 p-2 content-center">
                  {index !== 0 && <IconButton aria-label="delete-file" size="small"
                    className='rounded bg-[#FF7E7E] hover:bg-[#ff6c6c]'
                    onClick={(e) => setAdvanceSearch(prev => {
                      const newAvs = [...prev]
                      newAvs.splice(index, 1)
                      return newAvs
                    })}>
                    <Clear className=' text-white' />
                  </IconButton>}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box className=" avs-action mt-4 flex justify-end gap-4">
          <ActionBtn
            title='Add'
            icon={<Image src={PlusIcon} alt="Plus Icon" />}
            onClick={handleClickAdd}
            color='#8286FF'
          />
          <ActionBtn
            title='Search'
            icon={<SearchIcon className=' text-white' />}
            onClick={onCloseAdvanceSearch}
            color='#8286FF'
          />
          <Button
            variant="contained"
            onClick={handleClickClearAll}
            color="secondary"
            className=' text-black bg-[#EFEFEF] hover:bg-[#a4a4a4]'
            disableElevation >Clear All</Button>

        </Box>
      </Box>

      {slotAboveTable && <>{slotAboveTable}</>}

      <Table2 { ...table2Props}  
      hiddenColumns = {hiddenColumns!!} setHiddenColumns = {setHiddenColumns} />
    </>
  )
}

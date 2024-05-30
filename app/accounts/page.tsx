'use client'

import Table2, { createColumn } from '#/components/table/Table2'
import Table2WithSearch from '#/components/table/Table2WithSearch';
import IAccount, { IAccountSearch } from '#/types/account/IAccount';
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import dayjs from 'dayjs';
import router, { useRouter } from 'next/navigation';
import React, { createContext, useEffect, useMemo, useState } from 'react'
import { Box, Select, MenuItem, FormControl, Paper, Button } from '@mui/material';
import useGetAccounts from '#/hooks/accounts/useGetAccounts';
import StarIcon from '@mui/icons-material/Star';
import ActionBtn from '#/components/button/ActionBtn';
import PageContentLayout from '#/components/layout/PageContentLayout';
import AccountIcon from '#/public/assets/images/Client.png';
import Image from "next/image";
import expandMoreIcon from '#/public/assets/icon-svg/expand_more.svg'
import BasicSelect from '../candidate/components/basicSelect';
import ActionButton from '../../components/button/actionButton';
import { useSession } from "next-auth/react";
import { useForm } from 'react-hook-form';

type Props = {}

const mockData: IAccount[] = 
[
  {
    accountId: "4",
    companyName: "yomemibas",
    billingContact: "oh yes",// assume it's contact person
    accountStatus: "ok",
    favoriteFlag: "Y",
    followUpFlag: "N",
    createdBy: "wowwow",
    updatedDate: "2024-08-21 13:23:44.000",

    
  },
  {
    accountId: "5",
    companyName: "dadiamkaming",
    billingContact: "omaygod",// assume it's contact person
    accountStatus: "ok",
    favoriteFlag: "N",
    followUpFlag: "Y",
    createdBy: "wowwow",
    updatedDate: "2024-05-27 13:23:44.000",

    
  },
  {
    accountId: "6",
    companyName: "bundaramah",
    billingContact: "oh yes",// assume it's contact person
    accountStatus: "ok",
    favoriteFlag: "Y",
    followUpFlag: "Y",
    createdBy: "wowwow",
    updatedDate: "2024-11-27 21:23:44.000",

    
  },
  {
    accountId: "7",
    companyName: "aaa",
    billingContact: "oh yes",// assume it's contact person
    accountStatus: "ok",
    favoriteFlag: "N",
    followUpFlag: "N",
    createdBy: "wowwow",
    updatedDate: "2024-05-27 13:23:44.000",

    
  },
  {
    accountId: "8",
    companyName: "bundaramah",
    billingContact: "oh yes",// assume it's contact person
    accountStatus: "ok",
    favoriteFlag: "N",
    followUpFlag: "Y",
    createdBy: "wowwow",
    updatedDate: "2024-05-27 13:23:44.000",

    
  },
  {
    accountId: "9",
    companyName: "aaa",
    billingContact: "oh yes",// assume it's contact person
    accountStatus: "ok",
    favoriteFlag: "Y",
    followUpFlag: "Y",
    createdBy: "wowwow",
    updatedDate: "2024-05-27 13:23:44.000",

    
  },
  {
    accountId: "10",
    companyName: "bundaramah",
    billingContact: "oh yes",// assume it's contact person
    accountStatus: "ok",
    favoriteFlag: "N",
    followUpFlag: "N",
    createdBy: "wowwow",
    updatedDate: "2024-05-27 13:23:44.000",

    
  },
  {
    accountId: "11",
    companyName: "aaa",
    billingContact: "Rick",// assume it's contact person
    accountStatus: "ok",
    favoriteFlag: "N",
    followUpFlag: "N",
    createdBy: "wowwow",
    updatedDate: "2024-05-27 13:23:44.000",

    
  }
] 

interface IMemoPack {
  rows?: IAccount[]
}

export default function page({}: Props) {
  
  const ThemeContext = createContext<IMemoPack>({})
  const router = useRouter();

    const [accounts, setAccounts] = useState<IAccount[]>([])
    const [searchText, setSearchText] = useState<string>('');
    const [rows, setRows] = useState<IAccount[]>([])
    const [isSelectedRows, setisSelectedRows] = useState<boolean>(false)
    const [selectedRows, setSelectedRows] = useState<String[]>([])
    const [searchType, setSearchType] = useState<string>('companyName');
    const [searchFilter, setSearchFilter] = useState<IAccount>({});
    const [openModalQuickCreate, setOpenModalQuickCreate] = useState<boolean>(false);
    const [accountType, setAccountType] = useState<any>(1);

    const rowsMemoPack = useMemo(() => ({rows}),[rows])

    const { data: session } = useSession();
    const userName: string | null | undefined = session?.user?.email;
    const fullName: string | null | undefined = session?.user?.name;
    
    const {handleSubmit, watch} = useForm();

    const columns :GridColDef<any>[] = [
      createColumn('companyName', 'Company name', 200,),
      createColumn('contactPerson', 'Contact person', 200,),
      createColumn('accountStatus', 'Account Status', 200,{
        renderCell: (params) => (
          
            <p className = {params.value === "Off"? "text-red-500" : "text-green-500"}>{params.value}</p>
        ),
      }),
      createColumn('favorite', 'Favorite', 200, {
        renderCell: (params) => (
          
            params.value === "Y"?
            <StarIcon style = {{color :"yellow"}}></StarIcon>
                      : 
            <StarIcon style = {{color :"white", stroke: "#e7e7e7"}}></StarIcon>
        ),
      }),
      createColumn('followUp', 'Follow up', 200, {
        renderCell: (params) => (
          
            params.value === "Y"?
            <Button className='bg-[#a69deb] rounded-full text-white h-6 my-2 text-md' variant="text">Follow Up</Button>
            : <p></p>
        ),
      }),
      createColumn('accountOwner', 'Account Owner', 200,),
      createColumn('updatedTime', 'Updated Time', 200,),
      
    ];
// 
    // const {data, isLoading, isError} = useGetAccounts();
    // const dataACS:IAccount[] = data!!
    // const isLoadingAccounts = isLoading
    const dataACS: IAccount[] = mockData;
    const isError = false
    const isLoadingAccounts = false

    const mockAccountTypes = [
      { id: 1, value: 1, name: "All Accounts" },
      { id: 2, value: 2, name: "My Accounts" },
    ]


      useEffect(() => {
        if (dataACS && rows.length === 0) {
          mapACSToRows()
        }
      }, [dataACS])

    //Mock data

    
      useEffect(() => {
        if (searchText) {
          setSearchFilter({ [searchType]: searchText.toLowerCase() })
        } else {
          setSearchFilter({ [searchType]: null })
        }
      }, [searchType, searchText])

      useEffect(() => {
        const subscription = watch(() => handleSubmit(handleAccountTypeChange)())
        return () => {
          subscription.unsubscribe()
        }
      }, [handleSubmit, watch])

      const mapACSToRows = () => {
        setRows(dataACS.map((item) => ({
          id: item.accountId,
          accountId: item.accountId,
          companyName: item.companyName,
          contactPerson: item.billingContact,
          accountStatus: item.accountStatus,
          favorite: item.favoriteFlag,
          followUp: item.followUpFlag,
          accountOwner: item.createdBy,
          updatedTime: dateConverter(item.updatedDate!!)
        })) || [])
      }
    
      const handleClickAdd = () => {
        setOpenModalQuickCreate(true)
      }

      const dateConverter = (dateStr: string) => {
        const date: Date = new Date(dateStr)

        let day = date.getDate();
        let month = date.getMonth() + 1; 
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        

        let formattedDay = String(day).padStart(2, '0');
        let formattedMonth = String(month).padStart(2, '0');
        let formattedHours = String(hours).padStart(2, '0');
        let formattedMinutes = String(minutes).padStart(2, '0');

        let formattedDateString = `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;

        return formattedDateString;

      }
    
      const handleSearchChange = (value: string) => {
        
        setSearchText(value);
        performFastSearch();
      };

      const handleSearchTypeChange = (newSearchType: string) => {
        setSearchType(newSearchType)
        performFastSearch();
      }

      const handleViewRow = (data: IAccountSearch) => {
        router.push(`/accounts/detail/${data.id}?name=${data.companyName}`)
      }

      const handleView = (name: String, id: number) => {
        router.push(`/candidate/detail/${id}?name=${name}`)
      }
    
      const handleSelectRows = (rows: String[]) => {
        // console.log(rows)
        // const memoRows = useMemo(() => {return "1"}, ["1"])
        setSelectedRows(rows)
        if (rows.length > 0) {
          setisSelectedRows(true)
        } else {
          setisSelectedRows(false)
        }
      }

      const handleDelete = () => {
        console.log("must delete " + selectedRows)
      }

      const performFastSearch = () => {
        // let valueStr = value.toString()
        let curSortIdx = 0;
        let rowsCpy = rows
        let isAnychange = false;

        if (searchText === "") {
          mapACSToRows()
          return
        }
        while (curSortIdx < rowsCpy.length) {
          const unSortedRows = rows.slice(curSortIdx, rowsCpy.length)
          const idx = unSortedRows.findIndex(acc => acc[searchType].includes(searchText));
          console.log(idx);
          
          if (idx >= 0) {
            const [foundAcc] = rowsCpy.splice(idx + curSortIdx, 1)
            console.log(foundAcc)
            rowsCpy.unshift(foundAcc)
            curSortIdx++;
            isAnychange = true;
          }
          else break;
        }
        if (isAnychange) setRows(rowsCpy)
        console.log(rows)
      }

      const performAdvanceSearch = () => { 
        console.log("advance search!")
      }

      const handleAccountTypeChange = () => {
        mockAccountTypes[parseInt(accountType) - 1].name !== "My Accounts" ? setRows( rows.filter(
          row => row.accountOwner === fullName
        )) : mapACSToRows()
        
        console.log(mockAccountTypes[parseInt(accountType) - 1].name)
        
        console.log(rows)
      }

      
    
  return (
    // <ThemeContext.Provider value={rowsMemoPack}>
    <>
      <PageContentLayout
        title='Account'
        icon={<Image src={AccountIcon} alt="edit table column" className='w-8 h-8' />}
        actions={(
          <>
            <ActionButton title = {"Action"} options = {selectedRows.length === 0 ? []: ["delete"]}
            // onItemClick={handleDelete()}
            ></ActionButton>
          </>
        )
        }
      >
        
        <div className = "w-auto flex justify-center mx-auto max-w-screen-2xl xl:px-8 flex-col">

            <div className = "bg-white xl:p-4 rounded-lg">
            {
              dataACS && !isLoadingAccounts ? (
                <Table2WithSearch<IAccount>
                searchType={searchType}
                searchText={searchText}            
                onSearchTypeChange={(newSearchType) => handleSearchTypeChange(newSearchType)}
                onSearchTextChange={(newSearchText) => handleSearchChange(newSearchText)}
                onSearchTextClear={() => setSearchText('')}
                columns={columns}
                rows={
                  rows
                }
                loading={isLoadingAccounts}
                isMultiSelectRow
                onSelectRows={(rowsSelected: IAccountSearch[]) => handleSelectRows(rowsSelected.map((item) => item.id!!.toString()))}
                onViewRow={(rowSelected: IAccount) => handleViewRow(rowSelected)}
                slotOppositeSearch={(
                  <>
                    <Box className='flex justify-between gap-4'>
                      <FormControl fullWidth className='' variant="outlined" size='small'>
                        <Select
                          className='w-48'
                          value={accountType}
                          onChange={(e) => {
                            // setAccountType(e.target.value)
                            console.log(accountType + " " + e.target.value)
                            handleAccountTypeChange()
                            }
                            
                          }
                        >
                          {mockAccountTypes?.map((item, index) => (
                            <MenuItem key={index} value={item.value}
                            onClick = { () =>
                              setAccountType(item.value)
                            }
                            >{item.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </>
                )}
                >
                  
                </Table2WithSearch>
              )
              :
              (
                <p>Loading...</p>
              )
            }
            </div>
        </div>
      
      </PageContentLayout>
    </>
    /* </ThemeContext.Provider> */
  )
}
'use client'

import Table2, { createColumn } from '#/components/table/Table2'
import Table2WithSearch from '#/components/table/Table2WithSearch';
import IAccount, { IAccountSearch } from '#/types/account/IAccount';
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import dayjs from 'dayjs';
import router, { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react'
import { Box, Select, MenuItem, FormControl, Paper, Button } from '@mui/material';
import useGetAccounts from '#/hooks/accounts/useGetAccounts';
import StarIcon from '@mui/icons-material/Star';
import ActionBtn from '#/components/button/ActionBtn';
import PageContentLayout from '#/components/layout/PageContentLayout';
import AccountIcon from '#/public/assets/images/Client.png';
import Image from "next/image";
import expandMoreIcon from '#/public/assets/icon-svg/expand_more.svg'
import BasicSelect from '../candidate/components/basicSelect';
import ActionButton from '../candidate/components/actionButton';

type Props = {}

export default function page({}: Props) {
  
  // const router = useRouter();

    const [accounts, setAccounts] = useState<IAccount[]>([])
    const [searchText, setSearchText] = useState<string>('');
    const [rows, setRows] = useState<IAccount[]>([])
    const [isSelectedRows, setisSelectedRows] = useState<boolean>(false)
    const [selectedRows, setSelectedRows] = useState<String[]>([])
    const [searchType, setSearchType] = useState<string>('companyName');
    const [searchFilter, setSearchFilter] = useState<IAccount>({});
    const [openModalQuickCreate, setOpenModalQuickCreate] = useState<boolean>(false);
    const [accountType, setAccountType] = useState<any>(1);


    const columns :GridColDef<any>[] = [
      createColumn('companyName', 'Company name', 200,),
      createColumn('contactPerson', 'Contact person', 200,),
      createColumn('accountStatus', 'Account Status', 200,),
      createColumn('favorite', 'Favorite', 200, {
        renderCell: (params) => (
          
            params.value === "y"?
            <StarIcon style = {{color :"yellow"}}></StarIcon>
                      : 
            <StarIcon style = {{color :"white", stroke: "#e7e7e7"}}></StarIcon>
        ),
      }),
      createColumn('followUp', 'Follow up', 200, {
        renderCell: (params) => (
          
            params.value === "y"?
            <Button className='bg-[#a69deb] rounded-full' variant="text">Follow Up</Button>
            : <p>{params.value}</p>
        ),
      }),
      createColumn('accountOwner', 'Account Owner', 200,),
      createColumn('updatedTime', 'Updated Time', 200,),
      
    ];
// 
//     const {data, isLoading, isError} = useGetAccounts();
//     const dataACS = data
//     const isLoadingAccounts = isLoading
    const dataACS: IAccount[] = 
    [
      {
        account_id: 4,
        company_name: "aaa",
        billing_contact: "oh yes",// assume it's contact person
        account_status: "ok",
        favorite_flag: "y",
        follow_up_flag: "y",
        created_by: "wowwow",
        updated_date: dayjs("27/05/2024 09:30","dd/MM/YYYY HH:mm"),
    
        
      },
      {
        account_id: 5,
        company_name: "aaa",
        billing_contact: "oh",// assume it's contact person
        account_status: "ok",
        favorite_flag: "y",
        follow_up_flag: "y",
        created_by: "wowwow",
        updated_date: dayjs("27/05/2024 09:30","dd/MM/YYYY HH:mm"),
    
        
      },
      {
        account_id: 6,
        company_name: "aaa",
        billing_contact: "oh yes",// assume it's contact person
        account_status: "ok",
        favorite_flag: "y",
        follow_up_flag: "y",
        created_by: "wowwow",
        updated_date: dayjs("27/05/2024 09:30","dd/MM/YYYY HH:mm"),
    
        
      },
      {
        account_id: 7,
        company_name: "aaa",
        billing_contact: "oh yes",// assume it's contact person
        account_status: "ok",
        favorite_flag: "y",
        follow_up_flag: "y",
        created_by: "wowwow",
        updated_date: dayjs("27/05/2024 09:30","dd/MM/YYYY HH:mm"),
    
        
      }
    ] 

    const isLoadingAccounts = false

    const mockAccountTypes = [
      { id: 1, value: 1, name: "All Accounts" },
      { id: 2, value: 2, name: "My Accounts" },
    ]

      useEffect(() => {
        if (dataACS) {
          setRows(dataACS.map((item) => ({
            id: item.account_id,
            account_id: item.account_id,
            companyName: item.company_name,
            contactPerson: item.billing_contact,
            accountStatus: item.account_status,
            favorite: item.favorite_flag,
            followUp: item.follow_up_flag,
            accountOwner: item.created_by,
            updatedTime: item.updated_date
          })) || [])
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
    
      const handleClickAdd = () => {
        setOpenModalQuickCreate(true)
      }
    
      const handleSearchChange = (value: string) => {
        console.log(value);
        console.log(searchFilter);
        setSearchText(value);
      };

      const handleViewRow = (data: IAccountSearch) => {
        router.push(`/accounts/detail/${data.id}?name=${data.company_name}`)
      }

      const handleView = (name: String, id: number) => {
        router.push(`/candidate/detail/${id}?name=${name}`)
      }
    
      const handleSelectRows = (rows: String[]) => {
        console.log(rows)
        setSelectedRows(rows)
        if (rows.length > 0) {
          setisSelectedRows(true)
        } else {
          setisSelectedRows(false)
        }
      }

      const performFastSearch = (col: string, value: any) => {
        let valueStr = value.toString()
        let curSortIdx = 0;
        while (curSortIdx < rows.length) {
          const foundElement: IAccount | undefined = rows.find(row => row[col].toString() === valueStr)
          if (foundElement !== undefined) { 

          }
        }
      }

      
    
  return (
    <>
      <PageContentLayout
        title='Account'
        icon={<Image src={AccountIcon} alt="edit table column" className='w-8 h-8' />}
        actions={(
          <>
            {/* <ActionBtn
              title='Action'
              icon={<Image src={expandMoreIcon} alt="Expand" />}
              // onClick={handleClickAdd}
              color='#8286FF'
              disabled={!isSelectedRows}
            /> */}
            <ActionButton title = {"Action"} options = {["delete"]}></ActionButton>
          </>
        )
        }
      >
        
        <div className = "w-auto flex justify-center mx-auto max-w-screen-2xl xl:px-8 flex-col">

            <div className = "bg-white xl:p-4 rounded-lg">
            <Table2WithSearch<IAccount>
                searchType={searchType}
                searchText={searchText}            
                onSearchTypeChange={(newSearchType) => setSearchType(newSearchType)}
                onSearchTextChange={(newSearchText) => handleSearchChange(newSearchText)}
                onSearchTextClear={() => setSearchText('')}
                columns={columns}
                rows={rows}
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
                          // onChange={(e) => setaccountType(e.target.value as CandidateType || null)}
                          onChange={(e) => setAccountType(e.target.value || null)}
                        >
                          {mockAccountTypes?.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </>
                )}
                >
                  
                </Table2WithSearch>
            </div>
        </div>
      
      </PageContentLayout>
    </>
  )
}
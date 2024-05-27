import { DataGrid, GridColDef, GridRowsProp, GridValidRowModel } from "@mui/x-data-grid";
import NoRowsOverlay from "./NoRowOverlay";
import { Box, Checkbox, } from "@mui/material";
import Image from "next/image";
// import EditTableIcon from '#/public/assets/icon-svg/edit-table.svg';
// import EyeIcon from '#/public/assets/icon-svg/eye.svg';
import EditTableIcon from '#/public/assets/edit_column.png';
import EyeIcon from '#/public/assets/eye-purple.png';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { CustomColumnDialog } from "./CustomColumnDialog";

/**
 * extend table Column type for custom order and visibility
 */
export type CustomTableColumnType<R extends GridValidRowModel> = GridColDef<R> & { id: number, order: number, show: boolean, required?: boolean }

/**
 * props type for Table2 Component
 * @template R as type of data in table
 */
export type Table2Props<R extends GridValidRowModel> = {
  /**
    * this examplePropComment is example use of type description comment.
    * can refer to code within `key: 'value'`.
    * @default 'default value'
    * @template T, S
    * @param {Array<T>} params Array containing parameters with `T` type.
    * @param {Type} value The current value.
    * @returns {string} The value to be used.
    * @returns {React.ReactNode} The element to be rendered.
    * @demos
    *   - [go to demo](../../components/table/CustomColumnDialog.tsx)
    *   - [test]
    * @see See {@link https://google.com search google} for more details.
    */
  examplePropComment?: any;


  /**
   * Array of columns data for table with type of `GridColDef<R>[]`.
   * required for DataGrid component from mui/x-data-grid.
   * @default []
   * @template R as type of data in table
   */
  columns: GridColDef<R>[];

  /**
   * Array of required columns for table with type of `string[]`.
   * required columns will always show in the table and cannot be unselected in the custom-columns dialog.
   */
  requiredColumn?: string[];

  /**
   * Array of rows data for table with type of `GridRowsProp<R>`.
   * required for DataGrid component from mui/x-data-grid.
   * @default []
   * @template R as type of data in table
   */
  rows: GridRowsProp<R>;

  isServerPagination?: boolean;

  pagination?: {
    pageSize: number;
    page: number;
  }

  setPagination?: Dispatch<SetStateAction<{
    pageSize: number;
    page: number;
  }>>

  totalRows?: number;

  idKey?: string;

  /**
   * if `isMultiSelectRow: true` then the checkbox will be multi-select rows. 
   * Must use with `onSelectRows` function instead of `onSelectRow`
   * @default false
   */
  isMultiSelectRow?: boolean;

  /**
   * Callback function for `isMultiSelectRow: true`.
   * Must use with `onSelectRows` function instead of `onSelectRows`
  * @param {R[]} rowsSelected The array of selected rows data.
  * @returns {void} void.
  */
  onSelectRows?: (rowsSelected: R[]) => void  // NOTE: old logic for multi-selection

  /**
   * Callback function if `isMultiSelectRow: undefined | false` then the checkbox will be single-select row. 
  * @param {R | undefined} rowSelected The selected row data, can be `undefined` if the selected row is uncheck.
  * @returns {void} void.
   */
  onSelectRow?: (rowSelected: R | undefined) => void

  /**
   * Callback function when click on eye icon in the row. 
  * @param {R} rowSelected The view row data.
  * @returns {void} void.
   */
  onViewRow: (rowSelected: R) => void

  /**
   * Options for the pagination in table
   * @default [5, 10]
   */
  pageSizeOptions?: number[] | undefined;

  /**
   * Disable Column Menu of table
   * @default true
   */
  disableColumnMenu?: boolean;

  /** 
   * Disable Column Filter of table
   * @default true
   */
  disableColumnFilter?: boolean;

  /**
   * Disable Column Selector of table
   * @default true
   */
  disableColumnSelector?: boolean;

  /**
   * Loading state of table
   * @default false
   */
  loading?: boolean;

  /**
    * Whether to show the view button in the fixed columns.
    * @default true
  */
  showViewButton?: boolean;
};

export default function Table2<R extends GridValidRowModel>({
  columns = [],
  requiredColumn,
  rows = [],
  isServerPagination = false,
  pagination,
  setPagination,
  totalRows,
  isMultiSelectRow = false,
  onSelectRows,
  onSelectRow,
  onViewRow,
  pageSizeOptions = [5, 10],
  disableColumnMenu = true,
  disableColumnFilter = true,
  disableColumnSelector = true,
  loading = false,
  idKey = 'id',
  showViewButton = true,
}: Table2Props<R>) {
  const [selectedRows, setSelectedRows] = useState<R[]>([]) // NOTE: old logic for multi-selection
  const [selectedRow, setSelectedRow] = useState<R | undefined>()
  const [customColumns, setCustomColumns] = useState<Array<CustomTableColumnType<R>>>([])
  const [hiddenColumns, setHiddenColumns] = useState<{ [field: string]: boolean }>();

  const [isOpenDialog, setOpenDialog] = useState<boolean>(false)

  const rowsWithIds = rows.map((row, index) => ({
    ...row,
    id: row[idKey],
  }));

  const selectedRowInCurrentPage: R[] = []
  selectedRows.forEach((selected, index) => {
    const findSelected = rowsWithIds.find(row => row.id === selected.id)
    if (findSelected) selectedRowInCurrentPage.push(findSelected)
  })

  const fixColumns: GridColDef<R>[] = [
    createColumn('customColumn', '', 52, {
      headerAlign: 'center',
      renderHeader: () => (
        <Image
          src={EditTableIcon}
          alt="edit table column"
          onClick={handleCustomColumn}
          className="cursor-pointer" />),
      renderCell: (params) => null
    }),
    createColumn<R>('checkbox', '', 52, {
      renderCell: (params) => (
        <Checkbox
          className=" p-0"
          checked={isMultiSelectRow
            ? selectedRows.findIndex(item => item?.id === params.row?.id) !== -1
            : selectedRow?.id === params.row?.id}
          onChange={(e) => handleSelectRow(e.target.checked, params.row)} />),
      renderHeader: isMultiSelectRow
        ? () => (
          <Checkbox
            className=" p-0"
            checked={selectedRowInCurrentPage.length !== 0 && selectedRowInCurrentPage.length === rows.length}
            indeterminate={selectedRowInCurrentPage.length !== 0 && selectedRowInCurrentPage.length < rows.length}
            onChange={(e) => handleSelectAllRow(e.target.checked)} />)
        : undefined
    }),
    // createColumn<R>('view', '', 52, {
    //   renderCell: (params) => (
    //     showViewButton && (
    //       <Image className=" w-6 h-6 hover:cursor-pointer" src={EyeIcon} alt="edit table column" onClick={() => handleViewRow(params.row)} />
    //     )
    //   )
    // })
  ];
  if (showViewButton) {
    fixColumns.push(createColumn<R>('view', '', 52, {
      renderCell: (params) => (
        <Image className=" w-6 h-6 hover:cursor-pointer" src={EyeIcon} alt="edit table column" onClick={() => handleViewRow(params.row)} />
      )
    }));
  }

  const mergedColumns: GridColDef<R>[] = [
    ...fixColumns,
    ...(customColumns.sort((a, b) => a.order - b.order)),
  ];

  useEffect(() => {
    // console.log("[Table2] @useEffect[] >>>")
  }, [])

  useEffect(() => {
    // console.log("[Table2] @useEffect[columns] columns >>>", columns)
    setCustomColumns(columns.map((col, index) => {
      return {
        ...col,
        id: index,
        order: index,
        show: true,
        required: requiredColumn && requiredColumn.includes(col.field) ? true : undefined
      }
    }))
  }, [columns])

  const handleCustomColumn = () => {
    // console.log("[Table2] @handleCustomColumn >>>")
    setOpenDialog(true)
  }

  const handleSelectRow = (isCheck: boolean, rowData: R) => {
    // console.log("[Table2] @handleSelectRow isCheck, rowData >>>", isCheck, rowData)
    if (isMultiSelectRow) {
      // NOTE: old logic for multi-selection
      setSelectedRows(prev => {
        const newSelectedRows = isCheck ? [...prev, rowData] : prev.filter((item: R) => item.id !== rowData.id)
        if (onSelectRows) onSelectRows([...newSelectedRows])
        return newSelectedRows
      })
    } else {
      // NOTE: new logic for single-selection
      setSelectedRow(prev => {
        // TODO: recheck why this setState is being call twice
        // console.log("[Table2] @handleSelectRow:setSelectedRow prev >>>", prev)
        const newSelectedRow = isCheck ? rowData : undefined
        if (onSelectRow) onSelectRow(newSelectedRow)
        return newSelectedRow
      })
    }

  }


  // NOTE: logic for multi-selection
  const handleSelectAllRow = (isCheck: boolean) => {
    // console.log("[Table2] @handleSelectAllRow isCheck >>>", isCheck)
    setSelectedRows(prev => {
      const newSelectedRows = isCheck ? [...rows] : []
      if (onSelectRows) onSelectRows([...newSelectedRows])
      return newSelectedRows
    })
  }

  const handleViewRow = (rowData: R) => {
    // console.log("[Table2] @handleViewRow rowData >>>", rowData)
    onViewRow(rowData)
  }

  const rowCountRef = useRef(totalRows || 0);
  const rowCount = useMemo(() => {
    if (totalRows !== undefined) {
      rowCountRef.current = totalRows;
    }
    return rowCountRef.current;
  }, [totalRows]);


  if (!Array.isArray(rows)) {
    console.error('Rows data is not an array:', rows);
    return null; // Or display an error message
  }

  return (
    <>
      <Box
        className=" w-full"
        sx={{
          "& .table-header": {
            color: "ats.main",
            fontWeight: 700,
            fontPalette: "dark",
            textTransform: "uppercase",
          },
          // TODO: ask behavior from BA
          // height: "calc(100vh - 400px)"
          // height: "660px"
          height: pagination?.pageSize === 10 ? "660px" : pagination?.pageSize === 5 ? "400px" : "auto"
          // height: "auto"
          // minHeight: "400px"
        }}
      >
        <DataGrid
          disableRowSelectionOnClick={true}
          disableColumnMenu={disableColumnMenu}
          disableColumnFilter={disableColumnFilter}
          disableColumnSelector={disableColumnSelector}
          columnVisibilityModel={hiddenColumns}
          loading={loading}
          slots={{
            noRowsOverlay: NoRowsOverlay,
            // loadingOverlay: LinearProgress,
          }}
          rows={rowsWithIds}
          columns={mergedColumns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          pageSizeOptions={pageSizeOptions}
          // TODO: use pagination
          paginationMode={isServerPagination ? "server" : 'client'}
          rowCount={isServerPagination ? rowCount : undefined}
          paginationModel={isServerPagination ? pagination : undefined}
          // onPaginationModelChange={(model, detail) => console.log("[Table2] @onPaginationModelChange >>>", model, detail)}
          onPaginationModelChange={isServerPagination ? setPagination : undefined}
        />
      </Box>
      <CustomColumnDialog open={isOpenDialog}
        columns={customColumns}
        onClose={(_reason) => setOpenDialog(false)}
        onConfirm={(newColumns, hiddenColumns) => {
          setOpenDialog(false);
          setCustomColumns(newColumns);
          setHiddenColumns(hiddenColumns)
        }}
        onClear={() => {
          setOpenDialog(false);
        }} />
    </>
  );
}

export const createColumn = <R extends GridValidRowModel = GridValidRowModel>(field: string, name?: string, width?: number, others?: Omit<GridColDef<R>, "field" | "headerName" | "width">): GridColDef<R> => {
  return {
    field: field || '', // string
    headerName: name || '', // string
    width: width || 100, // number
    headerClassName: others && others.headerClassName || "table-header",
    sortable: others && others.sortable || false, // boolean,
    valueFormatter(value, _row, _column, _apiRef) {
      return value || '-'
    },
    ...others,
  }
}

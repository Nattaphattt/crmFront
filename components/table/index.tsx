import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import NoRowsOverlay from "./NoRowOverlay";
import { Box } from "@mui/material";

type Props = {
  columns: GridColDef[];
  rows: GridRowsProp;
  pageSizeOptions?: number[] | undefined;
  disableColumnMenu?: boolean;
  disableColumnFilter?: boolean;
  disableColumnSelector?: boolean;
  loading?: boolean;
};

export default function Table({
  columns,
  rows,
  pageSizeOptions = [5, 10],
  disableColumnMenu = true,
  disableColumnFilter = true,
  disableColumnSelector = true,
  loading = false,
}: Props) {
  return (
    <>
      <Box
        className="h-[400px] w-full"
        sx={{
          "& .header": {
            color: "ats.main",
            fontWeight: 700,
            fontPalette: "dark",
          },
        }}
      >
        <DataGrid
          disableColumnMenu={disableColumnMenu}
          disableColumnFilter={disableColumnFilter}
          disableColumnSelector={disableColumnSelector}
          loading={loading}
          slots={{ noRowsOverlay: NoRowsOverlay }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={pageSizeOptions}
        />
      </Box>
    </>
  );
}

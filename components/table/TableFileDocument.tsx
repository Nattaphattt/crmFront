"use client";
import { IListFileName } from "#/types/fileS3/IFileS3";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { Alert, AlertColor, Backdrop, Button, CircularProgress, Snackbar } from "@mui/material";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import useDownloadFileS3 from "#/hooks/fileS3/useDownloadFileS3";
import { useParams } from "next/navigation";
import { useState } from "react";
import useDeleteFileS3 from "#/hooks/fileS3/useDeleteFileS3";
import AlertConfirm from "../modal/AlertConfirm";
import NoRowsOverlay from "./NoRowOverlay";
import IconBtn from "../button/IconBtn";
import ModalConfirm from "../customModal/ModalConfirm";


type Props = {
    data: IListFileName[];
    nameModule: string;
    id: number
}

export default function TableFileDocument({ data, nameModule, id }: Props) {
    // Snackbar State
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [textSnackbar, setTextSnackbar] = useState("");
    const [typeSnackbar, setTypeSnackbar] = useState<AlertColor>("success");
    const handleCloseSnackBar = () => setOpenSnackBar(false);
    const handleOpenSnackBar = () => setOpenSnackBar(true);

    // AlertConfirm Emergency cantact State
    const [isOpenAlertConfirmDelete, setIsOpenAlertConfirmDelete] = useState(false);
    const [textAlertConfirmDelete, setTextAlertConfirmDelete] = useState("");


    const { mutateAsync: downloadFile } = useDownloadFileS3()
    const { mutateAsync: deleteFile } = useDeleteFileS3()
    const [backDrop, setBackDrop] = useState(false);
    const [fileNameDelete, setFileNameDelete] = useState("")

    const columns: GridColDef[] = [
        { field: 'id', headerName: "No.", width: 80, headerAlign: "center", align: "center" },
        { field: 'fileName', headerName: "File Name", width: 200, align: "left", flex: 1 },
        {
            field: 'uploadDate', headerName: "Upload Date", width: 150, align: "left", renderCell: (params) => (
                <p>
                    {dayjs(params.row.uploadDate).format("DD/MM/YYYY")}
                </p>
            )
        },
        {
            field: 'size', headerName: "Size", width: 80, align: "left", renderCell: (params) => (
                <>
                    <p>
                        {
                            (params.row.size / 1024) > 1024
                                ? `${(params.row.size / 1024 / 1024).toFixed(2)} MB`
                                : `${(params.row.size / 1024).toFixed(2)} KB`
                        }
                    </p>
                </>
            )
        },
        {
            field: 'action', headerName: "", width: 120, headerAlign: "center", align: "center", renderCell: (params) => (
                <>

                    <IconBtn icon={<FileDownloadRoundedIcon />} onClick={() => handleDownload(params.row.fileName)} color="#3b82f6cf" type="button" />

                    <IconBtn icon={<DeleteOutlineRoundedIcon />} onClick={() => handleOpenAlertDelete(params.row.fileName)} color="#C60000" type="button" />
                </>

            )
        },

    ];

    const rows = data.map((item, index) => ({
        id: index + 1,
        ...item,
    }));


    const handleDownload = async (fileName: String) => {
        try {
            setBackDrop(true);
            const res = await downloadFile({
                fileName: fileName,
                nameModule: nameModule,
                id: id,
            });
            const blob = new Blob([res], { type: "application/json" });
            const pdfUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = `${fileName}`;
            link.setAttribute("href", pdfUrl);
            link.setAttribute("target", "_blank");
            link.click();
            setBackDrop(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        setIsOpenAlertConfirmDelete(false);
        try {
            setBackDrop(true);
            const res = await deleteFile({
                fileName: fileNameDelete,
                nameModule: nameModule,
                id: id,
            });
            setBackDrop(false)
            setTimeout(() => {
                setTextSnackbar(res.message);
                setTypeSnackbar(res.status ? "success" : "error");
                handleOpenSnackBar();
            }, 1300);
        } catch (error) {
            console.log(error);
        }
        setBackDrop(false);
    }

    const handleOpenAlertDelete = (fileName: string) => {
        setFileNameDelete(fileName);
        setIsOpenAlertConfirmDelete(true);
        setTextAlertConfirmDelete("Are you sure you want to delete?");
        console.log(fileName)
    }

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    slots={{ noRowsOverlay: NoRowsOverlay }}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backDrop}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {/* SnackBar */}
            <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleCloseSnackBar} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}>
                <Alert onClose={handleCloseSnackBar} severity={typeSnackbar} sx={{ width: '100%' }}>
                    {textSnackbar}
                </Alert>
            </Snackbar>

            {/* <AlertConfirm isOpen={isOpenAlertConfirmDelete} setIsOpen={setIsOpenAlertConfirmDelete} title={textAlertConfirmDelete} onConfirm={handleDelete} /> */}
            <ModalConfirm isOpen={isOpenAlertConfirmDelete} setIsOpen={setIsOpenAlertConfirmDelete} title={textAlertConfirmDelete} onConfirm={handleDelete} size="large" />

        </>
    );
}
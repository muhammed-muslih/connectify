import {
  TablePagination,
  TableRow,
  TableHead,
  TableContainer,
  tableCellClasses,
  TableBody,
  TableCell,
  Table,
  Button,
  styled,
  Box,
  Paper,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { PostTableProps } from "../../../types/PropsInterfaces";
import toast, { Toaster } from "react-hot-toast";
import SinglePostView from "../Modal/SinglePostView";
import ReportDetails from "../Modal/ReportDetails";
import DeletPost from "../Modal/DeletePost";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PostTable: React.FC<PostTableProps> = ({ tableRow, tableHead }) => {
  const theme = useTheme();

  const [page, pageChange] = useState(0);
  const [rowPerPage,rowPerPageChange ] = useState(6);
  const [openPost,setOpenPost] = useState(false)
  const [openReportTable,setOpenReportTable] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [postId,setPostId] = useState<string>()
  const [userId,setUserId] = useState<string>()
  const [singlePostsData,setSinglePostsData] = 
  useState<{userName:string, userProfilePicture: string,imageUrl:string}>()
  const [reportedData,setRepotedData] = useState([])

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    pageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    rowPerPageChange(parseInt(event.target.value));
    pageChange(0);
  };

  const handleViewModal = (row:any) =>{
    setSinglePostsData({userName:row?.UserName,userProfilePicture:row?.userProfilePicture??'',imageUrl:row?.imageUrl})
    setOpenPost(true)
  }

  const handleReportTable = (report : any) => {
    setRepotedData(report)
    setOpenReportTable(true)
  }

  const handleOpenDeleteModal = (id:string,userId:string) => {
    setPostId(id)
    setUserId(userId)
    setOpenDeleteModal(true);
  }
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  
  return (
    <Box sx={{ p: 2, mt: 15 }}>
      <Toaster position="top-right" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader>
          <TableHead>
            <TableRow>
              {tableHead?.map((head) => (
                <TableCell sx={{ color: "white",backgroundColor: theme.palette.primary.light,}} key={head}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRow&&tableRow
            .slice(page * rowPerPage,page *rowPerPage + rowPerPage)
            .map((row) => (
              <StyledTableRow key={row?.id}>
                <StyledTableCell>{row.UserName}</StyledTableCell>
                <StyledTableCell>
                  { <>
                    <img 
                      width={"55px"}
                      height={"55px"}
                      src={row.imageUrl??''}
                      alt=""
                    />
                    <Typography variant="body2" onClick={()=>handleViewModal(row)} 
                    color={theme.palette.primary.light} sx={{fontSize:10,cursor:"pointer"}}>
                    click here
                    </Typography>
                    </>
                  }
                </StyledTableCell>
                <StyledTableCell>{row.description?row.description:"no description"}</StyledTableCell>
                <StyledTableCell>{row.date}</StyledTableCell>
                <StyledTableCell>{row.likes?.length}</StyledTableCell>
                <StyledTableCell>
                    <>
                    {row.report?.length}
                    <Typography variant="body2" onClick={()=>handleReportTable(row.report)} 
                    color={theme.palette.primary.light} sx={{fontSize:10,cursor:"pointer"}}>
                    view reports
                    </Typography>
                    </>
                </StyledTableCell>
                <StyledTableCell>
                  <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={()=>handleOpenDeleteModal(row.id,row.userId)}>
                    delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[6, 10,15]} 
          page={page}
          rowsPerPage={rowPerPage}
          component="div"
          count={tableRow.length} 
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      {openDeleteModal&&<DeletPost open={openDeleteModal} handleClose={handleCloseDeleteModal}postId={postId} userId={userId} />}  
      {openPost&&<SinglePostView open={openPost} setOpen={setOpenPost} singlePostsData={singlePostsData}/>}
      {openReportTable&&<ReportDetails open={openReportTable} setOpen={setOpenReportTable} tableRow={reportedData}/>}
    </Box>
  );
};

export default PostTable;

import {TablePagination,TableRow,TableHead,TableContainer,tableCellClasses,TableBody,TableCell,Table,Button,styled,Box,Paper} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { UserTableProps } from '../../../types/PropsInterfaces'
import { useBlockAndUnblockMutation } from '../../../redux/Features/api/adminApiSlice';
import toast, { Toaster } from "react-hot-toast";


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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


   const  UserTable:React.FC<UserTableProps> = ({tableRow,tableHead})=>{
    const theme = useTheme()

    const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event:React.MouseEvent<HTMLButtonElement, MouseEvent> | null,newPage : number) => {
        setPage(newPage)
      };
      
      const handleChangeRowsPerPage = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0)
      };

      const [blockAndUnblock,{isLoading}] = useBlockAndUnblockMutation()

      const handleBlockAndUnblock = async(userId:string) => {
        try {
          const res = await blockAndUnblock({userId}).unwrap()
           if(res.status === 'success'){
            toast.success(res.message)
           }
        } catch (error) {
          console.log(error);
          toast.error('something went wrong')
        }
      }
      
  return (
    <Box sx={{p:2,mt:8}}>
        <Toaster position="top-right"/>
        <Box sx={{py:2}}>
        <input type='text' style={{padding:10 ,border:'solid 1px',borderColor:theme.palette.primary.main,borderRadius:8}}/>
        </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead sx={{backgroundColor:theme.palette.primary.light,color:'white'}} >
          <TableRow >
            {
              tableHead?.map((head)=>(
                <TableCell sx={{color:'white'}} key={head}>{head}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRow?.map((row) => (
            <StyledTableRow key={row?.UserName}>
              <StyledTableCell >{row.name}</StyledTableCell>
              <StyledTableCell >{row.UserName}</StyledTableCell> 
              <StyledTableCell >{row.email}</StyledTableCell>
              <StyledTableCell >{row.joiningDate}</StyledTableCell>
              <StyledTableCell >{row.status}</StyledTableCell>
              <StyledTableCell>
                 <Button variant="contained" color='success' disabled={row.isBlocked? false:true}
                 onClick={()=> handleBlockAndUnblock(row.id)}
                  >unblock</Button>
                 <Button variant="contained" color='error' sx={{ml:2}} disabled={row.isBlocked?true:false}
                  onClick={()=> handleBlockAndUnblock(row.id)}
                 >block</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
      rowsPerPageOptions={[5, 10, 15]} // Specify the options for rows per page dropdown
      component="div"
      count={tableRow.length} // Total number of rows in your table data
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </TableContainer>
    </Box>
  )
}

export default UserTable


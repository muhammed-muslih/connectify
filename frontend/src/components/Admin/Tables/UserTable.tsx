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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { UserTableProps } from "../../../types/PropsInterfaces";
import { useBlockAndUnblockMutation } from "../../../redux/Features/api/adminApiSlice";
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UserTable: React.FC<UserTableProps> = ({ tableRow, tableHead }) => {
  const theme = useTheme();

  const [page, setPage] = useState<number>(0);
  const [rowPerPage, setRowsPerPage] = useState<number>(10);

  const [blockAndUnblock, { isLoading }] = useBlockAndUnblockMutation();

  const handleBlockAndUnblock = async (userId: string) => {
    try {
      const res = await blockAndUnblock({ userId }).unwrap();
      if (res.status === "success") {
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <Box sx={{ p: 2, mt: 15,}}>
      <Toaster position="top-right" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead
            sx={{
              backgroundColor: theme.palette.primary.light,
              color: "white",
            }}
          >
            <TableRow>
              {tableHead?.map((head) => (
                <TableCell sx={{ color: "white" }} key={head}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRow &&
              tableRow?.map((row) => (
                <StyledTableRow key={row?.UserName}>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.UserName}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.joiningDate}</StyledTableCell>
                  <StyledTableCell>{row.status}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      color="success"
                      disabled={row.isBlocked ? false : true}
                      onClick={() => handleBlockAndUnblock(row.id)}
                    >
                      unblock
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ ml: 2 }}
                      disabled={row.isBlocked ? true : false}
                      onClick={() => handleBlockAndUnblock(row.id)}
                    >
                      block
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        page={page}
        rowsPerPage={rowPerPage}
        component="div"
        count={tableRow.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default UserTable;

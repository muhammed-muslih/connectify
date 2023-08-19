import * as React from "react";
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
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Stack, Avatar } from "@mui/material";
import { useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

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

const ReportDetails = ({
  open,
  setOpen,
  tableRow,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tableRow: any[];
}) => {
  const theme = useTheme();
  const [page, pageChange] = useState(0);
  const [rowPerPage, rowPerPageChange] = useState(6);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  const tableHead = ["reportd user ", "reported reason"];

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography>Report List</Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 700 }}
                aria-label="customized table"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    {tableHead?.map((head) => (
                      <TableCell
                        sx={{
                          color: "white",
                          backgroundColor: theme.palette.primary.light,
                        }}
                        key={head}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableRow &&
                    tableRow
                      .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                      .map((row) => (
                        <StyledTableRow key={row?._id}>
                          <StyledTableCell>
                            {row?.reportedBy?.userName &&
                              row?.reportedBy?.userName}
                          </StyledTableCell>
                          <StyledTableCell>
                            {row?.text &&row?.text}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[6, 10, 15]}
              page={page}
              rowsPerPage={rowPerPage}
              component="div"
              count={tableRow.length}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default ReportDetails;

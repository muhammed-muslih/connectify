import { Box, Typography, TextField, Stack, Button } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import { useState } from "react";
import { useReportPostMutation } from "../../../redux/Features/api/postApiSlice";
import toast, { Toaster } from "react-hot-toast";

const ReportModal = ({
  setReportModalOpen,
  postId,
}: {
  setReportModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string | undefined;
}) => {
  const [text, setText] = useState<string>();
  const [textError, setTextError] = useState<string>();
  const [reportPost, { isLoading }] = useReportPostMutation();

  const handleReport = async () => {
    console.log(postId);

    if (text?.trim()) {
      if (!isLoading) {
        try {
          const res = await reportPost({ postId, text }).unwrap();
          if (res.status === "success") {
            toast.success(res.message);
            setReportModalOpen(false);
          }
        } catch (error: any) {
          console.log(error);
          toast.error("something went wrong");
        }
      }
    } else {
      setTextError("please write reason");
    }
  };

  return (
    <Box sx={{ backgroundColor: "whitesmoke", borderRadius: 4, p: 6 }}>
      <Toaster position="top-right" />
      <Stack direction={"row"} spacing={1} pb={1}>
        <ReportIcon color="warning" />
        <Typography>why are you reporting this post?</Typography>
      </Stack>

      <TextField
        id="filled-multiline-static"
        label="write the reason"
        multiline
        rows={2}
        variant="filled"
        fullWidth
        onChange={(e) => setText(e.target.value)}
      />
      <Typography color={"error"} variant="body2">
        {textError}
      </Typography>
      <Stack sx={{ mt: 2, ml: 5 }} spacing={1} direction={"row"}>
        <Button
          variant="outlined"
          color="success"
          onClick={() => setReportModalOpen(false)}
        >
          cancel
        </Button>
        <Button
          variant="contained"
          color="warning"
          startIcon={<ReportIcon />}
          onClick={handleReport}
        >
          report
        </Button>
      </Stack>
    </Box>
  );
};

export default ReportModal;

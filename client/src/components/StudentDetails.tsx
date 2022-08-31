import { Close } from "@mui/icons-material";
import {
  Box,
  Chip,
  Drawer,
  IconButton,
  Skeleton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axios";
import { Student } from "../types/student";

type Props = {};

const StudentDetails = (props: Props) => {
  const { collegeId, studentId } = useParams();
  const [student, setStudent] = React.useState<Student | null>(null);
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get<{ student: Student }>(
        `/colleges/${collegeId}/students/${studentId}`
      );
      setStudent(data.student);
    })();
  }, [collegeId, studentId]);

  const onClose = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Toolbar />
      <Box sx={{ display: "flex", justifyContent: "flex-end", margin: 1 }}>
        <Tooltip title="Close">
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          paddingX: 5,
          width: 500,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 500, boxSizing: "border-box" },
        }}>
        <Typography variant="h4">
          {student ? student.name : <Skeleton />}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "1.1rem",
            color: "text.secondary",
          }}>
          {student ? (
            `Batch: ${new Date(student.yearOfBatch || "2010-01").getFullYear()}`
          ) : (
            <Skeleton />
          )}
        </Typography>

        <Box sx={{ marginTop: 3 }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.25rem",
              color: "text.secondary",
              textTransform: "uppercase",
              marginBottom: 2,
            }}>
            Skills
          </Typography>
          {student
            ? student.skills.map((skill) => (
                <Chip label={skill} sx={{ marginBottom: 1, marginRight: 1 }} />
              ))
            : new Array(8).fill(0).map(() => <Skeleton variant="rounded" />)}
        </Box>
      </Box>
    </Drawer>
  );
};

export default StudentDetails;

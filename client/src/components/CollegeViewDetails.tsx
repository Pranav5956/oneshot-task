import {
  Avatar,
  Box,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import {
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "../config/axios";
import { College, SimilarCollege } from "../types/college";
import { Student } from "../types/student";
import StudentDetails from "./StudentDetails";

type Props = {};

const CollegeViewDetails = (props: Props) => {
  const { collegeId } = useParams();
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const [college, setCollege] = React.useState<College | null>(null);
  const [similarColleges, setSimilarColleges] = React.useState<
    SimilarCollege[] | null
  >(null);
  const [students, setStudents] = React.useState<Student[] | null>(null);

  React.useEffect(() => {
    setCollege(null);
    setSimilarColleges(null);
    setStudents(null);
  }, [collegeId]);

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get<{ college: College }>(
        `/colleges/${collegeId}`
      );
      console.log(data);

      if (data.college === null) navigate(-1);

      setCollege(data.college);
    })();
  }, [collegeId, navigate]);

  React.useEffect(() => {
    (async () => {
      if (!college) return;

      const { data } = await axios.get<{ colleges: SimilarCollege[] }>(
        `/colleges/${college._id}/similar`
      );
      setSimilarColleges(data.colleges);
    })();
  }, [college]);

  React.useEffect(() => {
    (async () => {
      if (!college) return;

      const { data } = await axios.get<{ students: Student[] }>(
        `/colleges/${college._id}/students`
      );
      setStudents(data.students);
    })();
  }, [college]);

  const onStudentClicked = (id: Student["_id"]) => {
    navigate({
      pathname: `/colleges/${college!._id}/students/${id}`,
      search: searchParams.toString(),
    });
  };

  const onCollegeClicked = (id: College["_id"]) => {
    navigate({
      pathname: `/colleges/${id}`,
    });
  };

  return (
    <>
      <Box
        sx={{
          maxHeight: "700px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}>
        <Paper sx={{ margin: 3, flex: 1, padding: 5 }}>
          <Box>
            <Typography variant="h4">
              {college ? college.name : <Skeleton />}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
                fontSize: "1.325rem",
                alignItems: "center",
              }}>
              {college ? (
                `Founded in ${college.city}, ${college.state}, ${
                  college.country
                } on ${new Date(college.yearFounded).getFullYear()}.`
              ) : (
                <Skeleton />
              )}
            </Typography>
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <Typography
              variant="h5"
              sx={{
                textTransform: "uppercase",
                color: "text.secondary",
                marginBottom: 2,
              }}>
              Offered courses
            </Typography>
            {college
              ? college.courses.map((course) => (
                  <Chip
                    label={course}
                    sx={{ marginBottom: 1, marginRight: 1 }}
                  />
                ))
              : new Array(3).fill(0).map(() => <Skeleton />)}
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <Typography
              variant="h5"
              sx={{
                textTransform: "uppercase",
                color: "text.secondary",
                marginBottom: 1,
              }}>
              Similar Colleges
            </Typography>
            <List>
              {similarColleges !== null
                ? similarColleges.map(({ match, college: similarCollege }) => (
                    <ListItem key={`similar-${similarCollege._id}`}>
                      <ListItemButton
                        onClick={() => onCollegeClicked(similarCollege._id)}>
                        <ListItemAvatar>
                          <Avatar>{similarCollege.name.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={similarCollege.name}
                          primaryTypographyProps={{ color: "primary" }}
                          secondary={`${similarCollege.city}, ${similarCollege.state}, ${similarCollege.country}`}
                        />
                        <Chip
                          label={`${match.toFixed(2)}% match`}
                          color="success"
                        />
                      </ListItemButton>
                    </ListItem>
                  ))
                : new Array(5).fill(0).map(() => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <Skeleton variant="rounded" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Skeleton />}
                        secondary={<Skeleton />}
                      />
                    </ListItem>
                  ))}
            </List>
          </Box>

          <Box sx={{ marginTop: 5 }}>
            <Typography
              variant="h5"
              sx={{
                textTransform: "uppercase",
                color: "text.secondary",
                marginBottom: 3,
              }}>
              Students
            </Typography>
            {students !== null ? (
              students.map((student) => (
                <Tooltip
                  title={`Click to view profile of ${student.name}`}
                  placement="top">
                  <Chip
                    key={student._id}
                    avatar={<Avatar>{student.name.charAt(0)}</Avatar>}
                    label={student.name}
                    sx={{ marginRight: 2, marginBottom: 2 }}
                    color="secondary"
                    onClick={() => onStudentClicked(student._id)}
                  />
                </Tooltip>
              ))
            ) : (
              <Skeleton height={200} />
            )}
          </Box>
        </Paper>
      </Box>
      <Routes>
        <Route path="students/:studentId" element={<StudentDetails />} />
      </Routes>
    </>
  );
};

export default React.memo(CollegeViewDetails);

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { College } from "../types/college";
import Link from "./Link";
import { ArrowBack } from "@mui/icons-material";

type Props = {
  colleges: College[] | null;
};

const CollegeViewDrawer = ({ colleges }: Props) => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  const listTitle = React.useMemo(() => {
    const state = searchParams.get("state");
    const course = searchParams.get("course");
    return (
      `Showing results for colleges ${
        state ? "in " + state : course ? "with " + course + " course" : ""
      }` + (colleges && ` (${colleges.length})`)
    );
  }, [searchParams, colleges]);

  const onListItemClicked = (id: College["_id"]) => {
    navigate({ pathname: `/colleges/${id}`, search: searchParams.toString() });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 500,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 500, boxSizing: "border-box" },
      }}>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 2,
          paddingBottom: 0,
          textDecoration: "none",
        }}>
        <Link
          to="/"
          sx={{
            fontSize: "1rem",
            color: "primary",
          }}>
          <ArrowBack sx={{ verticalAlign: "bottom" }} /> Back to Dashboard
        </Link>
      </Box>
      <Box>
        <Typography variant="body1" sx={{ fontSize: "1.325rem", margin: 2 }}>
          {listTitle}
        </Typography>
      </Box>
      <Box sx={{ overflow: "auto", flex: 1 }}>
        <List>
          {colleges &&
            colleges.map((college) => (
              <ListItem key={college._id} disablePadding>
                <ListItemButton onClick={() => onListItemClicked(college._id)}>
                  <ListItemText
                    primary={college.name}
                    primaryTypographyProps={{ color: "primary" }}
                    secondary={`${college.city}, ${college.state}, ${college.country}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default CollegeViewDrawer;

import { GitHub } from "@mui/icons-material";
import { AppBar as AppBarMui, Toolbar } from "@mui/material";
import React from "react";
import Link from "./Link";
import { Link as ExternalLink } from "@mui/material";

type Props = {};

const AppBar = (props: Props) => {
  return (
    <AppBarMui
      position="sticky"
      sx={{ zIndex: (theme: any) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Link
          to="/"
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            flex: 1,
          }}>
          College Compass
        </Link>
        <Link
          to="/colleges"
          sx={{
            fontSize: "1.2rem",
          }}>
          All colleges
        </Link>
        <ExternalLink
          href="https://github.com/Pranav5956/oneshot-task"
          sx={{
            fontSize: "1.2rem",
            marginLeft: 3,
            color: "white",
          }}>
          <GitHub />
        </ExternalLink>
      </Toolbar>
    </AppBarMui>
  );
};

export default React.memo(AppBar);

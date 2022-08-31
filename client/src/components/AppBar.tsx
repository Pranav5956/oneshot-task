import { AppBar as AppBarMui, Toolbar } from "@mui/material";
import React from "react";
import Link from "./Link";

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
        <Link to="/colleges">View colleges</Link>
      </Toolbar>
    </AppBarMui>
  );
};

export default React.memo(AppBar);

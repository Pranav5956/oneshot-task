import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { Link as LinkMui, SxProps, Typography } from "@mui/material";
import { Theme } from "@mui/system";

interface Props extends RouterLinkProps {
  sx?: SxProps<Theme>;
}

const Link = (props: Props) => {
  return (
    <LinkMui
      component={RouterLink}
      {...props}
      style={{ textDecoration: "none" }}>
      <Typography variant="body2" noWrap sx={{ color: "white", ...props.sx }}>
        {props.children}
      </Typography>
    </LinkMui>
  );
};

export default Link;

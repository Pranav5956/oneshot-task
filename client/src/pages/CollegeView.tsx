import { Box } from "@mui/material";
import React from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import CollegeViewDrawer from "../components/CollegeViewDrawer";
import axios from "../config/axios";
import { College } from "../types/college";

type Props = {};

const CollegeView = (props: Props) => {
  const [searchParams, _] = useSearchParams();
  const [colleges, setColleges] = React.useState<College[] | null>(null);

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get<{ colleges: College[] }>("/colleges", {
        params: searchParams,
      });
      console.log(data);
      setColleges(data.colleges);
    })();
  }, [searchParams]);

  return (
    <Box sx={{ display: "flex" }}>
      <CollegeViewDrawer colleges={colleges} />
      <Routes>
        <Route
          path=":id"
          element={<Box sx={{ flexGrow: 1, p: 3 }}>Hello</Box>}
        />
      </Routes>
    </Box>
  );
};

export default CollegeView;

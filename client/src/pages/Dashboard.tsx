import React from "react";
import axios from "../config/axios";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { Distributions } from "../types/distribution";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";

type Props = {};

const Dashboard = (props: Props) => {
  const [distribution, setDistribution] = React.useState<Distributions | null>(
    null
  );
  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get<{ distribution: Distributions }>(
        "/colleges/distribution"
      );
      setDistribution(data.distribution);
    })();
  }, []);

  return (
    <Container>
      <Grid container direction="column" gap={4} sx={{ padding: 4 }}>
        <Grid item>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 4,
            }}>
            <Typography variant="h3" component="h2">
              Getting started with College Compass!
            </Typography>
            <Typography
              variant="subtitle1"
              component="p"
              sx={{
                textAlign: "center",
                color: "text.secondary",
                fontSize: "1.25rem",
                marginX: 7,
                marginTop: 2,
              }}>
              Choose on the data points of interest from the provided 3
              distributions to search for specific colleges. Click on the "All
              Colleges" link in the navbar to get a list of all the available
              colleges. Link to the GitHub repository of this project is also in
              the navbar for docs and installation steps.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ paddingX: 8, paddingY: 2 }} elevation={2}>
            <BarChart
              distribution={distribution?.courses}
              title="Course-wise College Distribution"
              name="course"
              seriesName="count"
            />
          </Paper>
        </Grid>
        <Grid container item direction="row" justifyContent="space-between">
          <Grid item>
            <Paper
              sx={{ paddingX: 8, paddingY: 2, marginRight: 1 }}
              elevation={2}>
              <PieChart
                distribution={distribution?.state}
                title="State-wise College Distribution"
                name="state"
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper
              sx={{ paddingX: 8, paddingY: 2, marginLeft: 1 }}
              elevation={2}>
              <PieChart
                distribution={distribution?.yearFounded}
                title="Founded year-wise College Distribution"
                name="yearFounded"
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;

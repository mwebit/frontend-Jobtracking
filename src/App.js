import React from "react";
import { Container, Typography } from "@mui/material";
import JobTrackingGrid from "./components/JobTrackingGrid";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
          Job Tracking Dashboard
        </Typography>
        <JobTrackingGrid />
      </Container>
    </div>
  );
}

export default App;

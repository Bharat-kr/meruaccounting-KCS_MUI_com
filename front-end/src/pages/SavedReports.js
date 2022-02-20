import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Container } from "@mui/material";
// components
import Page from "../components/Page";
import { useParams } from "react-router-dom";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function SavedReports() {
  const { id } = useParams();
  return (
    <RootStyle title="SavedReports">
      <Container></Container>
    </RootStyle>
  );
}

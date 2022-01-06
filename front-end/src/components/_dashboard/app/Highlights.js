import { Icon } from "@iconify/react";
import bugFilled from "@iconify/icons-ant-design/bug-filled";
// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter,
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.error.dark,
    0
  )} 0%, ${alpha(theme.palette.error.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

const TOTAL = 234;

export default function Highlights() {
  return (
    <RootStyle>
      <Typography
        variant="h4"
        sx={{ textAlign: { sm: "center", lg: "left" }, pl: 1 }}
      >
        Projects Highlights
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ opacity: 0.72, textAlign: { sm: "center", lg: "left" }, pl: 1 }}
      >
        Project 1 : 69 hrs
        <br></br>
        Project 2 : 420 hrs
      </Typography>
    </RootStyle>
  );
}

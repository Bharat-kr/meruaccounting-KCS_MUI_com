import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  // maxWidth:"50vw",
  margin: "5px 0 5px 0",
  width: "45%",
  padding: theme.spacing(4, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

const TOTAL = 68.6;

export default function Monthlyhours() {
  return (
    <RootStyle>
      {/* <IconWrapperStyle>
        <Icon icon={androidFilled} width={24} height={24} />
      </IconWrapperStyle> */}
      <Typography variant="h3">{TOTAL} Hr</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        MONTH
      </Typography>
    </RootStyle>
  );
}

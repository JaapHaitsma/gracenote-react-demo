import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText as MuiListItemText,
  styled,
  Link as MuiLink,
} from "@mui/material";
import { FC, KeyboardEvent, MouseEvent } from "react";
import { verticalGradient } from "./gradients";
import { Link, useLocation } from "react-router-dom";
import { routesConfig } from "./routes";

const ListItemText = styled(MuiListItemText)(({ theme }) => ({
  margin: "1rem 0",
  textAlign: "center",
  fontSize: "1.3rem",
  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: "0.00938em",
  display: "block",
}));
const ListLink: typeof MuiLink = styled(MuiLink)(({ theme }) => ({
  color: "#fff",
  textDecoration: "none",
  width: "100%",
}));
export type ToggleDrawer = (
  open: boolean
) => (event: KeyboardEvent | MouseEvent) => void;

type Props = {
  toggleDrawer: ToggleDrawer;
};

export const ScreensMenu: FC<Props> = ({ toggleDrawer }) => {
  const closeDrawer = toggleDrawer(false);
  const closeDrawerDelayed = (e: KeyboardEvent | MouseEvent) => {
    setTimeout(closeDrawer, 250, e);
  };
  const currentRoute = useLocation();
  return (
    <Box
      role="presentation"
      onClick={closeDrawerDelayed}
      onKeyDown={closeDrawerDelayed}
      sx={{
        background: verticalGradient,
        flex: 1,
        paddingTop: "2rem",
        color: "#fff",
      }}
    >
      <List>
        {routesConfig.map(({ title, url }, index) => {
          return (
            <ListItem key={title}>
              <ListLink component={Link} to={url}>
                <ListItemButton
                  divider
                  selected={currentRoute.pathname === url}
                >
                  <ListItemText disableTypography primary={title} />
                </ListItemButton>
              </ListLink>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

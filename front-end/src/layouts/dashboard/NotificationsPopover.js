import React, { useContext, useEffect } from "react";
import faker from "faker";
import axios from "axios";
import PropTypes from "prop-types";
import { noCase } from "change-case";
import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { set, sub, formatDistanceToNow } from "date-fns";

//icons
import { Icon } from "@iconify/react";
import bellFill from "@iconify/icons-eva/bell-fill";
import clockFill from "@iconify/icons-eva/clock-fill";
import NoteIcon from "@mui/icons-material/Note";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Description from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";

//context
import { CurrentUserContext } from "src/contexts/CurrentUserContext";

// material
import { alpha } from "@mui/material/styles";
import {
  Box,
  Badge,
  Avatar,
  IconButton,
  Typography,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
import { getCommonData } from "src/api/auth api/commondata";

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === "teams") {
    return {
      avatar: <AdminPanelSettingsIcon color="primary" />,
      title,
    };
  }
  if (notification.type === "projects") {
    return {
      avatar: <Description color="warning" />,
      title,
    };
  }
  if (notification.type === "clients") {
    return {
      avatar: <GroupIcon color="error" />,
      title,
    };
  }
  if (notification.type === "settings") {
    return {
      avatar: <SettingsIcon color="secondary" />,
      title,
    };
  }
  if (notification.type === "reports") {
    return {
      avatar: <NoteIcon color="info" />,
      title,
    };
  }
  return {
    avatar: <HomeIcon color="primary" />,
    title,
  };
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

function NotificationItem({ notification, markAsRead }) {
  const { avatar, title } = renderContent(notification);
  return (
    <ListItemButton
      to={`/dashboard/${notification.type}`}
      disableGutters
      component={RouterLink}
      onClick={() => {
        markAsRead(notification._id);
      }}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.isUnRead && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Box
              component={Icon}
              icon={clockFill}
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {formatDistanceToNow(new Date(notification.createdAt))}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { commonData, dispatchCommonData } = useContext(CurrentUserContext);

  useEffect(() => {
    getCommonData(dispatchCommonData);
  }, []);
  useEffect(() => {
    if (commonData?.commonData?.user?.notifications) {
      setNotifications(commonData?.commonData?.user?.notifications);
    }
  }, [commonData]);
  const totalUnRead = notifications.filter(
    (item) => item.isUnRead === true
  ).length;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  const markAsRead = async (id) => {
    await axios
      .patch(`/notify/${id}`)
      .then((res) => {
        console.log(res);
        // setNotifications(res);
      })
      .catch((err) => console.log(err));

    await getCommonData(dispatchCommonData);
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          width: 360,
          height: "auto",
          maxHeight: "80%",
          overflowY: "scroll",
        }}
      >
        {notifications.map((notification) => {
          return (
            <NotificationItem
              key={notification._id}
              notification={notification}
              markAsRead={markAsRead}
            />
          );
        })}
        {notifications.length === 0 && (
          <Typography variant="h6" sx={{ p: 1 , textAlign:"center"}}>
            No Notifications Here
          </Typography>
        )}
      </MenuPopover>
    </>
  );
}

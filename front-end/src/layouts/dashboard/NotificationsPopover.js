import React, { useContext, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { noCase } from "change-case";
import { useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { formatDistanceToNow } from "date-fns";

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
import { loginContext } from "src/contexts/LoginContext";

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
      avatar: (
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <AdminPanelSettingsIcon />
        </Avatar>
      ),
      title,
    };
  }
  if (notification.type === "projects") {
    return {
      avatar: (
        <Avatar sx={{ bgcolor: "warning.main" }}>
          <Description />
        </Avatar>
      ),
      title,
    };
  }
  if (notification.type === "clients") {
    return {
      avatar: (
        <Avatar sx={{ bgcolor: "error.main" }}>
          <GroupIcon />
        </Avatar>
      ),
      title,
    };
  }
  if (notification.type === "settings") {
    return {
      avatar: (
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <SettingsIcon />
        </Avatar>
      ),
      title,
    };
  }
  if (notification.type === "reports") {
    return {
      avatar: (
        <Avatar sx={{ bgcolor: "info.main" }}>
          <NoteIcon />
        </Avatar>
      ),
      title,
    };
  }
  return {
    avatar: (
      <Avatar sx={{ bgcolor: "primary.main" }}>
        <HomeIcon />
      </Avatar>
    ),
    title,
  };
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

function NotificationItem({ notification, markAsRead, deleteNotification }) {
  const { avatar, title } = renderContent(notification);
  const { loginC } = useContext(loginContext);
  const navigate = useNavigate();
  const role = loginC.userData.role;
  return (
    <ListItemButton
      disableGutters
      onClick={() => {
        markAsRead(notification._id);
        if (role === "admin" || role === "manager") {
          navigate(`/dashboard/${notification.type}`, { replace: true });
        }
        if (role === "projectLeader" && notification.type === "projects") {
          navigate(`/dashboard/${notification.type}`, { replace: true });
        }
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
      <ListItemAvatar>{avatar}</ListItemAvatar>
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
      <IconButton
        onClick={() => {
          deleteNotification(notification._id);
        }}
      >
        <CloseIcon />
      </IconButton>
    </ListItemButton>
  );
}

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { commonData, dispatchCommonData } = useContext(CurrentUserContext);

  //Fetching common data
  useEffect(() => {
    getCommonData(dispatchCommonData);
  }, []);

  //Setting the State of Notifications
  useEffect(() => {
    if (commonData?.commonData?.user?.notifications) {
      setNotifications(commonData?.commonData?.user?.notifications);
    }
  }, [commonData]);

  //calculating the Total Uread Notifications
  const totalUnRead = notifications.filter(
    (item) => item.isUnRead === true
  ).length;

  //Open PopOver
  const handleOpen = () => {
    setOpen(true);
  };

  //close Popover
  const handleClose = () => {
    setOpen(false);
  };

  //Mark As Read function for Notification
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

  // delete noti
  const deleteNotification = async (id) => {
    await axios
      .delete(`/notify/${id}`)
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
              deleteNotification={deleteNotification}
            />
          );
        })}
        {notifications.length === 0 && (
          <Typography variant="h6" sx={{ p: 1, textAlign: "center" }}>
            No Notifications Here
          </Typography>
        )}
      </MenuPopover>
    </>
  );
}

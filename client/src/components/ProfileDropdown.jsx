import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
// import BackgroundLetterAvatars from "./Avatar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} from "../redux/reducers/customerReducer";
import { useDispatch } from "react-redux";

export default function ProfileDropdown({ currentUser }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const { currentUser } = useSelector((state) => state.customer);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await axios.post("/api/customer/auth/signout");
      const data = await res.data;
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <img
            className="rounded-full h-7 w-7 object-cover"
            src={currentUser.avatar}
            alt="profile"
          />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <Link to={"/profile"}>
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <Link to={"/my-orders"}>
                      <MenuItem>My Orders</MenuItem>
                    </Link>

                    <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}

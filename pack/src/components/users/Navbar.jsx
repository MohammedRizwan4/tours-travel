import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { createPortal } from "react-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Register from "../Register";
import Login from "../Login";
import { logout } from "../../store/reducers/authReducer";
import { useFetchAllThemesQuery } from "../../store/services/themeService";
import {
    closeLogin,
    closeRegister,
    setLogin,
    setRegister,
} from "../../store/reducers/globalReducer";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "80%",
    width: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    outline: "none",
};

const style1 = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "50%",
    width: "80%",
    bgcolor: "background.paper",
    outline: "none",
    boxShadow: 24,
};

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { register, login } = useSelector((state) => state.globalReducer);
    console.log(register, login);

    const { data, isFetching } = useFetchAllThemesQuery();
    console.log(data);

    const handleOpen = () => {
        dispatch(setRegister());
        dispatch(closeLogin());
    };

    const handleLoginOpen = () => {
        dispatch(setLogin());
    };

    const handleLoginClose = () => {
        dispatch(closeLogin());
    };

    const handleClosed = () => closeRegister();

    const [openRegister, setOpenRegister] = useState(false);
    const { userToken, user } = useSelector((state) => state.authReducer);

    let token;
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            token = localStorage.getItem("token");
        } else {
            token = "";
        }
    }, [localStorage.getItem("token")]);

    const [navbarOpen, setNavbarOpen] = useState(false);

    const adminLogout = () => {
        toast.success("Logged Out Successfully", {
            style: {
                backgroundColor: "#393a3b",
                color: "white",
                padding: "8px",
            },
        });
        dispatch(logout("login-token"));
        navigate("/");
    };

    return (
        <div className="mainNavbar">
            <Nav>
                <div className="left">
                    <div className="logo">PACK&GO</div>
                </div>
                <div className="right">
                    <div className="links">
                        <ul>
                            <Link to="/">
                                <li>
                                    <a href="#">HOME</a>
                                </li>
                            </Link>
                            <li id="theme" className="bounce">
                                <a href="#">THEMES</a>
                                <div className="theme_big">
                                    <ul>
                                        {data?.map((theme, index) => {
                                            return (
                                                <Link
                                                    to={`/theme/${theme._id}`}
                                                    style={{ margin: "0", padding: "0" }}
                                                >
                                                    <li>
                                                        <a href="#">{theme.name}</a>
                                                    </li>
                                                </Link>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </li>
                            <Link to="/contactus">
                                <li>
                                    <a href="#">CONTACT US</a>
                                </li>
                            </Link>
                            <Link to="/aboutus">
                                <li>
                                    <a href="#">ABOUT US</a>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    {userToken ? (
                        <div className="buttons">
                            <Button
                                id="fade-button"
                                aria-controls={open ? "fade-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                                style={{
                                    backgroundColor: "var(--bgYellow)",
                                    "&:hover": {
                                        color: "black",
                                    },
                                }}
                            >
                                Dashboard
                            </Button>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    "aria-labelledby": "fade-button",
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                                style={{ marginTop: "1rem" }}
                            >
                                <MenuItem
                                    sx={{
                                        width: "14rem",
                                        color: "var(--bgDarkBlue)",
                                        fontSize: 18,
                                        fontWeight: 700,
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}
                                    onClick={handleClose}
                                >
                                    Profile
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        width: "14rem",
                                        color: "var(--bgDarkBlue)",
                                        fontSize: 18,
                                        fontWeight: 700,
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}
                                    onClick={handleClose}
                                >
                                    My account
                                </MenuItem>
                                <Link to="/liked">
                                    {" "}
                                    <MenuItem
                                        sx={{
                                            width: "14rem",
                                            color: "var(--bgDarkBlue)",
                                            fontSize: 18,
                                            fontWeight: 700,
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}
                                        onClick={handleClose}
                                    >
                                        Liked
                                    </MenuItem>
                                </Link>
                                <Link to="/mybookings">
                                    <MenuItem
                                        sx={{
                                            width: "14rem",
                                            color: "var(--bgDarkBlue)",
                                            fontSize: 18,
                                            fontWeight: 700,
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}
                                        onClick={handleClose}
                                    >
                                        My Bookings
                                    </MenuItem>
                                </Link>
                                <MenuItem
                                    sx={{
                                        width: "14rem",
                                        color: "var(--bgDarkBlue)",
                                        fontSize: 18,
                                        fontWeight: 700,
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}
                                    onClick={() => {
                                        handleClose();
                                        adminLogout();
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div className="buttons">
                            <button
                                style={{ backgroundColor: "var(--bgYellow)" }}
                                onClick={handleOpen}
                            >
                                REGISTER
                            </button>
                            <button
                                style={{ backgroundColor: "var(--bgYellow)" }}
                                onClick={handleLoginOpen}
                            >
                                LOGIN
                            </button>
                        </div>
                    )}
                </div>
                <div className="menu">
                    {!navbarOpen ? (
                        <MenuRoundedIcon
                            className="icon"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        />
                    ) : (
                        <CancelOutlinedIcon
                            className="icon"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        />
                    )}
                </div>
                {navbarOpen && (
                    <div className="listMenu">
                        <ul>
                            <li>
                                <a href="#">HOME</a>
                            </li>
                            <li id="theme">
                                <a href="#">THEME</a>
                            </li>
                            <div className="hide">
                                <ul>
                                    <li>
                                        <a href="#">Top Packages</a>
                                    </li>
                                    <li>
                                        <a href="#">Top Packages</a>
                                    </li>
                                    <li>
                                        <a href="#">Top Packages</a>
                                    </li>
                                    <li>
                                        <a href="#">Top Packages</a>
                                    </li>
                                </ul>
                            </div>
                            <li>
                                <a href="#">CONTACT US</a>
                            </li>
                            <li>
                                <a href="#">ABOUT US</a>
                            </li>
                            <li onClick={() => setOpenRegister(!openRegister)}>
                                <a href="#">REGISTER</a>
                            </li>
                            <li onClick={() => setOpenLogin(!openLogin)}>
                                <a href="#">LOGIN</a>
                            </li>
                        </ul>
                    </div>
                )}
            </Nav>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={register}
                onClose={handleClosed}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={register}>
                    <Box
                        sx={style}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Register />
                    </Box>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={login}
                onClose={handleLoginClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={login}>
                    <Box
                        sx={style1}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Login />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default Navbar;

const bounceAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-50px);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    top: -100%;
  }
  to {
    top: 0;
  }
`;

const Nav = styled.nav`
  height: 10vh;
  width: 100%;
  background-color: var(--bgDarkBlue);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .listMenu {
    position: absolute;
    height: max-content;
    width: 25rem;
    background-color: whitesmoke;
    box-shadow: rgba(0, 0, 0, 0.35) 5px 5px 15px;
    top: 10vh;
    right: 0;
    z-index: 999999999;
    ul {
      display: flex;
      height: 100%;
      flex-direction: column;
      width: 100%;
      align-items: center;
      justify-content: flex-start;
      gap: 2rem;
      z-index: 999999999;
      padding: 2rem 0;
      .hide {
        display: none;
        z-index: 999999999;
        background-color: white;
        border-radius: 3rem;
        padding: 2rem 0;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        transform-origin: bottom;
      }
      .bounce:hover {
        animation-name: bounce;
        animation-timing-function: ease;
      }
      #theme:hover + .theme_big,
      .hide:hover {
        display: block;
        position: absolute;
        top: 9.1rem;
        right: 25rem;
        box-shadow: rgba(0, 0, 0, 0.35) 5px 5px 15px;
        z-index: 999999999;
        ul {
          display: flex;
          height: 20rem;
          flex-direction: column;
          width: 30rem;
          align-items: center;
          justify-content: flex-start;
          gap: 1rem;
          z-index: 999999999;
          padding: 0 2rem;
          li:hover a {
            color: white;
          }
          li {
            list-style-type: none;
            height: 4.5rem;
            width: 100%;
            display: flex;
            align-items: center;
            z-index: 999999999;
            cursor: pointer;
            justify-content: center;
            &:hover {
              color: white;
              background-color: #393a3b;
            }
            a {
              text-decoration: none;
              z-index: 999999999;
              font-size: 2rem;
              color: #393a3b;
            }
          }
        }
      }
      li {
        list-style-type: none;
        height: 5rem;
        width: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        z-index: 999999999;
        justify-content: center;
        &:hover {
          color: white;
          background-color: #393a3b;
        }
        a {
          text-decoration: none;
          z-index: 999999999;
          font-size: 2rem;
          color: #393a3b;
        }
      }
      li:hover a {
        color: white;
      }
    }
  }
  .left {
    margin-left: var(--r3-5);
    .logo {
      font-size: var(--r3);
      font-weight: 600;
      color: var(--bgLightSkin);
      padding: var(--r-75) var(--r2);
      letter-spacing: 0.15rem;
      &:hover {
        background-color: var(--bgWhite);
        color: var(--bgDarkBlue);
        box-shadow: -2px -1px 30px -2px rgba(0, 0, 0, 0.48);
        -webkit-box-shadow: -2px -1px 30px -2px rgba(0, 0, 0, 0.48);
        -moz-box-shadow: -2px -1px 30px -2px rgba(0, 0, 0, 0.48);
        transition: all 0.2s ease-out;
        cursor: pointer;
        border-radius: var(--r2);
      }
    }
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--r3);
    .links {
      display: flex;
      justify-content: center;
      align-items: center;
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--r2);
        #theme:hover .theme_big {
          display: block;
        }
        li {
          list-style-type: none;
          cursor: pointer;
          box-sizing: border-box;
          height: 100%;
          .theme_big {
            position: absolute;
            top: 10vh;
            display: none;
            z-index: 999999999;
            border-radius: var(--r3);
            padding: var(--r2) 0;
            height: 37vh;
            width: 28rem;
            background-color: var(--bgDarkBlue);
            ul {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 100%;
              li {
                width: 100%;
                &:hover {
                  border-radius: var(--r2);
                  background-color: var(--bgYellow);
                }
                a {
                  width: 100%;
                  color: var(--bgWhite);
                  padding: var(--r1) var(--r5);
                }
              }
            }
          }
          a {
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--bgWhite);
            height: 100%;
            padding: var(--r2-5) var(--r1-25);
            font-size: var(--r1-5);
            letter-spacing: 0.15rem;
            font-weight: 500;
            &:hover {
              color: var(--bgYellow);
            }
          }
        }
      }
    }
    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--r3);
      margin-right: var(--r2);
      button {
        padding: var(--r1) var(--r2);
        font-size: var(--r1-5);
        font-weight: 600;
        color: var(--bgWhite);
        cursor: pointer;
        background-color: var(--bgDarkBlue);
        border: none;
        border-radius: var(--r-75);
        &:hover {
          background-color: var(--bgWhite);
          color: var(--bgYellow);
          transition: all 0.3s ease-in-out;
        }
      }
    }
    .menu {
      display: none;
      animation: ${slideDown} 0.7s ease-in-out;
      .icon {
        color: #393a3b;
        cursor: pointer;
      }
    }
  }

  @media (min-width: 200px) and (max-width: 875px) {
    width: 100%;
    .left {
      margin-left: 1rem;
      .logo {
        font-size: 3rem;
        font-weight: 600;
        color: #393a3b;
        padding: 1rem 2rem;
        &:hover {
          background-color: #393a3b;
          color: white;
          box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.8);
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          border-radius: 2rem;
        }
      }
    }
    .right {
      display: none;
    }
    .menu {
      display: block;
      display: flex;
      justify-content: center;
      animation: ${slideDown} 0.7s ease-in-out;
      align-items: center;
      .icon {
        font-size: 3.5rem;
        margin-right: 1.5rem;
        cursor: pointer;
      }
    }
  }

  @media (min-width: 875px) and (max-width: 1024px) {
    width: 100%;
    .left {
      margin-left: 5rem;
      .logo {
        font-size: 3.5rem;
      }
    }
    .right {
      margin-right: 5rem;
      .links {
        ul {
          margin-right: 3rem;
          li {
            padding: 0.5rem 1rem;
            a {
              font-size: 1.7rem;
              font-weight: 500;
            }
          }
        }
      }
      .buttons {
        gap: 3rem;
        button {
          padding: 0.7rem 1.5rem;
          font-size: 1.7rem;
        }
      }
    }
    .menu {
      display: none;
    }
  }

  @media (min-width: 1024px) and (max-width: 1200px) {
    width: 100%;
    .left {
      margin-left: 5rem;
    }
    .right {
      margin-right: 5rem;
      .links {
        ul {
          margin-right: 3rem;
          li {
            padding: 0.5rem 1rem;
            a {
              font-size: 2rem;
            }
          }
        }
      }
      .buttons {
        gap: 3rem;
        button {
          padding: 0.7rem 1.5rem;
          font-size: 1.5rem;
        }
      }
    }
    .menu {
      display: none;
    }
  }

  @media (min-width: 1200px) {
    .menu {
      display: none;
    }
  }
`;

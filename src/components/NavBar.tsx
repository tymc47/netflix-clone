import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { BsBell as Notification_icon } from "react-icons/bs";
import { BsSearch as Search_icon } from "react-icons/bs";
import { MdOutlineLogout as Logout_icon } from "react-icons/md";
import { BiMenu as Menu_icon } from "react-icons/bi";

import devices from "../utils/devices";
import { useState } from "react";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  padding: 30px 3.5rem 0 3.5rem;
  max-width: 100vw;
  background: transparent;
  position: relative;
  top: 0;
  z-index: 10;

  img.logo {
    width: 9rem;
  }

  @media ${devices.medium} {
    height: 2rem;
    padding: 30px 2.5rem 0 2.5rem;

    img.logo {
      width: 6rem;
    }
  }

  &.signup-page {
    @media ${devices.medium} {
      height: 2rem;
      padding: 30px 1.5rem 0 1.5rem;

      img.logo {
        width: 9rem;
      }
    }
  }
`;

const NavContainer_Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 3.5rem 0 3.5rem;
  max-width: 100%;
  background: transparent;
  position: sticky;
  top: 0;
  z-index: 10;
  transition: background-color 0.4s;

  @media ${devices.mediumLarge} {
    height: 50px;
    padding: 0 1rem;
  }

  @media ${devices.medium} {
    height: 50px;
    padding: 0 0.5rem;
  }

  &.dark {
    background-color: rgb(20, 20, 20);
    max-width: 100vw;
  }

  a {
    padding-top: 5px;
  }

  div.logo {
    @media ${devices.medium} {
      flex: 1;
    }
  }

  div.sidebar {
    display: none;
    margin: 0 0.5rem;
    font-size: 1.5rem;

    @media ${devices.medium} {
      display: block;
    }
  }

  div.nav-link {
    flex: 1;
    margin: 0 35px;
    font-size: 14px;

    @media ${devices.mediumLarge} {
      margin: 0 20px;
      font-size: 12px;
    }

    @media ${devices.medium} {
      display: none;
    }

    a {
      color: #e5e5e5;
      text-decoration: none;
      padding: 0 10px;
      cursor: pointer;
      transition: color 0.4s;
    }

    a:hover {
      color: #b3b3b3;
    }
  }
  img.logo {
    width: 5.5rem;
  }

  div.dropdown {
    flex: 1;
    margin-left: 24px;
    display: none;

    @media ${devices.medium} {
      display: block;
    }
  }
`;

export const SignIn = styled(Link)`
  text-decoration: none;
  color: white;
  font-family: "Netflix Sans Light";
  background-color: #e50914;
  padding: 7px 15px;
  border-radius: 3px;
  margin-top: 0;
  display: inline-block;

  &.signup {
    background-color: transparent;
    color: inherit;
    font-size: 24px;
    font-size: bold;

    @media ${devices.medium} {
      font-size: 16px;
    }
  }
`;

interface NavBarProps {
  children?: React.ReactNode;
  className: string;
}

const NavButtonContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    fill: white;
    font-size: 1.3rem;
    margin: 0 1rem;

    @media ${devices.mediumLarge} {
      font-size: 1rem;
      margin: 0 0.8rem;
    }
  }
`;

const SideBar = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 175px;
  box-sizing: content-box;
  overflow: hidden;
  top: 100%;
  transition: 0.5s;
  z-index: 6;
  background-color: rgba(0, 0, 0);

  a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: white;
    display: block;
    transition: 0.3s;
    width: 130px;
  }

  &.open {
    width: 175px;
  }

  &.close {
    width: 0;
  }
`;

const SideBarMask = styled.div`
  position: absolute;
  width: 100vw;
  height: calc(100vh - 50px);
  background-color: rgba(0, 0, 0, 0.5);
  top: 100%;
  left: 0;
  z-index: 5;

  &.close {
    display: none;
  }

  &.open {
    display: block;
  }
`;

export const NavBar = ({ children, className }: NavBarProps) => {
  return (
    <NavContainer className={className}>
      <Link to="/">
        <img className="logo" src={logo} />
      </Link>
      {children}
    </NavContainer>
  );
};

interface NavBar_MainProps {
  scrolled: boolean;
  handleLogout: () => void;
}

export const NavBar_Main = ({ scrolled, handleLogout }: NavBar_MainProps) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  return (
    <NavContainer_Main className={scrolled ? "dark" : ""}>
      <SideBar className={openSidebar ? "open" : "close"}>
        <Link to="/browse">Home</Link>
        <Link to="/browse/tvshows">TV Shows</Link>
        <Link to="/browse/movies">Movies</Link>
        <Link to="/browse/mylist">My List</Link>
      </SideBar>
      <SideBarMask
        className={openSidebar ? "open" : "close"}
        onClick={() => setOpenSidebar(!openSidebar)}
      />
      <div className="sidebar">
        <Menu_icon onClick={() => setOpenSidebar(!openSidebar)} />
      </div>
      <div className="logo">
        <Link to="/">
          <img className="logo" src={logo} />
        </Link>
      </div>
      <div className="nav-link">
        <Link to="/browse">Home</Link>
        <Link to="/browse/tvshows">TV Shows</Link>
        <Link to="/browse/movies">Movies</Link>
        <Link to="/browse/mylist">My List</Link>
      </div>

      <NavButtonContainer>
        <Search_icon />
        <Notification_icon />
        <Logout_icon style={{ cursor: "pointer" }} onClick={handleLogout} />
      </NavButtonContainer>
    </NavContainer_Main>
  );
};

import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { BsBell as Notification_icon } from "react-icons/bs";
import { BsSearch as Search_icon } from "react-icons/bs";
import { MdOutlineLogout as Logout_icon } from "react-icons/md";

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

  &.dark {
    background-color: rgb(20, 20, 20);
    max-width: 100vw;
  }

  a {
    padding-top: 5px;
  }

  div.nav-link {
    flex: 1;
    margin: 0 35px;

    a {
      color: #e5e5e5;
      text-decoration: none;
      padding: 0 10px;
      font-size: 14px;
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
  }
`;

interface NavBarProps {
  children?: React.ReactNode;
}

const NavButtonContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    fill: white;
    font-size: 1.3rem;
    margin: 0 1rem;
  }
`;

export const NavBar = ({ children }: NavBarProps) => {
  return (
    <NavContainer>
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
  return (
    <NavContainer_Main className={scrolled ? "dark" : ""}>
      <Link to="/">
        <img className="logo" src={logo} />
      </Link>
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

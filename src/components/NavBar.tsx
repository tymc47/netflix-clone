import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { ReactComponent as Notification_icon } from "../assets/notifications.svg";
import { ReactComponent as Search_icon } from "../assets/search.svg";
import { ReactComponent as Logout_icon } from "../assets/logout.svg";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

interface NavBarProps {
  children?: React.ReactNode;
}

const iconStyles = {
  fill: "white",
  transform: "scale(0.5)",
};

export const NavBar = ({ children }: NavBarProps) => {
  return (
    <NavContainer>
      <a href="/">
        <img className="logo" src={logo} />
      </a>
      {children}
    </NavContainer>
  );
};

export const NavBar_Main = ({ scrolled }: { scrolled: boolean }) => {
  return (
    <NavContainer_Main className={scrolled ? "dark" : ""}>
      <a href="/">
        <img className="logo" src={logo} />
      </a>
      <div className="nav-link">
        <Link to="/browse">Home</Link>
        <Link to="/browse/tvshows">TV Shows</Link>
        <Link to="/browse/movies">Movies</Link>
        <Link to="/browse/mylist">My List</Link>
      </div>
      <div>
        <Search_icon {...iconStyles} />
        <Notification_icon {...iconStyles} />
        <Logout_icon {...iconStyles} />
      </div>
    </NavContainer_Main>
  );
};

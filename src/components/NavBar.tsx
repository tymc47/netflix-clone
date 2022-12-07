import styled from "styled-components";
import logo from "../assets/logo.png";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 4rem;
  padding: 30px 3.5rem 0 3.5rem;
  max-width: 100vw;
  background: transparent;
  position: relative;
  top: 0;
  right: 0;
  z-index: 10;

  img.logo {
    width: 9rem;
  }
`;

interface NavBarProps {
  children?: React.ReactNode;
}

const NavBar = ({ children }: NavBarProps) => {
  return (
    <NavContainer>
      <a href="/">
        <img className="logo" src={logo} />
      </a>
      {children}
    </NavContainer>
  );
};

export default NavBar;

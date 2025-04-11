// src/components/Toolbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

// === Theme ===
const theme = {
  colors: {
    background: "#fdf6e3", // Light beige for contrast
    primary: "#2A2A2A", // Dark gray for toolbar background
  },
};

// === Styled Components ===
const ToolbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${theme.colors.primary};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
  min-height: 60px;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: 700;
  color: ${theme.colors.background};
  transition: color 0.3s ease;
  flex-shrink: 0;
  z-index: 1001;

  &:hover {
    color: #e0d8c3;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: flex-end;
  flex: 1;

  @media (max-width: 600px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-family: "Montserrat", sans-serif;
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  font-weight: 500;
  color: ${theme.colors.background};
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  white-space: nowrap;
  position: relative;

  &:hover {
    color: #e0d8c3;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: ${theme.colors.background};
    transition: width 0.4s ease, left 0.4s ease;
  }

  &:hover::after {
    width: 100%;
    left: 0;
  }
`;

const BurgerIcon = styled.div<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  z-index: 1002; /* Above MobileMenu */
  padding: 0.75rem; /* Larger tap area */

  @media (max-width: 600px) {
    display: flex;
  }

  div {
    width: 25px;
    height: 3px;
    background-color: ${theme.colors.background};
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
    div:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    div:nth-child(2) {
      opacity: 0;
    }
    div:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `}

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 60px; /* Below toolbar */
  left: 0;
  width: 100%;
  height: calc(100vh - 60px); /* Fill remaining screen */
  background: ${theme.colors.primary};
  z-index: 999; /* Below BurgerIcon */
  padding: 2rem 0;
  box-sizing: border-box;
  overflow-y: auto;

  @media (min-width: 650px) {
    display: none;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0;
  }
`;

const MobileNavLink = styled(Link)`
  font-family: "Montserrat", sans-serif;
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: 600;
  color: ${theme.colors.background};
  text-decoration: none;
  padding: 1.5rem; /* Better tap targets */
  transition: color 0.3s ease;
  text-align: center;
  width: 100%;

  &:hover {
    color: #e0d8c3;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

// === Main Component ===
const Toolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu when clicking outside, excluding BurgerIcon
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".burger-icon")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <ToolbarContainer>
        <Logo href="/">Layer</Logo>
        <NavLinks>
          <NavLink href="/basics">Basics</NavLink>
          <NavLink href="/vscode">VSCode</NavLink>
          <NavLink href="/nextjs">Next.js</NavLink>
          <NavLink href="/styled-components">Styled Components</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/resources">Resources</NavLink>
          <NavLink href="/index-page">Index</NavLink>
        </NavLinks>
        <BurgerIcon className="burger-icon" $isOpen={isOpen} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </BurgerIcon>
      </ToolbarContainer>
      <MobileMenu ref={menuRef} $isOpen={isOpen}>
        <MobileNavLink href="/basics" onClick={toggleMenu}>
          Basics
        </MobileNavLink>
        <MobileNavLink href="/vscode" onClick={toggleMenu}>
          VSCode
        </MobileNavLink>
        <MobileNavLink href="/nextjs" onClick={toggleMenu}>
          Next.js
        </MobileNavLink>
        <MobileNavLink href="/styled-components" onClick={toggleMenu}>
          Styled Components
        </MobileNavLink>
        <MobileNavLink href="/projects" onClick={toggleMenu}>
          Projects
        </MobileNavLink>
        <MobileNavLink href="/resources" onClick={toggleMenu}>
          Resources
        </MobileNavLink>
        <MobileNavLink href="/index-page" onClick={toggleMenu}>
          Index
        </MobileNavLink>
      </MobileMenu>
    </>
  );
};

export default Toolbar;
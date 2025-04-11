// app/template/example/toolbarCode.ts
const toolbarCode = `# Toolbar Example
\`\`\`tsx
// src/components/Toolbar.tsx
"use client";

import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { theme } from "../lib/theme"; 

const ToolbarContainer = styled.nav\`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: \${theme.colors.backgroundDark};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
  min-height: 60px;
\`;

const Logo = styled(Link)\`
  font-size: 1.75rem;
  font-weight: 700;
  color: \${theme.colors.textDark};
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover {
    color: \${theme.colors.textLight};
  }
\`;

const NavLinks = styled.div\`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none; /* Hide tabs on smaller screens */
  }
\`;

const NavLink = styled(Link)\`
  font-size: 1.1rem;
  font-weight: 500;
  color: \${theme.colors.textDark};
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover {
    color: \${theme.colors.primary};
  }
\`;

const BurgerIcon = styled.div<{ $isOpen: boolean }>\`
  display: none; /* Hidden on larger screens */
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: flex; /* Show on smaller screens */
  }

  div {
    width: 25px;
    height: 3px;
    background-color: \${theme.colors.textDark};
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  \${({ $isOpen }) =>
    $isOpen &&
    \`
    div:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    div:nth-child(2) {
      opacity: 0;
    }
    div:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }
  \`}
\`;

const MobileMenu = styled.div<{ $isOpen: boolean }>\`
  display: \${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  background: \${theme.colors.backgroundContent};
  padding: 2rem 0;
  z-index: 999;
  transition: opacity 0.3s ease;

  @media (min-width: 769px) {
    display: none; /* Hide on larger screens */
  }
\`;

const MobileNavLink = styled(Link)\`
  font-size: 1.5rem;
  font-weight: 600;
  color: \${theme.colors.textDark};
  text-decoration: none;
  padding: 1rem;
  width: 100%;
  text-align: center;
  transition: color 0.3s ease;
  &:hover {
    color: \${theme.colors.primary};
  }
\`;

export default function Toolbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <ToolbarContainer>
        <Logo href="/">My App</Logo>
        <NavLinks>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/template">Guide</NavLink>
        </NavLinks>
        <BurgerIcon $isOpen={isOpen} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </BurgerIcon>
      </ToolbarContainer>
      <MobileMenu $isOpen={isOpen}>
        <MobileNavLink href="/" onClick={toggleMenu}>
          Home
        </MobileNavLink>
        <MobileNavLink href="/template" onClick={toggleMenu}>
          Guide
        </MobileNavLink>
      </MobileMenu>
    </>
  );
}
\`\`\`

### How It Works:
- A responsive toolbar with two tabs: "Home" and "Guide".
- On larger screens (>768px), tabs display inline next to the logo.
- On smaller screens (≤768px), tabs hide, and a burger icon toggles a mobile menu.
- Uses theme colors for consistency: dark background, light text, and primary accents.
- Smooth transitions for hover effects and menu toggle.
`;

export default toolbarCode;
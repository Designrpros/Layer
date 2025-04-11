// app/template/example/toolbarCode.ts
const toolbarCode = `# Toolbar Example
\`\`\`tsx
// app/template/components/Toolbar.tsx
"use client";

import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const Nav = styled.nav\`
  background: #1a202c;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
\`;

const NavContent = styled.div\`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
\`;

const Logo = styled(Link)\`
  color: #edf2f7;
  font-size: 2rem;
  font-weight: 800;
  text-decoration: none;
  &:hover { color: #a0aec0; }
\`;

const MenuButton = styled.button\`
  background: none;
  border: none;
  color: #edf2f7;
  font-size: 1.25rem;
  cursor: pointer;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
\`;

const Tabs = styled.div<{ isOpen: boolean }>\`
  display: flex;
  gap: 2rem;
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 250px;
    height: 100%;
    background: #2d3748;
    flex-direction: column;
    padding: 4rem 2rem;
    transform: translateX(\${({ isOpen }) => (isOpen ? "0" : "100%")});
    transition: transform 0.3s ease;
  }
\`;

const Tab = styled(Link)<{ active: boolean }>\`
  color: \${({ active }) => (active ? "#63b3ed" : "#e2e8f0")};
  font-size: 1.1rem;
  text-decoration: none;
  padding: 0.5rem 0;
  &:hover { color: #63b3ed; }
\`;

export default function Toolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <Nav>
      <NavContent>
        <Logo href="/">My App</Logo>
        <MenuButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </MenuButton>
        <Tabs isOpen={isOpen}>
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              href={tab.href}
              active={activeTab === tab.name}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </Tab>
          ))}
        </Tabs>
      </NavContent>
    </Nav>
  );
}
\`\`\`

### How It Works:
- Responsive sidebar for mobile with smooth slide-in animation.
- Logo links to home with bold styling.
- Tabs remain inline on desktop, collapse to sidebar on mobile.
`;
export default toolbarCode;
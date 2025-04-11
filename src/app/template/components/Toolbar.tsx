example: `# Toolbar Example
\`\`\`tsx
// app/template/components/Toolbar.tsx
"use client";

import { useState } from "react";
import styled from "styled-components";

const Nav = styled.nav\`
  background: #333;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
\`;

const Logo = styled.div\`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
\`;

const Toolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <Logo>My App</Logo>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Menu"}
      </button>
      {isOpen && (
        <div style={{ color: "white", marginTop: "1rem" }}>
          <p>Simple Menu</p>
        </div>
      )}
    </Nav>
  );
};

export default Toolbar;
\`\`\`
`
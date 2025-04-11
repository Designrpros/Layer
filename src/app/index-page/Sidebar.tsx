// src/app/index-page/Sidebar.tsx
"use client";

import styled from "styled-components";
import Link from "next/link";
import { theme } from "../../lib/theme"; // Adjusted to src/lib/theme

// === Styled Components ===
const SidebarContainer = styled.div`
  width: 200px;
  background: ${theme.colors.backgroundLight};
  padding: 5rem 1rem 1rem 1rem; /* Account for fixed toolbar if present */
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  border-right: 1px solid ${theme.colors.primary};
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.primary} ${theme.colors.backgroundLight};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.backgroundLight};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    display: none; /* Hide sidebar on mobile */
  }
`;

const SidebarTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin: 0 0 1rem 0;
  padding: 0 1rem;
  overflow-wrap: break-word;

  @media (max-width: 1024px) {
    font-size: 1.4rem;
    margin-bottom: 0.9rem;
  }
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const SidebarLink = styled(Link)`
  font-size: 1rem;
  color: ${theme.colors.textLight};
  text-decoration: none;
  padding: 0.5rem 1rem;
  display: block;
  border-radius: 4px;
  transition: background 0.3s ease;
  overflow-wrap: break-word;

  &:hover {
    background: ${theme.colors.backgroundContent};
    color: ${theme.colors.primary};
  }

  @media (max-width: 1024px) {
    font-size: 0.95rem;
    padding: 0.45rem 0.9rem;
  }
`;

// === Sidebar Component ===
const Sidebar: React.FC = () => {
  const sections = [
    { id: "welcome", title: "Welcome", route: "/index-page#welcome" },
    { id: "html-basics", title: "HTML Basics", route: "/basics#html-basics" },
    { id: "css-essentials", title: "CSS Essentials", route: "/basics#css-essentials" },
    { id: "js-intro", title: "JavaScript Intro", route: "/basics#js-intro" },
    { id: "vscode-setup", title: "VSCode Setup", route: "/vscode#vscode-setup" },
    { id: "nextjs-routing", title: "Next.js Routing", route: "/nextjs#nextjs-routing" },
    { id: "styled-components", title: "Styled Components", route: "/styled-components#styled-components" },
    { id: "responsive-design", title: "Responsive Design", route: "/index-page#responsive-design" },
    { id: "project-structure", title: "Project Structure", route: "/index-page#project-structure" },
    { id: "data-fetching", title: "Data Fetching", route: "/nextjs#data-fetching" },
    { id: "optimization", title: "Optimization", route: "/nextjs#optimization" },
    { id: "typescript", title: "TypeScript", route: "/nextjs#typescript" },
    { id: "debugging", title: "Debugging", route: "/vscode#debugging" },
    { id: "deployment", title: "Deployment", route: "/index-page#deployment" },
    { id: "projects", title: "Projects", route: "/projects" },
    { id: "guide", title: "Guide", route: "/template" },
  ];

  return (
    <SidebarContainer>
      <SidebarTitle>Navigation</SidebarTitle>
      <SidebarList>
        {sections.map((section) => (
          <SidebarListItem key={section.id}>
            <SidebarLink href={section.route}>{section.title}</SidebarLink>
          </SidebarListItem>
        ))}
      </SidebarList>
    </SidebarContainer>
  );
};

export default Sidebar;
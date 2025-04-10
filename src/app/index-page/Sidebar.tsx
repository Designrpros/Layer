import styled from "styled-components";
import Link from "next/link";

// === Theme ===
const theme = {
  colors: {
    backgroundLight: "#F7F4E9", // Beige background
    backgroundDark: "#2A2A2A", // Dark gray
    backgroundContent: "#E8E2D1", // Muted beige
    primary: "#1C2526", // Dark charcoal
    textLight: "#333333", // Dark gray text
    textDark: "#FFFFFF", // White text
  },
};

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
    { id: "welcome", title: "Welcome" },
    { id: "html-basics", title: "HTML Basics" },
    { id: "css-essentials", title: "CSS Essentials" },
    { id: "js-intro", title: "JavaScript Intro" },
    { id: "vscode-setup", title: "VSCode Setup" },
    { id: "nextjs-routing", title: "Next.js Routing" },
    { id: "styled-components", title: "Styled Components" },
    { id: "responsive-design", title: "Responsive Design" },
    { id: "project-structure", title: "Project Structure" },
    { id: "data-fetching", title: "Data Fetching" },
    { id: "optimization", title: "Optimization" },
    { id: "typescript", title: "TypeScript" },
    { id: "debugging", title: "Debugging" },
    { id: "deployment", title: "Deployment" },
  ];

  return (
    <SidebarContainer>
      <SidebarTitle>Navigation</SidebarTitle>
      <SidebarList>
        {sections.map((section) => (
          <SidebarListItem key={section.id}>
            <SidebarLink href={`#${section.id}`}>{section.title}</SidebarLink>
          </SidebarListItem>
        ))}
      </SidebarList>
    </SidebarContainer>
  );
};

export default Sidebar;
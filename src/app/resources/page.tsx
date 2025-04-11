"use client";

import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Toolbar from "../components/Toolbar";

// === Theme (Fully Light) ===
const theme = {
  colors: {
    background: "#F7F4E9",
    backgroundContent: "#E8E2D1",
    primary: "#1C2526",
    text: "#333333",
    textSecondary: "#666666",
  },
};

// === Styled Components ===
const ResourcesContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  padding: 5rem 2rem 2rem 2rem;
  font-family: "Montserrat", sans-serif;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  color: ${theme.colors.primary};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CategorySection = styled.div`
  margin-bottom: 2rem;
  border: 1px solid ${theme.colors.primary};
  border-radius: 8px;
  overflow: hidden;
`;

const CategoryHeader = styled.div`
  background: ${theme.colors.backgroundContent};
  padding: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background: ${theme.colors.background};
    color: ${theme.colors.primary};
  }
`;

const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  margin: 0;
  color: ${theme.colors.primary};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ToggleIcon = styled.span`
  font-size: 1.5rem;
  color: ${theme.colors.primary};
`;

const CategoryContent = styled.div<{ isOpen: boolean }>`
  padding: ${({ isOpen }) => (isOpen ? "1rem" : "0")};
  height: ${({ isOpen }) => (isOpen ? "auto" : "0")};
  overflow: hidden;
  background: ${theme.colors.background};
`;

const ResourceCard = styled.div`
  background: ${theme.colors.backgroundContent};
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  border: 1px solid ${theme.colors.primary};
`;

const ResourceTitle = styled.h3`
  font-size: 1.4rem;
  color: ${theme.colors.primary};
  margin: 0 0 0.5rem 0;
`;

const ResourceDescription = styled.div`
  font-size: 1rem;
  color: ${theme.colors.text};
  line-height: 1.5;
  margin: 0;
`;

const ResourceLink = styled.a`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
    color: ${theme.colors.text};
  }
`;

const HighlightedText = styled.span`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.background};
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-weight: 600;
`;

const ResourceText = styled.p`
  margin: 0.5rem 0;
`;

const ResourceList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
`;

const ResourceListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const ReferencesSection = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

const ReferencesTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${theme.colors.primary};

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ReferencesText = styled.p`
  font-size: 1rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.5;
  margin: 0;
`;

// === Main Component ===
export default function Resources() {
  const [openCategories, setOpenCategories] = useState<{ [key: number]: boolean }>({
    0: true, // First category open by default
  });

  const toggleCategory = (categoryIndex: number) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex],
    }));
  };

  // Define categories before usage
  const categories = [
    {
      title: "VSCode Resources",
      resources: [
        {
          title: "Awesome VSCode",
          link: "https://github.com/viatsko/awesome-vscode",
          description: (
            <>
              <ResourceText>
                A curated list of delightful VSCode extensions and resources.
              </ResourceText>
              <ResourceText>
                <HighlightedText>Best For:</HighlightedText> Developers looking to enhance their VSCode experience.
              </ResourceText>
              <ResourceList>
                <ResourceListItem>Find extensions like "Prettier" for code formatting.</ResourceListItem>
                <ResourceListItem>Discover "Live Server" for real-time HTML/CSS previews.</ResourceListItem>
                <ResourceListItem>Explore "GitLens" for advanced Git integration.</ResourceListItem>
              </ResourceList>
              <ResourceText>
                <HighlightedText>Practical Tip:</HighlightedText> Install "Prettier" from this list in VSCode, then format your Next.js code with Ctrl + Shift + P "Format Document".
              </ResourceText>
            </>
          ),
        },
        {
          title: "VSCode Official Documentation",
          link: "https://code.visualstudio.com/docs",
          description: (
            <>
              <ResourceText>
                The official guide to mastering VSCode’s features and workflows.
              </ResourceText>
              <ResourceText>
                <HighlightedText>Best For:</HighlightedText> Beginners and pros learning VSCode basics or advanced tools.
              </ResourceText>
              <ResourceList>
                <ResourceListItem>Learn shortcuts like Ctrl + D for multi-cursor editing.</ResourceListItem>
                <ResourceListItem>Set up debugging for your Next.js app.</ResourceListItem>
                <ResourceListItem>Customize settings for a tailored coding environment.</ResourceListItem>
              </ResourceList>
              <ResourceText>
                <HighlightedText>Practical Tip:</HighlightedText> Follow the debugging guide to set a breakpoint in your Next.js code and inspect variables.
              </ResourceText>
            </>
          ),
        },
      ],
    },
    {
      title: "Next.js Resources",
      resources: [
        {
          title: "Awesome Next.js",
          link: "https://github.com/unicodeveloper/awesome-nextjs",
          description: (
            <>
              <ResourceText>
                A comprehensive collection of Next.js resources, tutorials, and tools.
              </ResourceText>
              <ResourceText>
                <HighlightedText>Best For:</HighlightedText> Developers building modern web apps with Next.js.
              </ResourceText>
              <ResourceList>
                <ResourceListItem>Find tutorials like "Next.js Crash Course" for quick starts.</ResourceListItem>
                <ResourceListItem>Explore tools like "NextAuth.js" for authentication.</ResourceListItem>
                <ResourceListItem>Discover boilerplates for faster project setup.</ResourceListItem>
              </ResourceList>
              <ResourceText>
                <HighlightedText>Practical Tip:</HighlightedText> Use a boilerplate from this list in VSCode to kickstart a Next.js project with pre-configured Styled Components.
              </ResourceText>
            </>
          ),
        },
        {
          title: "Next.js Official Documentation",
          link: "https://nextjs.org/docs",
          description: (
            <>
              <ResourceText>
                The official Next.js docs covering setup, routing, data fetching, and more.
              </ResourceText>
              <ResourceText>
                <HighlightedText>Best For:</HighlightedText> Anyone learning or mastering Next.js features.
              </ResourceText>
              <ResourceList>
                <ResourceListItem>Learn file-based routing for pages like /about.</ResourceListItem>
                <ResourceListItem>Master getStaticProps for static site generation.</ResourceListItem>
                <ResourceListItem>Set up API routes for backend functionality.</ResourceListItem>
              </ResourceList>
              <ResourceText>
                <HighlightedText>Practical Tip:</HighlightedText> Follow the SSG guide to pre-render a blog page in your Next.js app using VSCode.
              </ResourceText>
            </>
          ),
        },
      ],
    },
    {
      title: "Styled Components Resources",
      resources: [
        {
          title: "Awesome Styled Components",
          link: "https://github.com/styled-components/awesome-styled-components",
          description: (
            <>
              <ResourceText>
                A curated list of resources, tools, and examples for Styled Components.
              </ResourceText>
              <ResourceText>
                <HighlightedText>Best For:</HighlightedText> Developers styling Next.js apps with CSS-in-JS.
              </ResourceText>
              <ResourceList>
                <ResourceListItem>Find examples like styled buttons and cards.</ResourceListItem>
                <ResourceListItem>Explore tools like "styled-breakpoints" for responsive design.</ResourceListItem>
                <ResourceListItem>Discover integrations with Next.js and TypeScript.</ResourceListItem>
              </ResourceList>
              <ResourceText>
                <HighlightedText>Practical Tip:</HighlightedText> Use a styled button example from this list in VSCode to quickly style a Next.js component.
              </ResourceText>
            </>
          ),
        },
        {
          title: "Styled Components Official Documentation",
          link: "https://styled-components.com/docs",
          description: (
            <>
              <ResourceText>
                The official guide to using Styled Components in your projects.
              </ResourceText>
              <ResourceText>
                <HighlightedText>Best For:</HighlightedText> Beginners and advanced users learning CSS-in-JS.
              </ResourceText>
              <ResourceList>
                <ResourceListItem>Learn to create basic styled components like styled.div.</ResourceListItem>
                <ResourceListItem>Master dynamic styling with props and theming.</ResourceListItem>
                <ResourceListItem>Set up animations with the keyframes helper.</ResourceListItem>
              </ResourceList>
              <ResourceText>
                <HighlightedText>Practical Tip:</HighlightedText> Follow the theming guide to create a theme in your Next.js app, then apply it in VSCode.
              </ResourceText>
            </>
          ),
        },
      ],
    },
    {
      title: "General Web Development Tools",
      resources: [
        {
          title: "MDN Web Docs",
          link: "https://developer.mozilla.org/en-US/",
          description: (
            <>
              <ResourceText>
                A comprehensive resource for HTML, CSS, and JavaScript documentation.
              </ResourceText>
              <ResourceText>
                <HighlightedText>Best For:</HighlightedText> All developers seeking reliable web dev references.
              </ResourceText>
              <ResourceList>
                <ResourceListItem>Learn HTML tags like &lt;div&gt; and &lt;section&gt;.</ResourceListItem>
                <ResourceListItem>Master CSS properties like flex and grid.</ResourceListItem>
                <ResourceListItem>Understand JavaScript APIs like fetch for data.</ResourceListItem>
              </ResourceList>
              <ResourceText>
                <HighlightedText>Practical Tip:</HighlightedText> Use MDN in VSCode’s browser to look up fetch syntax while building a Next.js API route.
              </ResourceText>
            </>
          ),
        },
        {
          title: "Can I Use",
          link: "https://caniuse.com/",
          description: (
            <>
              <ResourceText>
                A tool to check browser compatibility for HTML, CSS, and JavaScript features.
              </ResourceText>
              <ResourceText>
                <HighlightedText>Best For:</HighlightedText> Ensuring your web projects work across browsers.
              </ResourceText>
              <ResourceList>
                <ResourceListItem>Check support for CSS Grid in modern browsers.</ResourceListItem>
                <ResourceListItem>Verify JavaScript features like async/await.</ResourceListItem>
                <ResourceListItem>Plan fallbacks for older browsers in your Next.js app.</ResourceListItem>
              </ResourceList>
              <ResourceText>
                <HighlightedText>Practical Tip:</HighlightedText> Check fetch support on Can I Use, then test your Next.js app in VSCode’s Live Server across browsers.
              </ResourceText>
            </>
          ),
        },
        {
          title: "DevDocs",
          link: "https://devdocs.io/",
          description: (
            <>
              <ResourceText>
                An all-in-one API documentation browser for web development technologies.
              </ResourceText>
              <ResourceText>
                <HighlightedText>Best For:</HighlightedText> Quick access to docs for HTML, CSS, JS, and more.
              </ResourceText>
              <ResourceList>
                <ResourceListItem>Search Next.js API docs for getStaticProps.</ResourceListItem>
                <ResourceListItem>Look up Styled Components syntax like styled.div.</ResourceListItem>
                <ResourceListItem>Reference VSCode keybindings for faster coding.</ResourceListItem>
              </ResourceList>
              <ResourceText>
                <HighlightedText>Practical Tip:</HighlightedText> Keep DevDocs open in VSCode’s split view to reference Next.js docs while coding.
              </ResourceText>
            </>
          ),
        },
      ],
    },
  ];

  return (
    <ResourcesContainer>
      <Toolbar />
      <Title>Resources</Title>
      <IntroText>
        Explore a curated collection of tools, docs, and guides to supercharge your web development journey with VSCode, Next.js, and Styled Components.
      </IntroText>
      {categories.map((category, index) => (
        <CategorySection key={index}>
          <CategoryHeader onClick={() => toggleCategory(index)}>
            <CategoryTitle>{category.title}</CategoryTitle>
            <ToggleIcon>{openCategories[index] ? "−" : "+"}</ToggleIcon>
          </CategoryHeader>
          <CategoryContent isOpen={!!openCategories[index]}>
            {category.resources.map((resource, resourceIndex) => (
              <ResourceCard key={resourceIndex}>
                <ResourceTitle>
                  <ResourceLink href={resource.link} target="_blank" rel="noopener noreferrer">
                    {resource.title}
                  </ResourceLink>
                </ResourceTitle>
                <ResourceDescription>{resource.description}</ResourceDescription>
              </ResourceCard>
            ))}
          </CategoryContent>
        </CategorySection>
      ))}
      <ReferencesSection>
        <ReferencesTitle>References</ReferencesTitle>
        <ReferencesText>
          These resources are hand-picked to align with your learning path. Dive in and level up your skills!
        </ReferencesText>
      </ReferencesSection>
    </ResourcesContainer>
  );
}
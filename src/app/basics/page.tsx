"use client";

import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

// === Theme ===
const theme = {
  colors: {
    background: "#F7F4E9", // Light beige background
    textPrimary: "#333333", // Dark gray for primary text
    textSecondary: "#666666", // Medium gray for secondary text
    accent: "#1C2526", // Dark charcoal for accents
    cardBackground: "#E8E2D1", // Light content background
  },
};

// === Styled Components ===
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${theme.colors.background};
  color: ${theme.colors.textPrimary};
  font-family: "Montserrat", sans-serif;
`;

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 95vh;
  overflow: hidden;
  background: ${theme.colors.background}; /* Fallback */
`;

const HeroImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.9; /* Slightly less transparency for light theme */
`;

const HeroText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  background: rgba(255, 255, 255, 0.7); /* Light overlay for contrast */
  padding: 2rem;
  border-radius: 10px;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: ${theme.colors.textPrimary};
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); /* Softer shadow for light theme */
  margin: 0;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: ${theme.colors.textSecondary};
  margin-top: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* Subtle shadow */

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.accent};
  margin-bottom: 1rem;
  border-bottom: 2px solid ${theme.colors.accent};
  padding-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LargeText = styled.div`
  font-size: 1.25rem;
  color: ${theme.colors.textPrimary};
  line-height: 1.8;
  margin-bottom: 1.5rem;

  & > p {
    margin: 0;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// === TopicCard Component ===
const Card = styled.div<{ $isOpen: boolean }>`
  background: ${theme.colors.cardBackground};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.background}; /* Slightly lighter on hover */
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: ${theme.colors.accent};
`;

const CardDescription = styled.div<{ $isOpen: boolean }>`
  font-size: 1rem;
  color: ${theme.colors.textPrimary};
  line-height: 1.6;
  margin-top: ${({ $isOpen }) => ($isOpen ? "1rem" : "0")};
  max-height: ${({ $isOpen }) => ($isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;

  & > p {
    margin: 0;
  }
`;

const TopicCard: React.FC<{
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, description, isOpen, onToggle }) => {
  return (
    <Card $isOpen={isOpen} onClick={onToggle}>
      <CardTitle>{title}</CardTitle>
      <CardDescription $isOpen={isOpen}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1e1e1e",
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {description}
        </ReactMarkdown>
      </CardDescription>
    </Card>
  );
};

// === Main Component ===
export default function Basics() {
  const [openTopics, setOpenTopics] = useState<{ [key: number]: boolean }>({});

  const toggleTopic = (index: number) => {
    setOpenTopics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sections = [
    {
      title: "Web Fundamentals",
      topics: [
        {
          title: "HTML Basics",
          description:
            "HTML is the backbone of every webpage, structuring content with tags like `<div>`, `<p>`, and `<h1>`. In VSCode, use the Emmet abbreviation '!' to generate a basic HTML template and explore its structure. Here’s a simple example:\n\n```tsx\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello, Layer!</h1>\n</body>\n</html>\n```",
        },
        {
          title: "CSS Essentials",
          description:
            "CSS styles your HTML, controlling layout, colors, and fonts. Try adding this in VSCode to see a light theme in action:\n\n```tsx\nbody {\n  background: #F7F4E9;\n  color: #333333;\n  font-family: \"Montserrat\", sans-serif;\n}\n```",
        },
        {
          title: "JavaScript Intro",
          description:
            "JavaScript adds interactivity. In VSCode, write this in a `.js` file, then run it with Node.js or a browser console to see it work:\n\n```tsx\nconsole.log(\"Hello, Layer!\");\n```",
        },
      ],
    },
    {
      title: "VSCode Mastery",
      topics: [
        {
          title: "Setup & Shortcuts",
          description:
            "VSCode is your coding hub. Install extensions like 'Prettier' and learn shortcuts like this multi-cursor trick:\n\n```tsx\n// Press Ctrl + D (Windows) or Cmd + D (Mac) to select multiple instances\nlet name = \"Layer\";\nlet name = \"Layer\"; // Select 'name' and edit both at once\n```",
        },
        {
          title: "Live Server",
          description:
            "Use the 'Live Server' extension to preview HTML/CSS changes in real-time. Create this file in VSCode and right-click to 'Open with Live Server':\n\n```tsx\n<!DOCTYPE html>\n<html>\n<body>\n  <h1>Live Preview</h1>\n  <p>Watch me update live!</p>\n</body>\n</html>\n```",
        },
      ],
    },
    {
      title: "Next.js Foundations",
      largeText:
        "Next.js is a React framework that simplifies web development. It offers server-side rendering (SSR) for faster page loads and static site generation (SSG) for performance. Create a new Next.js project in VSCode with this command in the terminal:\n\n```tsx\nnpx create-next-app@latest my-layer-app\n```",
      topics: [
        {
          title: "Routing",
          description:
            "Next.js uses file-based routing. Add this file as `pages/about.tsx` in VSCode, then run `npm run dev` to see it at '/about':\n\n```tsx\nexport default function About() {\n  return <h1>About Layer</h1>;\n}\n```",
        },
        {
          title: "Components",
          description:
            "Components are reusable UI blocks. Create `components/Header.tsx` in VSCode, then import it into `pages/index.tsx`:\n\n```tsx\n// components/Header.tsx\nexport default function Header() {\n  return <header><h1>Layer</h1></header>;\n}\n\n// pages/index.tsx\nimport Header from \"../components/Header\";\nexport default function Home() {\n  return <div><Header /><p>Welcome!</p></div>;\n}\n```",
        },
      ],
    },
    {
      title: "Styled Components Basics",
      topics: [
        {
          title: "CSS-in-JS",
          description:
            "Styled Components lets you write CSS inside JavaScript. In VSCode, try this in a Next.js page:\n\n```tsx\nimport styled from \"styled-components\";\n\nconst Button = styled.button`\n  padding: 10px;\n  background: #1C2526;\n  color: #F7F4E9;\n`;\n\nexport default function Home() {\n  return <Button>Click Me</Button>;\n}\n```",
        },
        {
          title: "Dynamic Styling",
          description:
            "Pass props to Styled Components for dynamic styles. Add this in VSCode and toggle the 'primary' prop:\n\n```tsx\nimport styled from \"styled-components\";\n\nconst Button = styled.button<{ primary?: boolean }>`\n  padding: 10px;\n  background: ${props => props.primary ? '#1C2526' : '#E8E2D1'};\n  color: ${props => props.primary ? '#F7F4E9' : '#333333'};\n`;\n\nexport default function Home() {\n  return <Button primary>Primary Button</Button>;\n}\n```",
        },
      ],
    },
    {
      title: "Design Principles",
      largeText:
        "Good web design balances aesthetics and function. Layouts use grids or flexbox for structure—try this in CSS:\n\n```tsx\n.container {\n  display: flex;\n  justify-content: space-between;\n}\n```",
      topics: [
        {
          title: "Layout",
          description:
            "Layouts organize content. In VSCode, apply this to a container and see a two-column layout:\n\n```tsx\n.container {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n```",
        },
        {
          title: "Typography",
          description:
            "Typography enhances readability. Use this in VSCode to make text clear on a light background:\n\n```tsx\nh1 {\n  font-size: 1.5rem;\n  line-height: 1.6;\n  font-family: \"Montserrat\", sans-serif;\n  color: #333333;\n}\n```",
        },
      ],
    },
  ];

  return (
    <PageContainer>
      <HeroContainer>
        <HeroImage
          src="/basics-hero.png" // Replace with a web design-themed image
          alt="Basics Hero"
          layout="fill"
          priority
        />
        <HeroText>
          <HeroTitle>Basics</HeroTitle>
          <HeroSubtitle>The foundation of your web journey</HeroSubtitle>
        </HeroText>
      </HeroContainer>

      <ContentContainer>
        {sections.map((section, sectionIndex) => (
          <Section key={sectionIndex}>
            <SectionTitle>{section.title}</SectionTitle>
            {section.largeText && (
              <LargeText>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <SyntaxHighlighter
                          language={match[1]}
                          style={vscDarkPlus}
                          customStyle={{
                            marginTop: "1rem",
                            borderRadius: "4px",
                            padding: "1rem",
                            backgroundColor: "#1e1e1e",
                          }}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {section.largeText}
                </ReactMarkdown>
              </LargeText>
            )}
            {section.topics.map((topic, topicIndex) => {
              const globalIndex = sectionIndex * 100 + topicIndex; // Unique index
              return (
                <TopicCard
                  key={globalIndex}
                  title={topic.title}
                  description={topic.description}
                  isOpen={!!openTopics[globalIndex]}
                  onToggle={() => toggleTopic(globalIndex)}
                />
              );
            })}
          </Section>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}
"use client";

import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Image from "next/image";
import Toolbar from "../../components/Toolbar";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import Link from "next/link";

// === Theme ===
const theme = {
  colors: {
    backgroundLight: "#F7F4E9",
    backgroundDark: "#2A2A2A",
    backgroundContent: "#E8E2D1",
    primary: "#1C2526",
    textLight: "#333333",
    textDark: "#FFFFFF",
  },
};

// === Global Box Sizing Reset ===
const GlobalStyle = styled.div`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

// === Styled Components ===
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;
  background: ${theme.colors.backgroundLight};
  margin: 0;
`;

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 95vh;
  overflow: hidden;
`;

const HeroImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.8;

  @media (max-width: 1200px) {
    height: 90vh;
  }

  @media (max-width: 1024px) {
    height: 85vh;
  }

  @media (max-width: 768px) {
    object-fit: cover;
    height: 70vh;
  }

  @media (max-width: 600px) {
    height: 60vh;
  }

  @media (max-width: 400px) {
    height: 50vh;
  }

  @media (max-width: 320px) {
    height: 45vh;
  }
`;

const HeroText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 10px;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: ${theme.colors.textDark};
  margin: 0;

  @media (max-width: 1200px) {
    font-size: 3.8rem;
  }

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 600px) {
    font-size: 2rem;
  }

  @media (max-width: 400px) {
    font-size: 1.8rem;
  }

  @media (max-width: 320px) {
    font-size: 1.6rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: ${theme.colors.textDark};
  margin-top: 1rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);

  @media (max-width: 1200px) {
    font-size: 1.4rem;
    margin-top: 0.9rem;
  }

  @media (max-width: 1024px) {
    font-size: 1.35rem;
    margin-top: 0.85rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-top: 0.8rem;
  }

  @media (max-width: 600px) {
    font-size: 1.1rem;
    margin-top: 0.7rem;
  }

  @media (max-width: 400px) {
    font-size: 1rem;
    margin-top: 0.6rem;
  }

  @media (max-width: 320px) {
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  max-width: 100%; /* Prevent overflow */

  @media (max-width: 1200px) {
    max-width: 1000px;
    padding: 1.8rem;
  }

  @media (max-width: 1024px) {
    max-width: 900px;
    padding: 1.6rem;
  }

  @media (max-width: 768px) {
    max-width: 700px;
    padding: 1.4rem;
  }

  @media (max-width: 600px) {
    max-width: 90%;
    padding: 1.2rem;
  }

  @media (max-width: 400px) {
    max-width: 95%;
    padding: 1rem;
  }

  @media (max-width: 320px) {
    padding: 0.8rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;

  @media (max-width: 1200px) {
    margin-bottom: 2.8rem;
  }

  @media (max-width: 1024px) {
    margin-bottom: 2.6rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 2.4rem;
  }

  @media (max-width: 600px) {
    margin-bottom: 2rem;
  }

  @media (max-width: 400px) {
    margin-bottom: 1.8rem;
  }

  @media (max-width: 320px) {
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: 1rem;
  border-bottom: 2px solid ${theme.colors.primary};
  padding-bottom: 0.5rem;
  overflow-wrap: break-word;

  @media (max-width: 1200px) {
    font-size: 2.4rem;
    margin-bottom: 0.9rem;
    padding-bottom: 0.45rem;
  }

  @media (max-width: 1024px) {
    font-size: 2.3rem;
    margin-bottom: 0.85rem;
    padding-bottom: 0.4rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.8rem;
    padding-bottom: 0.35rem;
  }

  @media (max-width: 600px) {
    font-size: 1.8rem;
    margin-bottom: 0.7rem;
    padding-bottom: 0.3rem;
  }

  @media (max-width: 400px) {
    font-size: 1.5rem;
    margin-bottom: 0.6rem;
    padding-bottom: 0.25rem;
  }

  @media (max-width: 320px) {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.2rem;
  }
`;

const LargeText = styled.div`
  font-size: 1.25rem;
  color: ${theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: 1.5rem;
  max-width: 100%;
  overflow-wrap: break-word;

  & > p {
    margin: 0;
  }

  @media (max-width: 1200px) {
    font-size: 1.2rem;
    line-height: 1.75;
    margin-bottom: 1.4rem;
  }

  @media (max-width: 1024px) {
    font-size: 1.15rem;
    line-height: 1.7;
    margin-bottom: 1.3rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.65;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  @media (max-width: 400px) {
    font-size: 0.95rem;
    line-height: 1.55;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 320px) {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 0.6rem;
  }
`;

// === TopicCard Component ===
const Card = styled.div<{ $isOpen: boolean }>`
  background: ${theme.colors.backgroundContent};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.backgroundLight};
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: ${theme.colors.primary};
`;

const CardContent = styled.div<{ $isOpen: boolean }>`
  font-size: 1rem;
  color: ${theme.colors.textLight};
  line-height: 1.6;
  margin-top: ${({ $isOpen }) => ($isOpen ? "1rem" : "0")};
  max-height: ${({ $isOpen }) => ($isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;

  & > p {
    margin: 0;
  }
`;

const CardField = styled.div`
  margin-bottom: 0.5rem;
`;

const FieldLabel = styled.span`
  font-weight: 600;
  color: ${theme.colors.primary};
`;

const DiveDeeperButton = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: ${theme.colors.primary};
  color: ${theme.colors.textDark};
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: ${theme.colors.backgroundDark};
  }
`;

const TopicCard: React.FC<{
  title: string;
  purpose: string;
  useCase: string;
  example: string;
  proTip: string;
  subpage?: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, purpose, useCase, example, proTip, subpage, isOpen, onToggle }) => {
  return (
    <Card $isOpen={isOpen} onClick={onToggle}>
      <CardTitle>{title}</CardTitle>
      <CardContent $isOpen={isOpen}>
        <CardField>
          <FieldLabel>Purpose:</FieldLabel>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{purpose}</ReactMarkdown>
        </CardField>
        <CardField>
          <FieldLabel>Use Case:</FieldLabel>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{useCase}</ReactMarkdown>
        </CardField>
        <CardField>
          <FieldLabel>Example:</FieldLabel>
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
            {example}
          </ReactMarkdown>
        </CardField>
        <CardField>
          <FieldLabel>Pro Tip:</FieldLabel>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{proTip}</ReactMarkdown>
        </CardField>
        {subpage && (
          <DiveDeeperButton href={subpage}>Dive Deeper</DiveDeeperButton>
        )}
      </CardContent>
    </Card>
  );
};

// === Main Component ===
const StyledComponents: React.FC = () => {
  const [openTopics, setOpenTopics] = useState<{ [key: number]: boolean }>({});

  const toggleTopic = (index: number) => {
    setOpenTopics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sections = [
    {
      title: "Styled Components Essentials",
      topics: [
        {
          title: "Getting Started",
          purpose:
            "Set up Styled Components in your Next.js project to write CSS-in-JS with ease.",
          useCase:
            "Use this when starting a project or adding Styled Components to an existing Next.js app for scoped styling.",
          example:
            "Install Styled Components and create a basic styled button:\n\n```tsx\nnpm install styled-components\n// pages/index.tsx\nimport styled from 'styled-components';\n\nconst Button = styled.button`\n  padding: 10px 20px;\n  background: #1C2526;\n  color: #fff;\n`;\n\nexport default function Home() {\n  return <Button>Click Me</Button>;\n}\n```",
          proTip:
            "Add `babel-plugin-styled-components` to your `.babelrc` for better debugging with display names.",
          subpage: "/styled-components/getting-started",
        },
      ],
    },
    {
      title: "Core Features",
      largeText:
        "Styled Components offers scoped styles, dynamic props, and theming. Scoped styles keep CSS local to components, props allow runtime changes, and theming centralizes your design system.",
      topics: [
        {
          title: "Scoped Styles",
          purpose:
            "Write CSS that’s automatically scoped to a component, avoiding global namespace conflicts.",
          useCase:
            "Ideal for reusable components like buttons or cards that need isolated styles.",
          example:
            "Create a styled div with unique styles:\n\n```tsx\nimport styled from 'styled-components';\n\nconst Card = styled.div`\n  padding: 20px;\n  background: #E8E2D1;\n  border-radius: 8px;\n`;\n\nexport default function Home() {\n  return <Card>My Card</Card>;\n}\n```",
          proTip:
            "Use the VSCode Styled Components extension for syntax highlighting and IntelliSense.",
          subpage: "/styled-components/scoped-styles",
        },
        {
          title: "Dynamic Props",
          purpose:
            "Pass props to styled components to change styles dynamically based on state or conditions.",
          useCase:
            "Use this for interactive UI elements like buttons that change color when active.",
          example:
            "Make a button that changes based on a prop:\n\n```tsx\nimport styled from 'styled-components';\n\nconst Button = styled.button<{ active?: boolean }>`\n  padding: 10px;\n  background: ${props => (props.active ? '#1C2526' : '#ccc')};\n  color: ${props => (props.active ? '#fff' : '#000')};\n`;\n\nexport default function Home() {\n  return <Button active>Active Button</Button>;\n}\n```",
          proTip:
            "Combine props with TypeScript for type-safe dynamic styling—add `{ active?: boolean }`.",
          subpage: undefined,
        },
        {
          title: "Theming",
          purpose:
            "Centralize your design system with a theme object accessible to all styled components.",
          useCase:
            "Perfect for maintaining consistent colors, fonts, or sizes across your app.",
          example:
            "Set up theming in Next.js:\n\n```tsx\n// components/ThemeProvider.tsx\nimport { ThemeProvider } from 'styled-components';\n\nconst theme = { colors: { primary: '#1C2526', text: '#333' } };\n\nexport default function App({ children }) {\n  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;\n}\n\n// pages/index.tsx\nimport styled from 'styled-components';\n\nconst Title = styled.h1`\n  color: ${props => props.theme.colors.primary};\n`;\n\nexport default function Home() {\n  return <Title>Hello</Title>;\n}\n```",
          proTip:
            "Wrap your app in `_app.tsx` with the `ThemeProvider` to make the theme globally available.",
          subpage: undefined,
        },
      ],
    },
    {
      title: "Advanced Techniques",
      topics: [
        {
          title: "Extending Styles",
          purpose:
            "Extend existing styled components to create variations without rewriting CSS.",
          useCase:
            "Use this for creating button variants or modifying base components efficiently.",
          example:
            "Extend a base button:\n\n```tsx\nimport styled from 'styled-components';\n\nconst Button = styled.button`\n  padding: 10px;\n  background: #1C2526;\n  color: #fff;\n`;\n\nconst LargeButton = styled(Button)`\n  padding: 15px 30px;\n  font-size: 1.2rem;\n`;\n\nexport default function Home() {\n  return <LargeButton>Big Button</LargeButton>;\n}\n```",
          proTip:
            "Use `as` prop to render a styled component as a different HTML element (e.g., `<Button as=\"a\">`).",
          subpage: "/styled-components/extending",
        },
        {
          title: "Keyframes",
          purpose:
            "Add animations to your components using the `keyframes` helper for dynamic effects.",
          useCase:
            "Great for hover effects, loading spinners, or transitions in your UI.",
          example:
            "Create a fade-in animation:\n\n```tsx\nimport styled, { keyframes } from 'styled-components';\n\nconst fadeIn = keyframes`\n  from { opacity: 0; }\n  to { opacity: 1; }\n`;\n\nconst Box = styled.div`\n  animation: ${fadeIn} 1s ease-in;\n  background: #E8E2D1;\n  padding: 20px;\n`;\n\nexport default function Home() {\n  return <Box>Fading Box</Box>;\n}\n```",
          proTip:
            "Reuse `keyframes` across components by defining them outside the styled definition.",
          subpage: undefined,
        },
      ],
    },
    {
      title: "Workflow Enhancements",
      largeText:
        "Styled Components integrates seamlessly with Next.js and VSCode. Use global styles for resets or utilities, and leverage TypeScript for type-safe styling across your app.",
      topics: [
        {
          title: "Global Styles",
          purpose:
            "Apply global CSS rules like resets or base styles using `createGlobalStyle`.",
          useCase:
            "Use this for setting default fonts, margins, or box-sizing across your entire app.",
          example:
            "Add global styles in Next.js:\n\n```tsx\n// components/GlobalStyles.tsx\nimport { createGlobalStyle } from 'styled-components';\n\nconst GlobalStyles = createGlobalStyle`\n  * {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n  }\n  body {\n    font-family: 'Montserrat', sans-serif;\n  }\n`;\n\nexport default function App({ children }) {\n  return <><GlobalStyles />{children}</>;\n}\n```",
          proTip:
            "Include `GlobalStyles` in `_app.tsx` to ensure it applies to all pages.",
          subpage: undefined,
        },
        {
          title: "TypeScript Support",
          purpose:
            "Enhance Styled Components with TypeScript for better prop typing and theme access.",
          useCase:
            "Use this in larger projects to catch styling errors during development.",
          example:
            "Type a styled component with props and theme:\n\n```tsx\n// types/styled.d.ts\ndeclare module 'styled-components' {\n  export interface DefaultTheme {\n    colors: { primary: string; text: string };\n  }\n}\n\n// pages/index.tsx\nimport styled from 'styled-components';\n\nconst Button = styled.button<{ active?: boolean }>`\n  background: ${props => props.active ? props.theme.colors.primary : '#ccc'};\n  color: ${props => props.theme.colors.text};\n`;\n\nexport default function Home() {\n  return <Button active>Typed Button</Button>;\n}\n```",
          proTip:
            "Add a `styled.d.ts` file to define your theme interface for IntelliSense in VSCode.",
          subpage: "/styled-components/typescript",
        },
      ],
    },
  ];

  return (
    <GlobalStyle>
      <ThemeProvider theme={theme}>
        <PageContainer>
          <Toolbar />
          <HeroContainer>
            <HeroImage
              src="/styled-components.svg" // Replace with a Styled Components-themed hero image
              alt="Styled Components Hero"
              layout="fill"
              priority
            />
            <HeroText>
              <HeroTitle>Styled Components</HeroTitle>
              <HeroSubtitle>Your CSS-in-JS solution</HeroSubtitle>
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
                  const globalIndex = sectionIndex * 100 + topicIndex;
                  return (
                    <TopicCard
                      key={globalIndex}
                      title={topic.title}
                      purpose={topic.purpose}
                      useCase={topic.useCase}
                      example={topic.example}
                      proTip={topic.proTip}
                      subpage={topic.subpage}
                      isOpen={!!openTopics[globalIndex]}
                      onToggle={() => toggleTopic(globalIndex)}
                    />
                  );
                })}
              </Section>
            ))}
          </ContentContainer>
        </PageContainer>
      </ThemeProvider>
    </GlobalStyle>
  );
};

export default StyledComponents;
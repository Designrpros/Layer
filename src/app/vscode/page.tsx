// src/app/vscode/page.tsx
"use client";

import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Image from "next/image";
import Toolbar from "../../components/Toolbar"; // Adjusted to src/components/Toolbar
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { theme } from "../../lib/theme"; // Adjusted to src/lib/theme

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
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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
export default function VSCode() {
  const [openTopics, setOpenTopics] = useState<{ [key: number]: boolean }>({});

  const toggleTopic = (index: number) => {
    setOpenTopics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sections = [
    {
      title: "VSCode Essentials",
      topics: [
        {
          title: "Getting Started",
          purpose:
            "Set up VSCode as your primary development environment for web design and development.",
          useCase:
            "Use this when you’re new to VSCode or need a refresher on installing and configuring it for Next.js and Styled Components projects.",
          example:
            "Download VSCode from the official site, then install it. Open a terminal in VSCode and initialize a Next.js project:\n\n```tsx\nnpx create-next-app@latest my-vscode-app\ncd my-vscode-app\ncode .\n```",
          proTip:
            "Use the 'code .' command in your terminal to open VSCode directly in your project folder.",
          subpage: "/vscode/getting-started",
        },
      ],
    },
    {
      title: "Core Features",
      largeText:
        "VSCode’s core features like the integrated terminal, extensions, and IntelliSense make it a powerhouse for coding. The terminal lets you run commands without leaving the editor, extensions add functionality, and IntelliSense provides smart code completion.",
      topics: [
        {
          title: "Integrated Terminal",
          purpose:
            "Run commands like `npm install` or `git commit` directly within VSCode, streamlining your workflow.",
          useCase:
            "Perfect for managing dependencies or running your Next.js dev server without switching to an external terminal.",
          example:
            "Open the terminal (Ctrl + `) and start your Next.js app:\n\n```tsx\nnpm run dev\n```",
          proTip:
            "Split the terminal into multiple panes with the '+' button to run multiple commands simultaneously.",
          subpage: undefined,
        },
        {
          title: "Extensions",
          purpose:
            "Enhance VSCode with extensions tailored for web development, like Prettier, ESLint, and Live Server.",
          useCase:
            "Use extensions to format code, catch errors, or preview your site live as you code.",
          example:
            "Install the Prettier extension, then format a file:\n\n```tsx\n// Before\nlet x=1,y=2;\n// After (Ctrl + Shift + P > Format Document)\nlet x = 1;\nlet y = 2;\n```",
          proTip:
            "Search for 'Next.js' in the Extensions Marketplace to find tools like 'Next.js Snippets' for faster coding.",
          subpage: "/vscode/extensions",
        },
        {
          title: "IntelliSense",
          purpose:
            "Get real-time code suggestions and auto-completion to speed up coding and reduce errors.",
          useCase:
            "Ideal for writing React components, Styled Components, or JavaScript/TypeScript code with less typing.",
          example:
            "Type 'div' in a JSX file and press Tab to see IntelliSense expand it:\n\n```tsx\n<div></div>\n```",
          proTip:
            "Enable 'Emmet: Trigger Expansion on Tab' in settings for even faster HTML/CSS shortcuts.",
          subpage: undefined,
        },
      ],
    },
    {
      title: "Advanced Tools",
      topics: [
        {
          title: "Debugging",
          purpose:
            "Use VSCode’s built-in debugger to step through code, set breakpoints, and inspect variables.",
          useCase:
            "Great for troubleshooting JavaScript or Next.js apps when something isn’t working as expected.",
          example:
            "Add a breakpoint by clicking left of a line number, then start debugging:\n\n```tsx\n// app/page.tsx\n'use client';\n\nexport default function Home() {\n  let count = 0;\n  console.log(count); // Breakpoint here\n  return <div>Hello</div>;\n}\n```",
          proTip:
            "Press F5 to start debugging and F10 to step over code—watch the Variables panel for live updates.",
          subpage: "/vscode/debugging",
        },
        {
          title: "Version Control",
          purpose:
            "Manage Git repositories directly in VSCode to track changes, commit, and push code.",
          useCase:
            "Use this for collaborating on projects or maintaining version history in your Next.js app.",
          example:
            "Initialize a Git repo and commit:\n\n```tsx\ngit init\ngit add .\ngit commit -m \"Initial commit\"\n```",
          proTip:
            "Use the Source Control view (Ctrl + Shift + G) to stage and commit changes with a GUI.",
          subpage: undefined,
        },
      ],
    },
    {
      title: "Workflow Enhancements",
      largeText:
        "Boost your productivity with multi-cursor editing, snippets, and settings customization. Multi-cursor lets you edit multiple lines at once, snippets save time on repetitive code, and custom settings tailor VSCode to your needs.",
      topics: [
        {
          title: "Multi-Cursor Editing",
          purpose:
            "Edit multiple lines or instances of text simultaneously to speed up repetitive tasks.",
          useCase:
            "Perfect for renaming variables or adding props across multiple components in a Next.js project.",
          example:
            "Hold Alt and click to add cursors, then type:\n\n```tsx\n// Before\nlet x = 1;\nlet y = 1;\n// After (Alt + Click on each '1')\nlet x = 2;\nlet y = 2;\n```",
          proTip:
            "Use Ctrl + D (Cmd + D on Mac) to select the next occurrence of a word and edit all at once.",
          subpage: undefined,
        },
        {
          title: "Snippets",
          purpose:
            "Create or use pre-built code snippets to insert common code patterns quickly.",
          useCase:
            "Ideal for boilerplate code like React components or Styled Components definitions.",
          example:
            "Type 'rfc' with the React snippets extension and press Tab:\n\n```tsx\n'use client';\n\nexport default function Component() {\n  return <div></div>;\n}\n```",
          proTip:
            "Create custom snippets in VSCode settings under 'Configure User Snippets' for your frequent code blocks.",
          subpage: "/vscode/snippets",
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
              src="/visual-studio-code.svg" // Replace with a VSCode-themed hero image
              alt="VSCode Hero"
              fill
              priority
            />
            <HeroText>
              <HeroTitle>VSCode</HeroTitle>
              <HeroSubtitle>Your ultimate web dev editor</HeroSubtitle>
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
}
// app/template/page.tsx
"use client";

import React from "react";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { theme } from "./lib/theme";
import {
  PageContainer,
  HeroContainer,
  HeroImage,
  HeroText,
  HeroTitle,
  HeroSubtitle,
  ContentContainer,
} from "./lib/styles";
import Section from "./components/Section";
import CodeBlock from "./components/CodeBlock";
import apiRoutesCode from "./example/APIRoutesCode";
import dynamicRoutesCode from "./example/DynamicRoutesCode";
import gettingStartedCode from "./example/GettingStartedCode";
import imageOptCode from "./example/ImageOptCode";
import layoutCode from "./example/layoutCode";
import routingCode from "./example/RoutingCode";
import ssgCode from "./example/SSGCode";
import ssrCode from "./example/SSRCode";
import templatePageCode from "./example/templatePageCode";
import toolbarCode from "./example/toolbarCode";
import typeScriptCode from "./example/TypeScriptCode";

// === TopicCard Component ===
// (No changes to existing styled components or TopicCard)

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
  max-height: ${({ $isOpen }) => ($isOpen ? "none" : "0")};
  overflow: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: margin-top 0.3s ease, max-height 0.3s ease;
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

const TopicCard: React.FC<{
  title: string;
  purpose: string;
  useCase: string;
  example: string | React.ReactNode | React.ComponentType;
  proTip: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, purpose, useCase, example, proTip, isOpen, onToggle }) => {
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
          {typeof example === "string" ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <CodeBlock
                      language={match[1]}
                      code={String(children).replace(/\n$/, "")}
                    />
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
          ) : typeof example === "function" ? (
            <div
              style={{
                marginTop: "1rem",
                borderRadius: "4px",
                padding: "1rem",
                backgroundColor: "#1e1e1e",
              }}
            >
              {React.createElement(example)}
            </div>
          ) : (
            <div
              style={{
                marginTop: "1rem",
                borderRadius: "4px",
                padding: "1rem",
                backgroundColor: "#1e1e1e",
              }}
            >
              {example}
            </div>
          )}
        </CardField>
        <CardField>
          <FieldLabel>Pro Tip:</FieldLabel>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{proTip}</ReactMarkdown>
        </CardField>
      </CardContent>
    </Card>
  );
};

// === Main Component ===
export default function TemplatePage() {
  const [openTopics, setOpenTopics] = useState<{ [key: number]: boolean }>({});

  const toggleTopic = (index: number) => {
    setOpenTopics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sections = [
    {
      title: "Project Setup",
      topics: [
        {
          title: "Setting Up Your Next.js Project",
          purpose:
            "Guide you through creating a Next.js project with TypeScript and Styled Components from scratch.",
          useCase:
            "Use these steps to replicate this template locally and start building your own application.",
          example: `# Project Setup Steps

### 1. Open VSCode and Terminal
- Launch Visual Studio Code.
- Open the terminal: \`View > Terminal\` or \`Ctrl + \`\` (backtick)\`.

### 2. Create a New Next.js Project
- Navigate to your desired directory (e.g., \`cd ~/projects\`).
- Run:
  \`\`\`bash
  npx create-next-app@latest next-styled-template --typescript --eslint --app --src-dir --no-tailwind --no-experimental-app
  \`\`\`
- **Prompts**:
  - Project name: \`next-styled-template\` (or press Enter).
  - TypeScript: Yes.
  - ESLint: Yes.
  - Tailwind CSS: No (we’ll use Styled Components).
  - \`src/\` directory: Yes.
  - App Router: Yes.
  - Customize import alias: No.

### 3. Navigate to Project Directory
\`\`\`bash
cd next-styled-template
\`\`\`

### 4. Install Dependencies
- Install Styled Components and types:
  \`\`\`bash
  npm install styled-components @types/styled-components
  \`\`\`
- Install additional dependencies for this template:
  \`\`\`bash
  npm install react-markdown remark-gfm react-syntax-highlighter
  \`\`\`

### 5. Update \`next.config.ts\`
- Replace \`next.config.ts\` with:
  \`\`\`ts
  // next.config.ts
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    compiler: {
      styledComponents: true,
    },
  };

  export default nextConfig;
  \`\`\`

### 6. Initial File Structure
\`\`\`
next-styled-template/
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── next.svg
│   └── vercel.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── favicon.ico
│   └── components/
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package.json
├── README.md
├── tsconfig.json
\`\`\`

### 7. Add Styled Components Support Files
- **Theme File**: Create \`src/app/template/lib/theme.ts\`:
  \`\`\`ts
  // src/app/template/lib/theme.ts
  export const theme = {
    colors: {
      primary: "#0070f3",
      textDark: "#ffffff",
      textLight: "#a0aec0",
      backgroundContent: "#2d3748",
      backgroundLight: "#4a5568",
      backgroundDark: "#1a202c",
    },
  };
  \`\`\`
- **Styles File**: Create \`src/app/template/lib/styles.ts\`:
  \`\`\`ts
  // src/app/template/lib/styles.ts
  import styled from "styled-components";
  import Image from "next/image";

  export const PageContainer = styled.div\`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  \`;

  export const HeroContainer = styled.div\`
    position: relative;
    height: 50vh;
    width: 100%;
  \`;

  export const HeroImage = styled(Image)\`
    object-fit: cover;
    width: 100%;
    height: 100%;
  \`;

  export const HeroText = styled.div\`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
  \`;

  export const HeroTitle = styled.h1\`
    font-size: 3rem;
    margin: 0;
  \`;

  export const HeroSubtitle = styled.h2\`
    font-size: 1.5rem;
    margin: 0;
  \`;

  export const ContentContainer = styled.div\`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  \`;
  \`\`\`
- **Custom Document (Optional)**: Create \`src/app/_document.tsx\`:
  \`\`\`tsx
  // src/app/_document.tsx
  import Document, { Html, Head, Main, NextScript } from "next/document";

  class MyDocument extends Document {
    render() {
      return (
        <Html lang="en">
          <Head />
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
  }

  export default MyDocument;
  \`\`\`
- **Styled Components Registry**: Create \`src/components/styled-components-registry.tsx\`:
  \`\`\`tsx
  // src/components/styled-components-registry.tsx
  "use client";

  import React, { useState } from "react";
  import { useServerInsertedHTML } from "next/navigation";
  import { ServerStyleSheet, StyleSheetManager } from "styled-components";

  export default function StyledComponentsRegistry({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
      const styles = styledComponentsStyleSheet.getStyleElement();
      styledComponentsStyleSheet.instance.clearTag();
      return <>{styles}</>;
    });

    if (typeof window !== "undefined") return <>{children}</>;

    return (
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
        {children}
      </StyleSheetManager>
    );
  }
  \`\`\`

### 8. Test Your Project
- Run the development server:
  \`\`\`bash
  npm run dev
  \`\`\`
- Open \`http://localhost:3000\` to verify the setup.
`,
          proTip:
            "Run `npm run dev` after each major change to test your setup in real-time.",
        },
      ],
    },
    {
      title: "Next.js Template Essentials",
      topics: [
        {
          title: "Getting Started",
          purpose:
            "Set up a basic Next.js page with Styled Components to kick off your project.",
          useCase:
            "Use this as your starting point for any Next.js application with a clean, styled layout.",
          example: gettingStartedCode,
          proTip:
            "Keep your initial page simple to build momentum—add complexity as needed.",
        },
      ],
    },
    {
      title: "Core Structure",
      largeText:
        "The core files include a minimal layout, a toolbar for navigation, and this guide page. These provide the foundation for your Next.js app with App Router support.",
      topics: [
        {
          title: "Root Layout",
          purpose:
            "Define the basic HTML structure and include a toolbar for all pages.",
          useCase:
            "Use this to set up global styles and navigation across your app.",
          example: layoutCode,
          proTip:
            "Keep global styles minimal in `layout.tsx` and let pages handle specific styling.",
        },
        {
          title: "Toolbar",
          purpose:
            "Provide a simple navigation bar with a toggleable menu for your app.",
          useCase:
            "Ideal for adding consistent navigation without much overhead.",
          example: toolbarCode, // Updated version with tabs and logo link
          proTip:
            "Customize the toolbar’s colors in `theme.ts` to match your brand.",
        },
        {
          title: "Guide Page",
          purpose:
            "Serve as the entry point to explore and learn about your template.",
          useCase:
            "Use this page to document your project setup and showcase examples.",
          example: templatePageCode,
          proTip:
            "Keep this page updated as you add more features to your template.",
        },
      ],
    },
    {
      title: "Template Examples",
      largeText:
        "These examples demonstrate common Next.js features with Styled Components, from routing to optimization, giving you a head start on typical use cases.",
      topics: [
        {
          title: "File-Based Routing",
          purpose:
            "Showcase Next.js’s automatic routing based on file structure.",
          useCase:
            "Use this for simple static pages like About or Contact.",
          example: routingCode,
          proTip:
            "Name files intuitively to reflect their route (e.g., `about.tsx` for `/about`).",
        },
        {
          title: "Server-Side Rendering (SSR)",
          purpose:
            "Render pages on the server for dynamic, SEO-friendly content.",
          useCase:
            "Perfect for pages needing fresh data, like a dashboard or news feed.",
          example: ssrCode,
          proTip:
            "Keep SSR logic lightweight to avoid performance bottlenecks.",
        },
        {
          title: "Static Site Generation (SSG)",
          purpose:
            "Pre-render pages at build time for fast, static content delivery.",
          useCase:
            "Use this for blogs, docs, or landing pages that don’t change often.",
          example: ssgCode,
          proTip:
            "Add `revalidate` in `getStaticProps` for incremental static regeneration.",
        },
        {
          title: "API Routes",
          purpose:
            "Create simple API endpoints within your Next.js app.",
          useCase:
            "Great for form submissions or fetching data without a separate backend.",
          example: apiRoutesCode,
          proTip:
            "Test endpoints locally at `http://localhost:3000/api/...` during development.",
        },
        {
          title: "Dynamic Routes",
          purpose:
            "Handle variable URLs like `/post/[id]` with dynamic routing.",
          useCase:
            "Use this for blog posts, product pages, or any parameterized content.",
          example: dynamicRoutesCode,
          proTip:
            "Combine with `getStaticPaths` for pre-rendered dynamic pages.",
        },
        {
          title: "Image Optimization",
          purpose:
            "Optimize images with Next.js’s `<Image>` component for better performance.",
          useCase:
            "Ideal for image-heavy pages like galleries or portfolios.",
          example: imageOptCode,
          proTip:
            "Set `priority` on above-the-fold images to load them first.",
        },
        {
          title: "TypeScript Integration",
          purpose:
            "Add type safety to your Next.js app with TypeScript.",
          useCase:
            "Use this for larger projects or teams to catch errors early.",
          example: typeScriptCode,
          proTip:
            "Leverage VSCode’s IntelliSense with TypeScript for faster coding.",
        },
      ],
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        <HeroContainer>
          <HeroImage
            src="/template.png"
            alt="Template Hero"
            fill
            priority
          />
          <HeroText>
            <HeroTitle>Template Guide</HeroTitle>
            <HeroSubtitle>A Next.js Starter with Styled Components</HeroSubtitle>
          </HeroText>
        </HeroContainer>

        <ContentContainer>
          {sections.map((section, sectionIndex) => (
            <Section key={sectionIndex} title={section.title}>
              {section.largeText && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <CodeBlock
                          language={match[1]}
                          code={String(children).replace(/\n$/, "")}
                        />
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
  );
}
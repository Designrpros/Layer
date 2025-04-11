// src/app/nextjs/page.tsx
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
  background: ${theme.colors.backgroundLight}; // Uses #F7F4E9
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
  color: ${theme.colors.textDark}; // Uses #FFFFFF
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
  color: ${theme.colors.textDark}; // Uses #FFFFFF
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
  color: ${theme.colors.primary}; // Uses #1C2526
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
  color: ${theme.colors.textLight}; // Uses #333333
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
  background: ${theme.colors.backgroundContent}; // Uses #E8E2D1
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.backgroundLight}; // Uses #F7F4E9
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: ${theme.colors.primary}; // Uses #1C2526
`;

const CardContent = styled.div<{ $isOpen: boolean }>`
  font-size: 1rem;
  color: ${theme.colors.textLight}; // Uses #333333
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
  color: ${theme.colors.primary}; // Uses #1C2526
`;

const DiveDeeperButton = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: ${theme.colors.primary}; // Uses #1C2526
  color: ${theme.colors.textDark}; // Uses #FFFFFF
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: ${theme.colors.backgroundDark}; // Uses #2A2A2A
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
export default function NextJS() {
  const [openTopics, setOpenTopics] = useState<{ [key: number]: boolean }>({});

  const toggleTopic = (index: number) => {
    setOpenTopics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sections = [
    {
      title: "Next.js Essentials",
      topics: [
        {
          title: "Getting Started",
          purpose:
            "Set up a Next.js project to build fast, modern web applications with React.",
          useCase:
            "Use this when starting a new project or learning the basics of Next.js for server-side rendering and static sites.",
          example:
            "Initialize a Next.js app in your terminal:\n\n```tsx\nnpx create-next-app@latest my-next-app\ncd my-next-app\nnpm run dev\n```",
          proTip:
            "Choose TypeScript during setup by adding '--typescript' to the command for better type safety.",
          subpage: "/nextjs/getting-started",
        },
      ],
    },
    {
      title: "Core Features",
      largeText:
        "Next.js shines with file-based routing, server-side rendering (SSR), and static site generation (SSG). Routing is automatic based on your `app` folder, SSR delivers dynamic content, and SSG pre-renders pages for performance.",
      topics: [
        {
          title: "File-Based Routing",
          purpose:
            "Create pages effortlessly using Next.js’s file-based routing system.",
          useCase:
            "Ideal for quickly setting up routes like `/about` or `/blog` without configuring a router.",
          example:
            "Add a file named `page.tsx` in `app/about/`:\n\n```tsx\n// app/about/page.tsx\n'use client';\n\nexport default function About() {\n  return <h1>About Page</h1>;\n}\n```",
          proTip:
            "Use dynamic routes with `[id]/page.tsx` for pages like `/post/1`—check the docs for params handling.",
          subpage: "/nextjs/routing",
        },
        {
          title: "Server-Side Rendering (SSR)",
          purpose:
            "Render pages on the server for SEO and faster initial loads with dynamic data.",
          useCase:
            "Use SSR when you need fresh data on each request, like a news feed or user dashboard.",
          example:
            "Fetch data in `getServerSideProps`:\n\n```tsx\n// app/page.tsx\n'use client';\n\nexport async function getServerSideProps() {\n  const res = await fetch('https://api.example.com/data');\n  const data = await res.json();\n  return { props: { data } };\n}\nexport default function Page({ data }) {\n  return <div>{data.title}</div>;\n}\n```",
          proTip:
            "Keep `getServerSideProps` lightweight—fetch only what’s needed to avoid slow load times.",
          subpage: undefined,
        },
        {
          title: "Static Site Generation (SSG)",
          purpose:
            "Pre-render pages at build time for maximum performance and scalability.",
          useCase:
            "Perfect for static content like blogs, documentation, or landing pages that don’t change often.",
          example:
            "Use `getStaticProps` for SSG:\n\n```tsx\n// app/page.tsx\n'use client';\n\nexport async function getStaticProps() {\n  const res = await fetch('https://api.example.com/posts');\n  const posts = await res.json();\n  return { props: { posts } };\n}\nexport default function Blog({ posts }) {\n  return <ul>{posts.map(post => <li key={post.id}>{post.title}</li>)}</ul>;\n}\n```",
          proTip:
            "Combine SSG with revalidation (`revalidate: 10`) to refresh static pages periodically.",
          subpage: undefined,
        },
      ],
    },
    {
      title: "Advanced Features",
      topics: [
        {
          title: "API Routes",
          purpose:
            "Build backend endpoints within your Next.js app using API routes.",
          useCase:
            "Use this for simple APIs, like form submissions or data fetching, without a separate server.",
          example:
            "Create `app/api/hello/route.ts`:\n\n```tsx\n// app/api/hello/route.ts\nexport async function GET(req) {\n  return new Response(JSON.stringify({ message: 'Hello from Next.js!' }), { status: 200 });\n}\n```",
          proTip:
            "Test your API route locally at `http://localhost:3000/api/hello` after running `npm run dev`.",
          subpage: "/nextjs/api-routes",
        },
        {
          title: "Dynamic Routes",
          purpose:
            "Handle dynamic URLs like `/post/[id]` with Next.js’s dynamic routing.",
          useCase:
            "Great for blog posts, product pages, or anything with variable slugs.",
          example:
            "Create `app/post/[id]/page.tsx`:\n\n```tsx\n// app/post/[id]/page.tsx\n'use client';\n\nexport async function getStaticPaths() {\n  return { paths: [{ params: { id: '1' } }], fallback: false };\n}\nexport async function getStaticProps({ params }) {\n  const post = { id: params.id, title: 'Post ' + params.id };\n  return { props: { post } };\n}\nexport default function Post({ post }) {\n  return <h1>{post.title}</h1>;\n}\n```",
          proTip:
            "Use `fallback: 'blocking'` in `getStaticPaths` for on-demand static generation of new paths.",
          subpage: undefined,
        },
      ],
    },
    {
      title: "Workflow Enhancements",
      largeText:
        "Next.js boosts development with automatic code splitting, image optimization, and TypeScript support. Code splitting reduces bundle size, `<Image>` optimizes assets, and TypeScript adds type safety right out of the box.",
      topics: [
        {
          title: "Image Optimization",
          purpose:
            "Use Next.js’s `<Image>` component to automatically optimize and lazy-load images.",
          useCase:
            "Perfect for improving performance on image-heavy pages like portfolios or galleries.",
          example:
            "Add an image to your page:\n\n```tsx\n// app/page.tsx\n'use client';\n\nimport Image from 'next/image';\n\nexport default function Home() {\n  return <Image src=\"/my-image.jpg\" alt=\"Example\" width={500} height={300} />;\n}\n```",
          proTip:
            "Set `priority` on key images above the fold to prioritize their loading.",
          subpage: undefined,
        },
        {
          title: "TypeScript Integration",
          purpose:
            "Leverage TypeScript in Next.js for better code quality and developer experience.",
          useCase:
            "Use this for large projects or teams where type checking prevents bugs.",
          example:
            "Define a typed component in `app/page.tsx`:\n\n```tsx\n// app/page.tsx\n'use client';\n\ntype Props = { message: string };\n\nexport default function Home({ message }: Props) {\n  return <h1>{message}</h1>;\n}\nexport async function getStaticProps() {\n  return { props: { message: 'Hello, Layer!' } };\n}\n```",
          proTip:
            "Run `npm install --save-dev typescript @types/react @types/node` if you didn’t start with TypeScript.",
          subpage: "/nextjs/typescript",
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
              src="/nextjs.svg" // Replace with a Next.js-themed hero image
              alt="Next.js Hero"
              fill
              priority
            />
            <HeroText>
              <HeroTitle>Next.js</HeroTitle>
              <HeroSubtitle>Your framework for modern web apps</HeroSubtitle>
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
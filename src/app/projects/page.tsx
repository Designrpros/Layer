// src/app/projects/page.tsx
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
import { theme } from "../../lib/theme";

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
  filter: grayscale(100%);

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
export default function Projects() {
  const [openTopics, setOpenTopics] = useState<{ [key: number]: boolean }>({});

  const toggleTopic = (index: number) => {
    setOpenTopics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sections = [
    {
      title: "Starter Projects",
      topics: [
        {
          title: "Personal Portfolio",
          purpose:
            "Build a simple portfolio site to showcase your skills using Next.js and Styled Components.",
          useCase:
            "Ideal for beginners to practice basic routing, styling, and static content deployment.",
          example:
            "Set up a portfolio home page in `app/page.tsx`:\n\n```tsx\n// app/page.tsx\n'use client';\n\nimport styled from 'styled-components';\n\nconst Hero = styled.section`\n  padding: 50px;\n  background: #F7F4E9;\n  text-align: center;\n`;\n\nexport default function Home() {\n  return (\n    <Hero>\n      <h1>Hi, I’m [Your Name]</h1>\n      <p>Web Developer</p>\n    </Hero>\n  );\n}\n```",
          proTip:
            "Use Next.js’s `<Image>` component for optimized profile photos—set `priority` for fast loading.",
          subpage: "/projects/portfolio",
        },
      ],
    },
    {
      title: "Intermediate Projects",
      largeText:
        "These projects combine Next.js routing, Styled Components for UI, and VSCode tools like debugging. Build dynamic apps that fetch data and style them responsively for real-world practice.",
      topics: [
        {
          title: "Blog with Static Generation",
          purpose:
            "Create a blog using Next.js’s SSG to pre-render posts and Styled Components for a custom look.",
          useCase:
            "Great for learning static site generation, API integration, and responsive design.",
          example:
            "Fetch blog posts in `app/page.tsx`:\n\n```tsx\n// app/page.tsx\n'use client';\n\nimport styled from 'styled-components';\n\nconst Post = styled.article`\n  padding: 20px;\n  background: #E8E2D1;\n  margin-bottom: 20px;\n`;\n\nexport async function getStaticProps() {\n  const res = await fetch('https://jsonplaceholder.typicode.com/posts');\n  const posts = await res.json();\n  return { props: { posts } };\n}\n\nexport default function Blog({ posts }) {\n  return (\n    <div>\n      {posts.slice(0, 5).map(post => (\n        <Post key={post.id}>\n          <h2>{post.title}</h2>\n          <p>{post.body}</p>\n        </Post>\n      ))}\n    </div>\n  );\n}\n```",
          proTip:
            "Add a `revalidate` option in `getStaticProps` to refresh posts periodically without rebuilding.",
          subpage: "/projects/blog",
        },
        {
          title: "Todo App with API Routes",
          purpose:
            "Build a todo app with a Next.js API route for CRUD operations and Styled Components for styling.",
          useCase:
            "Perfect for practicing full-stack development within a single Next.js app.",
          example:
            "Create an API route in `app/api/todos/route.ts` and a styled todo list:\n\n```tsx\n// app/api/todos/route.ts\nexport async function GET(req) {\n  const todos = [{ id: 1, text: 'Learn Next.js' }];\n  return new Response(JSON.stringify(todos), { status: 200 });\n}\n\n// app/page.tsx\n'use client';\n\nimport styled from 'styled-components';\n\nconst Todo = styled.li`\n  padding: 10px;\n  background: #1C2526;\n  color: #fff;\n  margin: 5px 0;\n`;\n\nexport async function getServerSideProps() {\n  const res = await fetch('http://localhost:3000/api/todos');\n  const todos = await res.json();\n  return { props: { todos } };\n}\n\nexport default function Home({ todos }) {\n  return (\n    <ul>\n      {todos.map(todo => <Todo key={todo.id}>{todo.text}</Todo>)}\n    </ul>\n  );\n}\n```",
          proTip:
            "Use VSCode’s debugger to step through the API route and client code for easier troubleshooting.",
          subpage: undefined,
        },
      ],
    },
    {
      title: "Advanced Projects",
      topics: [
        {
          title: "E-Commerce Store",
          purpose:
            "Develop a full-featured e-commerce site with Next.js dynamic routes and Styled Components theming.",
          useCase:
            "Use this to master dynamic routing, data fetching, and a cohesive design system.",
          example:
            "Set up a product page in `app/products/[id]/page.tsx`:\n\n```tsx\n// app/products/[id]/page.tsx\n'use client';\n\nimport styled from 'styled-components';\n\nconst ProductCard = styled.div`\n  padding: 20px;\n  background: #E8E2D1;\n  border-radius: 8px;\n`;\n\nexport async function getStaticPaths() {\n  return { paths: [{ params: { id: '1' } }], fallback: 'blocking' };\n}\n\nexport async function getStaticProps({ params }) {\n  const product = { id: params.id, name: 'Sample Product', price: 29.99 };\n  return { props: { product } };\n}\n\nexport default function Product({ product }) {\n  return (\n    <ProductCard>\n      <h1>{product.name}</h1>\n      <p>${product.price}</p>\n    </ProductCard>\n  );\n}\n```",
          proTip:
            "Add a global theme with Styled Components to keep product styles consistent across pages.",
          subpage: "/projects/ecommerce",
        },
        {
          title: "Dashboard with SSR",
          purpose:
            "Build a user dashboard with server-side rendering for real-time data using Next.js and Styled Components.",
          useCase:
            "Ideal for learning SSR, API integration, and creating interactive, styled UIs.",
          example:
            "Fetch user data in `app/dashboard/page.tsx`:\n\n```tsx\n// app/dashboard/page.tsx\n'use client';\n\nimport styled from 'styled-components';\n\nconst Dashboard = styled.div`\n  padding: 30px;\n  background: #F7F4E9;\n`;\n\nexport async function getServerSideProps() {\n  const res = await fetch('https://api.example.com/user');\n  const user = await res.json();\n  return { props: { user } };\n}\n\nexport default function DashboardPage({ user }) {\n  return (\n    <Dashboard>\n      <h1>Welcome, {user.name}</h1>\n      <p>Email: {user.email}</p>\n    </Dashboard>\n  );\n}\n```",
          proTip:
            "Use VSCode’s multi-cursor editing to quickly style multiple dashboard elements at once.",
          subpage: undefined,
        },
      ],
    },
    {
      title: "Capstone Project",
      largeText:
        "Combine everything you’ve learned into a portfolio-worthy project. Use Next.js for structure, Styled Components for a polished UI, and VSCode tools to streamline development.",
      topics: [
        {
          title: "Full-Stack Blog with Authentication",
          purpose:
            "Create a blog with user authentication, post creation, and a styled frontend using Next.js and Styled Components.",
          useCase:
            "Perfect as a showcase project to demonstrate full-stack skills and design sensibility.",
          example:
            "Set up an auth API in `app/api/login/route.ts` and a styled login page:\n\n```tsx\n// app/api/login/route.ts\nexport async function POST(req) {\n  const { username } = await req.json();\n  return new Response(JSON.stringify({ user: { name: username } }), { status: 200 });\n}\n\n// app/login/page.tsx\n'use client';\n\nimport styled from 'styled-components';\n\nconst Form = styled.form`\n  padding: 20px;\n  background: #E8E2D1;\n  border-radius: 8px;\n`;\n\nexport default function Login() {\n  return (\n    <Form>\n      <input type=\"text\" placeholder=\"Username\" />\n      <button>Login</button>\n    </Form>\n  );\n}\n```",
          proTip:
            "Add TypeScript and a global theme to make your project production-ready and maintainable.",
          subpage: "/projects/fullstack-blog",
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
              src="/projects-hero.jpg" // Replace with a projects-themed hero image
              alt="Projects Hero"
              fill
              priority
            />
            <HeroText>
              <HeroTitle>Projects</HeroTitle>
              <HeroSubtitle>Build real-world web apps</HeroSubtitle>
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
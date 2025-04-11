"use client";

import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Image from "next/image";
import Sidebar from "./Sidebar";

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

// === Index Page Styled Components ===
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${theme.colors.backgroundLight};
  color: ${theme.colors.textLight};
  font-family: "Montserrat", sans-serif;
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 200px; /* Space for sidebar */
  padding: 6rem 1rem 1rem 1rem; /* Adjusted top padding for toolbar */

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 0rem;
  scroll-margin-top: 4rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid ${theme.colors.primary};
  padding-bottom: 0.2rem;
  color: ${theme.colors.primary};
`;

const ToggleIcon = styled.span`
  font-size: 1.2rem;
  color: ${theme.colors.primary};
`;

const SectionText = styled.p`
  font-size: 0.75rem;
  color: ${theme.colors.textLight};
  line-height: 1.4;
  margin-bottom: 0.75rem;
`;

const SectionContent = styled.div<{ isOpen: boolean }>`
  padding: ${({ isOpen }) => (isOpen ? "0.5rem 0" : "0")};
  height: ${({ isOpen }) => (isOpen ? "auto" : "0")};
  overflow: hidden;
`;

const SectionList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0;
`;

const ListItem = styled.li`
  font-size: 0.75rem;
  color: ${theme.colors.textLight};
  line-height: 1.4;
  margin-bottom: 0.5rem;
`;

const HighlightedText = styled.span`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.textDark};
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-weight: 600;
`;

// === Index Page Component ===
export default function Index() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    welcome: false,
    "html-basics": false,
    "css-essentials": false,
    "js-intro": false,
    "vscode-setup": false,
    "nextjs-routing": false,
    "styled-components": false,
    "responsive-design": false,
    "project-structure": false,
    "data-fetching": false,
    "optimization": false,
    "typescript": false,
    "debugging": false,
    "deployment": false,
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        <Sidebar />
        <MainContent>
          <ContentContainer>
            <Section id="welcome">
              <SectionHeader onClick={() => toggleSection("welcome")}>
                <SectionTitle>Welcome</SectionTitle>
                <ToggleIcon>{openSections.welcome ? "−" : "+"}</ToggleIcon>
              </SectionHeader>
              <SectionText>
                A compact overview of your web development journey with Layer—everything in one place.
              </SectionText>
              <SectionContent isOpen={openSections.welcome}>
                <SectionList>
                  <ListItem>
                    <HighlightedText>Overview:</HighlightedText> Bite-sized insights into web dev with VSCode, Next.js, and Styled Components.
                  </ListItem>
                  <ListItem>
                    <HighlightedText>Navigation:</HighlightedText> Use the sidebar (desktop only) to explore topics.
                  </ListItem>
                  <ListItem>Dive into essentials for quick learning.</ListItem>
                  <ListItem>Toggle sections for detailed breakdowns.</ListItem>
                </SectionList>
              </SectionContent>
            </Section>

            <Section id="html-basics">
              <SectionHeader onClick={() => toggleSection("html-basics")}>
                <SectionTitle>HTML Basics</SectionTitle>
                <ToggleIcon>{openSections["html-basics"] ? "−" : "+"}</ToggleIcon>
              </SectionHeader>
              <SectionText>
                HTML structures your site—tags like &lt;div&gt; and &lt;p&gt; build the foundation. In VSCode, use Emmet (type `!`) to scaffold a page.
              </SectionText>
              <SectionContent isOpen={openSections["html-basics"]}>
                <SectionList>
                  <ListItem>
                    <HighlightedText>Structure:</HighlightedText> HTML uses tags: &lt;div&gt; (block), &lt;p&gt; (paragraph).
                  </ListItem>
                  <ListItem>
                    <HighlightedText>Semantic Tags:</HighlightedText> &lt;header&gt;, &lt;footer&gt;, &lt;article&gt; for meaning.
                  </ListItem>
                  <ListItem>Attributes: `class` and `id` for styling and scripting.</ListItem>
                  <ListItem>In VSCode, type `!` and press Tab for a template.</ListItem>
                  <ListItem>Tip: Use &lt;main&gt; for primary content.</ListItem>
                </SectionList>
              </SectionContent>
            </Section>

            <Section id="css-essentials">
              <SectionHeader onClick={() => toggleSection("css-essentials")}>
                <SectionTitle>CSS Essentials</SectionTitle>
                <ToggleIcon>{openSections["css-essentials"] ? "−" : "+"}</ToggleIcon>
              </SectionHeader>
              <SectionText>
                CSS styles your HTML—body color set to primary color. In VSCode, add a style block to see a dark theme.
              </SectionText>
              <SectionContent isOpen={openSections["css-essentials"]}>
                <SectionList>
                  <ListItem>
                    <HighlightedText>Styling:</HighlightedText> color, background, font-size define looks.
                  </ListItem>
                  <ListItem>
                    <HighlightedText>Selectors:</HighlightedText> .class, #id, tag target elements.
                  </ListItem>
                  <ListItem>Box model: margin, padding, border control spacing.</ListItem>
                  <ListItem>In VSCode, add body color primary to a style tag.</ListItem>
                  <ListItem>Tip: Use VSCode’s Live Server to preview CSS changes.</ListItem>
                </SectionList>
              </SectionContent>
            </Section>

            <Section id="js-intro">
              <SectionHeader onClick={() => toggleSection("js-intro")}>
                <SectionTitle>JavaScript Intro</SectionTitle>
                <ToggleIcon>{openSections["js-intro"] ? "−" : "+"}</ToggleIcon>
              </SectionHeader>
              <SectionText>
                JavaScript adds interactivity—`console.log("Hello")` prints to the console. In VSCode, write a script and run it.
              </SectionText>
              <SectionContent isOpen={openSections["js-intro"]}>
                <SectionList>
                  <ListItem>
                    <HighlightedText>Basics:</HighlightedText> Variables (`let`), functions, events.
                  </ListItem>
                  <ListItem>
                    <HighlightedText>DOM:</HighlightedText> Manipulate HTML with `document.querySelector`.
                  </ListItem>
                  <ListItem>Events: `onclick` triggers actions.</ListItem>
                  <ListItem>In VSCode, add `console.log("Hello")` to a `.js` file.</ListItem>
                  <ListItem>Tip: Use the browser console (F12) to test JS.</ListItem>
                </SectionList>
              </SectionContent>
            </Section>

            <Section id="vscode-setup">
              <SectionHeader onClick={() => toggleSection("vscode-setup")}>
                <SectionTitle>VSCode Setup</SectionTitle>
                <ToggleIcon>{openSections["vscode-setup"] ? "−" : "+"}</ToggleIcon>
              </SectionHeader>
              <SectionText>
                VSCode is your editor—install Prettier for formatting. Start a Next.js project with `npx create-next-app` in the terminal.
              </SectionText>
              <SectionContent isOpen={openSections["vscode-setup"]}>
                <SectionList>
                  <ListItem>
                    <HighlightedText>Setup:</HighlightedText> Install VSCode, add extensions (Prettier, ESLint).
                  </ListItem>
                  <ListItem>
                    <HighlightedText>Terminal:</HighlightedText> Run commands like `npx create-next-app`.
                  </ListItem>
                  <ListItem>Shortcuts: Ctrl + D for multi-cursor editing.</ListItem>
                  <ListItem>Start a Next.js project in VSCode’s terminal.</ListItem>
                  <ListItem>Tip: Use `code .` to open a project folder.</ListItem>
                </SectionList>
              </SectionContent>
            </Section>

            <Section id="nextjs-routing">
              <SectionHeader onClick={() => toggleSection("nextjs-routing")}>
                <SectionTitle>Next.js Routing</SectionTitle>
                <ToggleIcon>{openSections["nextjs-routing"] ? "−" : "+"}</ToggleIcon>
              </SectionHeader>
              <SectionText>
                Next.js leverages the App Router—create `app/about/page.tsx` for the `/about` route. In VSCode, set up a page and run `npm run dev` to test modern routing.
              </SectionText>
              <SectionContent isOpen={openSections["nextjs-routing"]}>
                <SectionList>
                  <ListItem>
                    <HighlightedText>App Router:</HighlightedText> Files in `app/` define routes (e.g., `app/about/page.tsx` = `/about`).
                  </ListItem>
                  <ListItem>
                    <HighlightedText>Dynamic Routes:</HighlightedText> `app/post/[id]/page.tsx` for variable paths (e.g., `/post/1`).
                  </ListItem>
                  <ListItem>API Routes: `app/api/[route]/route.ts` for backend endpoints (e.g., `/api/hello`).</ListItem>
                  <ListItem>In VSCode, create `app/about/page.tsx` and test with `npm run dev`.</ListItem>
                  <ListItem>Tip: Use `app/[...slug]/page.tsx` for catch-all routes in App Router.</ListItem>
                </SectionList>
              </SectionContent>
            </Section>

            <Section id="styled-components">
              <SectionHeader onClick={() => toggleSection("styled-components")}>
                <SectionTitle>Styled Components</SectionTitle>
                <ToggleIcon>{openSections["styled-components"] ? "−" : "+"}</ToggleIcon>
              </SectionHeader>
              <SectionText>
                Styled Components scopes CSS—`styled.div` styles a div. In VSCode, create a styled button for a Next.js page.
              </SectionText>
              <SectionContent isOpen={openSections["styled-components"]}>
                <SectionList>
                  <ListItem>
                    <HighlightedText>CSS-in-JS:</HighlightedText> `styled.div` scopes styles to components.
                  </ListItem>
                  <ListItem>
                    <HighlightedText>Props:</HighlightedText> Dynamic styles with props (e.g., background changes based on `active` state).
                  </ListItem>
                  <ListItem>Theming: Use `ThemeProvider` for consistent styles.</ListItem>
                  <ListItem>In VSCode, add a styled button to a Next.js page.</ListItem>
                  <ListItem>Tip: Install the Styled Components extension for syntax highlighting.</ListItem>
                </SectionList>
              </SectionContent>
            </Section>

            <Section id="responsive-design">
              <SectionHeader onClick={() => toggleSection("responsive-design")}>
                <SectionTitle>Responsive Design</SectionTitle>
                <ToggleIcon>{openSections["responsive-design"] ? "−" : "+"}</ToggleIcon>
              </SectionHeader>
              <SectionText>
                Responsive design adapts to screens—use `media` queries. In VSCode, add a breakpoint at 768px with Styled Components.
              </SectionText>
              <SectionContent isOpen={openSections["responsive-design"]}>
                <SectionList>
                  <ListItem>
                    <HighlightedText>Media Queries:</HighlightedText> `@media (max-width: 768px)` adjusts styles.
                  </ListItem>
                  <ListItem>
                    <HighlightedText>Mobile-First:</HighlightedText> Start with base styles, then scale up.
                  </ListItem>
                  <ListItem>Flexbox/Grid: Layout tools for responsiveness.</ListItem>
                  <ListItem>In VSCode, add a 768px breakpoint with Styled Components.</ListItem>
                  <ListItem>Tip: Test with VSCode’s Live Server on multiple devices.</ListItem>
                </SectionList>
              </SectionContent>
            </Section>

            <Section id="project-structure">
              <SectionHeader onClick={() => toggleSection("project-structure")}>
                <SectionTitle>Project Structure</SectionTitle>
                <ToggleIcon>{openSections["project-structure"] ? "−" : "+"}</ToggleIcon>
              </SectionHeader>
              <SectionText>
                Structure organizes your app—`components/` for reusable UI. In VSCode, set up a Next.js project with a `components/` folder.
              </SectionText>
              <SectionContent isOpen={openSections["project-structure"]}>
                <SectionList>
                  <ListItem>
                    <HighlightedText>Folders:</HighlightedText> `pages/` for routes, `components/` for UI.
                  </ListItem>
                  <ListItem>
                    <HighlightedText>Files:</HighlightedText> `_app.tsx` for app-wide settings, `index.tsx` for home.
                  </ListItem>
                  <ListItem>`public/` for static assets (e.g., images).</ListItem>
                  <ListItem>In VSCode, create `components/` in a Next.js project.</ListItem>
                  <ListItem>Tip: Keep `utils/` for helper functions.</ListItem>
                </SectionList>
              </SectionContent>
            </Section>

            <Section id="data-fetching">
              <SectionHeader onClick={() => toggleSection("data-fetching")}>
                <SectionTitle>Data Fetching</SectionTitle>
                <ToggleIcon>{openSections["data-fetching"] ? "−" : "+"}</ToggleIcon>
              </SectionHeader>
              <SectionText>
                Fetch data in Next.js—`getStaticProps` for static data. In VSCode, fetch posts in a Next.js page.
              </SectionText>
              <SectionContent isOpen={openSections["data-fetching"]}>
                <SectionList>
                  <ListItem>
                    <HighlightedText>Methods:</HighlightedText> `getStaticProps` (SSG), `getServerSideProps` (SSR).
                  </ListItem>
                  <ListItem>
                    <HighlightedText>API Calls:</HighlightedText> Use `fetch` for external data.
                  </ListItem>
                  <ListItem>Dynamic: `getStaticPaths` for dynamic routes.</ListItem>
                  <ListItem>In VSCode, add `getStaticProps` to fetch posts.</ListItem>
                  <ListItem>Tip: Use `revalidate` for incremental static regeneration.</ListItem>
                </SectionList>
              </SectionContent>
            </Section>

            <Section id="optimization">
              <SectionHeader onClick={() => toggleSection("optimization")}>
                <SectionTitle>Optimization</SectionTitle>
                <ToggleIcon>{openSections["optimization"] ? "−" : "+"}</ToggleIcon>
              </SectionHeader>
              <SectionText>
                Optimize your app—Next.js’s Image component for fast images. In VSCode, add an optimized image to a page.
              </SectionText>
              <SectionContent isOpen={openSections["optimization"]}>
                <SectionList>
                  <ListItem>
                    <HighlightedText>Images:</HighlightedText> Image component optimizes and lazy-loads.
                  </ListItem>
                  <ListItem>
                    <HighlightedText>Code Splitting:</HighlightedText> Next.js splits code automatically.
                  </ListItem>
                  <ListItem>Minification: Reduces file size in production.</ListItem>
                  <ListItem>In VSCode, use Image component in a Next.js page.</ListItem>
                  <ListItem>Tip: Set `priority` on key images for faster loading.</ListItem>
                </SectionList>
              </SectionContent>
            </Section>

            <Section id="typescript">
              <SectionHeader onClick={() => toggleSection("typescript")}>
                <SectionTitle>TypeScript</SectionTitle>
                <ToggleIcon>{openSections["typescript"] ? "−" : "+"}</ToggleIcon>
              </SectionHeader>
              <SectionText>
                TypeScript adds types—type Props = 'name: string'. In VSCode, type a Next.js component.
              </SectionText>
              <SectionContent isOpen={openSections["typescript"]}>
                <SectionList>
                  <ListItem>
                    <HighlightedText>Typing:</HighlightedText> Define types (e.g., type Props = 'name: string').
                  </ListItem>
                  <ListItem>
                    <HighlightedText>Benefits:</HighlightedText> Catch errors early, improve IntelliSense.
                  </ListItem>
                  <ListItem>Interfaces: interface User 'id: number'.</ListItem>
                  <ListItem>In VSCode, type a Next.js component with props.</ListItem>
                  <ListItem>Tip: Use '@types' packages for third-party libs.</ListItem>
                </SectionList>
              </SectionContent>
            </Section>

            <Section id="debugging">
              <SectionHeader onClick={() => toggleSection("debugging")}>
                <SectionTitle>Debugging</SectionTitle>
                <ToggleIcon>{openSections["debugging"] ? "−" : "+"}</ToggleIcon>
              </SectionHeader>
              <SectionText>
                Debug with VSCode—set breakpoints to pause code. Add a breakpoint in a Next.js page and press F5.
              </SectionText>
              <SectionContent isOpen={openSections["debugging"]}>
                <SectionList>
                  <ListItem>
                    <HighlightedText>Breakpoints:</HighlightedText> Pause execution to inspect variables.
                  </ListItem>
                  <ListItem>
                    <HighlightedText>Tools:</HighlightedText> VSCode debugger, browser console.
                  </ListItem>
                  <ListItem>Watch: Monitor variable values in real-time.</ListItem>
                  <ListItem>In VSCode, set a breakpoint in a Next.js page.</ListItem>
                  <ListItem>Tip: Use `console.log` sparingly—debugger is more powerful.</ListItem>
                </SectionList>
              </SectionContent>
            </Section>

            <Section id="deployment">
              <SectionHeader onClick={() => toggleSection("deployment")}>
                <SectionTitle>Deployment</SectionTitle>
                <ToggleIcon>{openSections["deployment"] ? "−" : "+"}</ToggleIcon>
              </SectionHeader>
              <SectionText>
                Deploy your app—use Vercel for Next.js hosting. In VSCode, push to GitHub and deploy via Vercel CLI.
              </SectionText>
              <SectionContent isOpen={openSections["deployment"]}>
                <SectionList>
                  <ListItem>
                    <HighlightedText>Hosting:</HighlightedText> Vercel for Next.js, Netlify for static sites.
                  </ListItem>
                  <ListItem>
                    <HighlightedText>Steps:</HighlightedText> Push to GitHub, link to Vercel.
                  </ListItem>
                  <ListItem>Domain: Add a custom domain in Vercel.</ListItem>
                  <ListItem>In VSCode, use `vercel` CLI to deploy.</ListItem>
                  <ListItem>Tip: Test locally with `vercel dev` first.</ListItem>
                </SectionList>
              </SectionContent>
            </Section>
          </ContentContainer>
        </MainContent>
      </PageContainer>
    </ThemeProvider>
  );
}
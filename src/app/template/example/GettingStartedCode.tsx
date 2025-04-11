// app/template/example/GettingStartedCode.ts
const gettingStartedCode = `# Getting Started
\`\`\`tsx
// app/page.tsx
"use client";

import styled from "styled-components";
import Link from "next/link";

const PageContainer = styled.div\`
  display: grid;
  grid-template-rows: 1fr auto; /* Main content and footer */
  min-height: 100vh;
  width: 100%; /* Full viewport width */
  background: #F7F4E9; /* Soft beige background */
  padding: 2rem 0; /* Vertical padding only */
\`;

const MainContent = styled.main\`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
  padding: 2rem 1rem; /* Minimal horizontal padding for content */

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 1rem;
  }
\`;

const HeroTitle = styled.h1\`
  font-size: 3.5rem;
  font-weight: 700;
  color: #000000; /* Black for title */
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
\`;

const HeroSubtitle = styled.p\`
  font-size: 1.25rem;
  color: #333333; /* Dark gray for subtitle */
  max-width: 600px;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 500px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    max-width: 300px;
  }
\`;

const ButtonContainer = styled.div\`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1rem;
  }
\`;

const ActionButton = styled(Link)\`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  background: #000000; /* Black for buttons */
  color: #FFFFFF; /* White text */
  transition: background 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #333333; /* Dark gray on hover */
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    width: 100%;
    max-width: 200px;
  }
\`;

const Footer = styled.footer\`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  color: #333333; /* Dark gray for footer */

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
  }
\`;

const FooterLink = styled.a\`
  color: #333333; /* Dark gray for links */
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #000000; /* Black on hover */
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    width: 100%;
    text-align: center;
  }
\`;

export default function Home() {
  return (
    <PageContainer>
      <MainContent>
        <HeroTitle>Welcome</HeroTitle>
        <HeroSubtitle>
          Kickstart your Next.js journey with this sleek template featuring Styled Components and the App Router.
        </HeroSubtitle>
        <ButtonContainer>
          <ActionButton href="/template">Explore Guide</ActionButton>
          <ActionButton href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
            Next.js Docs
          </ActionButton>
        </ButtonContainer>
      </MainContent>
      <Footer>
        <FooterLink href="https://github.com" target="_blank" rel="noopener noreferrer">
          GitHub
        </FooterLink>
        <FooterLink href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          Next.js
        </FooterLink>
        <FooterLink href="https://styled-components.com" target="_blank" rel="noopener noreferrer">
          Styled Components
        </FooterLink>
      </Footer>
    </PageContainer>
  );
}
\`\`\`

### How It Works:
- A fully responsive homepage with a flat, simplistic black-and-white design on a soft beige background (#F7F4E9).
- Spans edge-to-edge with no side gaps using full viewport width.
- Features a bold black title, dark gray subtitle, and black buttons with white text for a clean, minimal look.
- Buttons and footer links adapt to screen size, maintaining usability without excessive colors or effects.
`;

export default gettingStartedCode;
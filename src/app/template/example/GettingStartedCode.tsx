// app/template/example/GettingStartedCode.ts
const gettingStartedCode = `# Getting Started
\`\`\`tsx
// app/page.tsx
"use client";

import { useState } from "react";
import styled from "styled-components";
import { Container } from "../lib/styles";

// Enhanced styled components
const WelcomeCard = styled.div\`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 600px;
  margin: 2rem auto;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
\`;

const Title = styled.h1\`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1rem;
\`;

const Text = styled.p\`
  font-size: 1.125rem;
  color: #4a5568;
  line-height: 1.6;
  margin: 0 0 1.5rem;
\`;

const Button = styled.button\`
  background: #0070f3;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #005bb5;
  }
\`;

const Progress = styled.div<{ active: boolean }>\`
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 1rem;
  &::after {
    content: "";
    display: block;
    width: 50%;
    height: 100%;
    background: #0070f3;
    transform: translateX(\${({ active }) => (active ? "100%" : "0")});
    transition: transform 0.5s ease;
  }
\`;

export default function Home() {
  const [isExploring, setIsExploring] = useState(false);

  return (
    <Container>
      <WelcomeCard>
        <Title>Welcome to Your Next.js Journey</Title>
        <Text>
          This template provides a sleek foundation with Styled Components and
          the App Router. Click below to start exploring and building your app!
        </Text>
        <Button onClick={() => setIsExploring(!isExploring)}>
          {isExploring ? "Pause Exploration" : "Start Exploring"}
        </Button>
        <Progress active={isExploring} />
      </WelcomeCard>
    </Container>
  );
}
\`\`\`

### How It Works:
- A modern card UI with hover effects and a shadow for depth.
- Interactive button toggles a state, showing real-time feedback.
- Animated progress bar reflects the exploration state.
- Professional styling with a clean, responsive design.
`;

export default gettingStartedCode;
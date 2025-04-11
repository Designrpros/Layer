// app/template/example/templatePageCode.ts
const templatePageCode = `# Guide Page Example
\`\`\`tsx
// app/template/page.tsx
"use client";

import styled from "styled-components";

const PageWrapper = styled.div\`
  padding: 80px 2rem 2rem;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
\`;

const Heading = styled.h1\`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
\`;

const Description = styled.p\`
  font-size: 1.25rem;
  color: #718096;
  line-height: 1.6;
\`;

export default function TemplatePage() {
  return (
    <PageWrapper>
      <Heading>Welcome</Heading>
      <Description>
        This is a simple Next.js starter template built with Styled Components.
      </Description>
    </PageWrapper>
  );
}
\`\`\`

### How It Works:
- **Styled Components**: Replaces inline styles with clean, reusable components.
- **Simple Design**: Keeps layout minimal with centered text and subtle colors.
- **Professional Touch**: Uses consistent typography and spacing for a polished look.
`;

export default templatePageCode;
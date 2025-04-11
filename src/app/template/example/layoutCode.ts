// app/template/example/layoutCode.ts
const layoutCode = `# Root Layout Example
\`\`\`tsx
// app/layout.tsx
import { ReactNode } from "react";
import StyledComponentsRegistry from "../components/styled-components-registry"; // Adjust to src/components/ after setup
import Toolbar from "../components/Toolbar"; // Adjust to src/components/Toolbar after setup
import ThemeWrapper from "../components/ThemeWrapper"; // Adjust to src/components/ThemeWrapper after setup
import { CSSProperties } from "react";

export const metadata = {
  title: "Next.js Styled Template",
  description: "A Next.js starter with Styled Components",
};

// Define inline styles with TypeScript typing for server compatibility
const heroStyle: CSSProperties = {
  background: "#1a202c", // Hardcoded theme.colors.backgroundDark
  padding: "4rem 2rem",
  textAlign: "center",
};

const heroTitleStyle: CSSProperties = {
  fontSize: "3rem",
  fontWeight: 700,
  color: "#f5f5d5", // Beige color
  margin: 0,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeWrapper>
            <Toolbar />
            {children}
          </ThemeWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
\`\`\`

### How It Works:
- A server component with a minimal hero section using typed inline styles.
- Wraps content in a client-side \`ThemeWrapper\` for Styled Components compatibility.
- Includes the toolbar and page content below the hero.
- Hardcodes theme colors since \`theme\` can't be imported server-side here.
`;

export default layoutCode;
// app/template/example/ThemeWrapperCode.ts (new file)
const themeWrapperCode = `# Theme Wrapper Example
\`\`\`tsx
// src/components/ThemeWrapper.tsx
"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "../lib/theme"; // Adjust to src/lib/theme after setup
import { ReactNode } from "react";

interface ThemeWrapperProps {
  children: ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
\`\`\`

### How It Works:
- A client-side component that applies the theme to all children.
- Uses "use client" to ensure compatibility with Styled Components.
- Keeps the layout server-side while delegating theme management here.
`;

export default themeWrapperCode;
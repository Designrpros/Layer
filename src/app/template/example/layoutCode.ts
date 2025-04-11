// app/template/example/layoutCode.ts
const layoutCode = `# Root Layout Example
\`\`\`tsx
// app/layout.tsx
import { ReactNode } from "react";
import Toolbar from "./template/components/Toolbar";

export const metadata = {
  title: "My Next.js App",
  description: "A simple Next.js starter",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{\`
          body {
            margin: 0;
            padding: 0;
            font-family: "Arial", sans-serif;
            background-color: #f0f0f0;
            color: #333;
          }
        \`}</style>
      </head>
      <body>
        <Toolbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
\`\`\`
`;

export default layoutCode;
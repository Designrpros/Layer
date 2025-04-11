// app/template/example/RoutingCode.ts
const routingCode = `# File-Based Routing Example
Next.js uses file-based routing to create pages automatically based on the \`app/\` directory structure. Here’s a simple example:

\`\`\`tsx
// app/page.tsx
"use client";

export default function Home() {
  return <h1>Home Page</h1>;
}

// app/about/page.tsx
"use client";

export default function About() {
  return <h1>About Page</h1>;
}

// app/contact/page.tsx
"use client";

export default function Contact() {
  return <h1>Contact Page</h1>;
}
\`\`\`

### How It Works:
- \`app/page.tsx\` → \`/\` (root route)
- \`app/about/page.tsx\` → \`/about\`
- \`app/contact/page.tsx\` → \`/contact\`

Add files to \`app/\` with a \`page.tsx\` to create new routes instantly.
`;

export default routingCode;
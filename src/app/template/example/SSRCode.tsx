// app/template/example/SSRCode.ts
const ssrCode = `# Server-Side Rendering Example
\`\`\`tsx
// app/ssr/page.tsx
import { Container, Title, Text } from "../../lib/styles";

export default async function SSR() {
  // Fetches data on the server for each request
  const res = await fetch("https://api.example.com/data", {
    cache: "no-store", // Ensures fresh data per request
  });
  const data = await res.json();

  return (
    <Container>
      <Title>Server-Side Rendering</Title>
      <Text>
        Fetched on the server: {data.message || "Dynamic content here"}
      </Text>
    </Container>
  );
}
\`\`\`

### How It Works:
- This is a server component (no \`"use client"\`) that runs on the server.
- \`fetch\` retrieves fresh data for each request, making it true SSR.
- Place this at \`app/ssr/page.tsx\` to access it at \`/ssr\`.
`;

export default ssrCode;
// app/template/example/SSGCode.ts
const ssgCode = `# Static Site Generation Example
\`\`\`tsx
// app/ssg/page.tsx
import { Container, Title, Text } from "../../lib/styles";

export default async function SSG() {
  // Fetches data at build time
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "force-cache", // Ensures data is cached for static generation
  });
  const post = await res.json();

  return (
    <Container>
      <Title>Static Site Generation</Title>
      <Text>
        Pre-rendered at build time: {post.title || "Static content here"}
      </Text>
    </Container>
  );
}

// Optional: Incremental Static Regeneration (ISR)
export const revalidate = 3600; // Revalidate every hour
\`\`\`

### How It Works:
- This is a server component that runs at build time to fetch and render static content.
- \`fetch\` with \`cache: "force-cache"\` ensures data is fetched once during build.
- Place this at \`app/ssg/page.tsx\` to access it at \`/ssg\` as a static page.
- \`revalidate\` enables Incremental Static Regeneration (ISR) to update content periodically.
`;

export default ssgCode;
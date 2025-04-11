// app/template/example/DynamicRoutesCode.ts
const dynamicRoutesCode = `# Dynamic Routes Example
\`\`\`tsx
// app/blog/[slug]/page.tsx
import { Container, Title, Text } from "../../../lib/styles";

export default async function BlogPost({ params }: { params: { slug: string } }) {
  // Fetch data based on the dynamic slug parameter
  const res = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${params.slug}\`, {
    cache: "force-cache", // Static generation
  });
  const post = await res.json();

  return (
    <Container>
      <Title>{post.title || "Blog Post"}</Title>
      <Text>{post.body || "Post content not found"}</Text>
    </Container>
  );
}

// Pre-render specific slugs at build time
export async function generateStaticParams() {
  return [
    { slug: "1" },
    { slug: "2" },
    { slug: "3" },
  ];
}
\`\`\`

### How It Works:
- Defines a dynamic route at \`/blog/[slug]\`, e.g., \`/blog/1\`, \`/blog/2\`.
- The \`[slug]\` parameter is passed via \`params.slug\` to fetch specific data.
- \`generateStaticParams\` pre-renders pages for slugs "1", "2", "3" at build time.
- Use \`fetch\` with \`cache: "force-cache"\` for static generation, or omit for SSR.
`;

export default dynamicRoutesCode;
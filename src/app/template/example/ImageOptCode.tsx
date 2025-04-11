// app/template/example/ImageOptCode.ts
const imageOptCode = `# Image Optimization Example
\`\`\`tsx
// app/gallery/page.tsx
import Image from "next/image";
import { Container, Title, Text } from "../../lib/styles";

export default function Gallery() {
  return (
    <Container>
      <Title>Image Gallery</Title>
      <Text>Optimized images load fast and responsively.</Text>
      <Image
        src="/images/sample.jpg" // Place image in /public/images/
        alt="Sample Image"
        width={600}
        height={400}
        priority // Loads immediately for above-the-fold content
      />
    </Container>
  );
}
\`\`\`

### How It Works:
- The \`Image\` component from \`next/image\` optimizes images automatically.
- \`width\` and \`height\` ensure proper aspect ratio and resizing.
- \`priority\` preloads the image for better performance on key visuals.
- Place static images in \`/public/\` to serve them efficiently.
`;

export default imageOptCode;
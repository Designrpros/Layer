// app/template/example/APIRoutesCode.ts
const apiRoutesCode = `# API Routes Example
\`\`\`tsx
// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "World";

  return NextResponse.json({
    message: \`Hello, \${name}!\`,
    timestamp: new Date().toISOString(),
  });
}
\`\`\`

### How It Works:
- This defines a server-side API endpoint at \`/api/hello\`.
- The \`GET\` handler responds with JSON data, e.g., \`{"message": "Hello, World!", "timestamp": "2025-04-11T..."})\`.
- Access it via \`fetch("/api/hello?name=User")\` or visit \`http://localhost:3000/api/hello\` locally.
- Use it for lightweight tasks like form submissions or data fetching.
`;

export default apiRoutesCode;
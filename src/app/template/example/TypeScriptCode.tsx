// app/template/example/TypeScriptCode.ts
const typeScriptCode = `# TypeScript Integration Example
\`\`\`tsx
// app/profile/page.tsx
import { Container, Title, Text } from "../../lib/styles";

// Define a TypeScript interface for props
interface UserProfile {
  name: string;
  email: string;
  role: "admin" | "user";
}

export default function Profile({ user }: { user: UserProfile }) {
  return (
    <Container>
      <Title>{user.name}’s Profile</Title>
      <Text>
        Email: {user.email} | Role: {user.role}
      </Text>
    </Container>
  );
}

// Example usage with static data (could be fetched)
export async function getServerSideProps() {
  const user: UserProfile = {
    name: "Jane Doe",
    email: "jane@example.com",
    role: "admin",
  };
  return { props: { user } };
}
\`\`\`

### How It Works:
- The \`UserProfile\` interface enforces type safety for the \`user\` prop.
- TypeScript catches errors if props don’t match (e.g., missing \`email\`).
- Use this in larger projects for better code reliability and IntelliSense support.
`;

export default typeScriptCode;
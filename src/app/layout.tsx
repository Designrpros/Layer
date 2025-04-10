// app/layout.tsx
import "./globals.css";
import Toolbar from "../components/Toolbar";
import ChatBot from "../components/ChatBot";


// Metadata for the application
export const metadata = {
  title: "Layer - Learn Web Design & Development",
  description: "Master web design and development with VSCode, Next.js, and Styled Components using Layer.",
  icons: {
    icon: "/favicon.ico", // Adjust path if needed
  },
};

// Separate viewport export
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

// RootLayout component with TypeScript typing
const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Toolbar />
        {children}
        <ChatBot />
      </body>
    </html>
  );
};

export default RootLayout;
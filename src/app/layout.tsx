import "./globals.css";
import Toolbar from "../components/Toolbar";
import ChatBot from "../components/ChatBot";
import StyledComponentsRegistry from "./styled-components-registry";

export const metadata = {
  title: "Layer - Learn Web Design & Development",
  description: "Master web design and development with VSCode, Next.js, and Styled Components using Layer.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Toolbar />
          {children}
          <ChatBot />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
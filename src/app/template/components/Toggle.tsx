// app/template/components/Toggle.tsx
import styled from "styled-components";
import { theme } from "../lib/theme";

const ToggleSection = styled.div`
  margin-bottom: 1.5rem;
`;

const ToggleButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.textDark};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: background 0.3s ease;
  &:hover { background: ${theme.colors.backgroundDark}; }
`;

const ToggleContent = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  padding: 1.5rem; /* Increased from 1rem to 1.5rem for more space */
  background: ${theme.colors.backgroundContent};
  border: 1px solid #ddd;
  border-top: none;
`;

interface ToggleProps {
  buttonText: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({
  buttonText,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <ToggleSection>
      <ToggleButton onClick={onToggle}>{buttonText}</ToggleButton>
      <ToggleContent $isOpen={isOpen}>{children}</ToggleContent>
    </ToggleSection>
  );
};

export default Toggle;
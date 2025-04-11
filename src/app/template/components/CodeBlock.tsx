// components/CodeBlock.tsx
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlockContainer = styled.div`
  position: relative;
`;

const CodeBlockStyled = styled(SyntaxHighlighter)`
  border-radius: 6px;
  padding: 1rem !important;
  margin: 0 !important;
  background: #1e1e1e !important;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textDark};
  border: none;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundDark};
  }
`;

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("Copied to clipboard!");
  };

  return (
    <CodeBlockContainer>
      <CodeBlockStyled language={language} style={vscDarkPlus}>
        {code}
      </CodeBlockStyled>
      <CopyButton onClick={copyToClipboard}>Copy</CopyButton>
    </CodeBlockContainer>
  );
};

export default CodeBlock;
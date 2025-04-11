// app/template/components/Section.tsx
import styled from "styled-components";
import { theme } from "../lib/theme";

const SectionContainer = styled.section`
  margin-bottom: 3rem;
  @media (max-width: 1200px) { margin-bottom: 2.8rem; }
  @media (max-width: 1024px) { margin-bottom: 2.6rem; }
  @media (max-width: 768px) { margin-bottom: 2.4rem; }
  @media (max-width: 600px) { margin-bottom: 2rem; }
  @media (max-width: 400px) { margin-bottom: 1.8rem; }
  @media (max-width: 320px) { margin-bottom: 1.5rem; }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: 1rem;
  border-bottom: 2px solid ${theme.colors.primary};
  padding-bottom: 0.5rem;
  @media (max-width: 1200px) {
    font-size: 2.4rem;
    margin-bottom: 0.9rem;
    padding-bottom: 0.45rem;
  }
  @media (max-width: 1024px) {
    font-size: 2.3rem;
    margin-bottom: 0.85rem;
    padding-bottom: 0.4rem;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.8rem;
    padding-bottom: 0.35rem;
  }
  @media (max-width: 600px) {
    font-size: 1.8rem;
    margin-bottom: 0.7rem;
    padding-bottom: 0.3rem;
  }
  @media (max-width: 400px) {
    font-size: 1.5rem;
    margin-bottom: 0.6rem;
    padding-bottom: 0.25rem;
  }
  @media (max-width: 320px) {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.2rem;
  }
`;

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionContainer>
  );
};

export default Section;
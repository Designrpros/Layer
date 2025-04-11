// app/template/styles/index.ts
import styled from "styled-components";
import Image from "next/image";
export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;
  background: ${({ theme }) => theme.colors.backgroundLight};
  margin: 0;
`;

export const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 95vh;
  overflow: hidden;
`;

export const HeroImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  @media (max-width: 1200px) { height: 90vh; }
  @media (max-width: 1024px) { height: 85vh; }
  @media (max-width: 768px) { height: 70vh; }
  @media (max-width: 600px) { height: 60vh; }
  @media (max-width: 400px) { height: 50vh; }
  @media (max-width: 320px) { height: 45vh; }
`;

export const HeroText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 10px;
`;

export const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textDark};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
  @media (max-width: 1200px) { font-size: 3.8rem; }
  @media (max-width: 1024px) { font-size: 3.5rem; }
  @media (max-width: 768px) { font-size: 2.5rem; }
  @media (max-width: 600px) { font-size: 2rem; }
  @media (max-width: 400px) { font-size: 1.8rem; }
  @media (max-width: 320px) { font-size: 1.6rem; }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textDark};
  margin-top: 1rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  @media (max-width: 1200px) { font-size: 1.4rem; margin-top: 0.9rem; }
  @media (max-width: 1024px) { font-size: 1.35rem; margin-top: 0.85rem; }
  @media (max-width: 768px) { font-size: 1.2rem; margin-top: 0.8rem; }
  @media (max-width: 600px) { font-size: 1.1rem; margin-top: 0.7rem; }
  @media (max-width: 400px) { font-size: 1rem; margin-top: 0.6rem; }
  @media (max-width: 320px) { font-size: 0.9rem; margin-top: 0.5rem; }
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  @media (max-width: 1200px) { max-width: 1000px; padding: 1.8rem; }
  @media (max-width: 1024px) { max-width: 900px; padding: 1.6rem; }
  @media (max-width: 768px) { max-width: 700px; padding: 1.4rem; }
  @media (max-width: 600px) { max-width: 90%; padding: 1.2rem; }
  @media (max-width: 400px) { max-width: 95%; padding: 1rem; }
  @media (max-width: 320px) { padding: 0.8rem; }
`;

export const Container = styled.div`
  padding: 80px 2rem 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

export const Text = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: 1rem;
`;
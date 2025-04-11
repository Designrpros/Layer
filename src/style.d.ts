// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      backgroundLight: string;
      backgroundDark: string;
      backgroundContent: string;
      primary: string;
      textLight: string;
      textDark: string;
    };
  }
}
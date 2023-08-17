import styled from "styled-components";
import { PagePosition } from "../types/types";

export const PageWrap = styled.div.attrs<PagePosition>((props) => ({
   style: {
      top: `${(props.$pagePos * props.$width) / 100}vh`,
      width: `${props.$width}vw`,
      height: `${props.$height}vh`,
   },
}))`
   position: absolute;
   left: 0;
   transition: all 0.5s ease;
   overflow: hidden;
`;

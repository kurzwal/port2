import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { NoiseProps, SizeProps } from "../types/types";

import Vaporwave from "./01_Vaporwave";
import { PacManStack } from "./02_PacManStack";

const PageScrollWrap = styled.div.attrs<SizeProps>((props) => ({
   style: {
      width: `${props.$width}vw`,
      height: `${props.$height}vh`,
   },
}))`
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
   box-sizing: border-box;
   overflow: hidden;
   transition: all 0.5s ease;
`;

const noiseAnimation = keyframes`
  100% {
    background-position: 50% 0, 60% 50%;
  }
`;

const NoiseBackground = styled.div.attrs<NoiseProps>((props) => ({
   style: {
      display: props.$display ? "block" : "none",
      height: `${props.$height}%`,
      top: `${props.$yPos}%`,
   },
}))`
   width: 100%;
   background: repeating-radial-gradient(#000 0 0.0001%, #fff 0 0.0002%) 50% 0/2500px
         2500px,
      repeating-conic-gradient(#000 0 0.0001%, #fff 0 0.0002%) 60% 60%/2500px
         2500px;
   background-blend-mode: difference;
   animation: ${noiseAnimation} 0.2s infinite alternate;
   position: absolute;
   z-index: 500;
`;

export const PageScroll = () => {
   const position = [{ pagePos: 0 }, { pagePos: 100 }, { pagePos: 200 }];

   const [positions, setPositions] = useState(position);
   const [pageEvent, setPageEvent] = useState(0);

   const [currentPos, setCurrentPos] = useState(0);
   const isThrottledRef = useRef(false);
   const scrollEventNum = 3;
   const [size, setSize] = useState(100);
   const [noiseDisplay, setNoiseDisplay] = useState(false);
   const toggleDelays1 = [100, 300, 50, 50];
   const toggleDelays2 = [50, 300, 100, 50];
   // noise positions
   const nps = [15, 5, 10, 25, 30, 60, 14, 20, 20, 50, 10, 90];
   // noise index
   const [ni, setNi] = useState(0);
   useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
         if (isThrottledRef.current) return;

         if (e.deltaY > 0) {
            if (currentPos == 0) {
               handleScroll(-1);
               isThrottledRef.current = true;
               setTimeout(() => {
                  isThrottledRef.current = false;
               }, 500);
            } else if (currentPos > 0 && currentPos < scrollEventNum + 1) {
               setCurrentPos(currentPos + 1);
               setPageEvent(pageEvent + 1);
               isThrottledRef.current = true;
               setTimeout(() => {
                  isThrottledRef.current = false;
               }, 700);
            } else if (currentPos == scrollEventNum + 1) {
               setCurrentPos(currentPos + 1);
               setSize(50);
               setPageEvent(pageEvent + 1);
               isThrottledRef.current = true;
               setTimeout(() => {
                  isThrottledRef.current = false;
               }, 500);
               let totalDelay = 0;
               setTimeout(() => {
                  setNi((ni + 6) % 12);
               }, toggleDelays1[0] + toggleDelays1[1]);
               for (let i = 0; i < toggleDelays1.length; i++) {
                  totalDelay += toggleDelays1[i];
                  setTimeout(() => {
                     setNoiseDisplay((prev) => !prev);
                  }, totalDelay);
               }
            }
         } else {
            if (currentPos == 1) {
               handleScroll(1);
               isThrottledRef.current = true;
               setTimeout(() => {
                  isThrottledRef.current = false;
               }, 500);
            } else if (currentPos < scrollEventNum + 2 && currentPos > 1) {
               setCurrentPos(currentPos - 1);
               setPageEvent(pageEvent - 1);
               isThrottledRef.current = true;
               setTimeout(() => {
                  isThrottledRef.current = false;
               }, 700);
            } else if (currentPos == scrollEventNum + 2) {
               setCurrentPos(currentPos - 1);
               setSize(100);
               setPageEvent(pageEvent - 1);
               isThrottledRef.current = true;
               setTimeout(() => {
                  isThrottledRef.current = false;
               }, 500);
               let totalDelay = 0;
               setTimeout(() => {
                  setNi((ni + 6) % 12);
               }, toggleDelays2[0] + toggleDelays2[1]);
               for (let i = 0; i < toggleDelays2.length; i++) {
                  totalDelay += toggleDelays2[i];
                  setTimeout(() => {
                     setNoiseDisplay((prev) => !prev);
                  }, totalDelay);
               }
            }
         }
      };

      window.addEventListener("wheel", handleWheel);

      return () => {
         window.removeEventListener("wheel", handleWheel);
      };
   }, [currentPos]);

   const handleScroll = (direction: number) => {
      setPositions((prevPos) =>
         prevPos.map((pos) => ({ pagePos: pos.pagePos + 100 * direction }))
      );
      setCurrentPos(currentPos - direction);
   };
   return (
      <PageScrollWrap $width={size} $height={size}>
         <Vaporwave
            $pagePos={positions[0].pagePos}
            $width={size}
            $height={size * 2}
         />
         <PacManStack
            $pagePos={positions[1].pagePos}
            $pageEvent={pageEvent}
            $width={size}
            $height={size}
         />
         <NoiseBackground
            $display={noiseDisplay}
            $height={nps[ni + 0]}
            $yPos={nps[ni + 1]}
         />
         <NoiseBackground
            $display={noiseDisplay}
            $height={nps[ni + 2]}
            $yPos={nps[ni + 3]}
         />
         <NoiseBackground
            $display={noiseDisplay}
            $height={nps[ni + 4]}
            $yPos={nps[ni + 5]}
         />
      </PageScrollWrap>
   );
};

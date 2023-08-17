import { PageWrap } from "./00_CompTemplates";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {
   PMAnimation,
   PMCookiePosition,
   PMFieldProps,
   PMPagePosition,
   SizeProps,
   WidthProps,
} from "../types/types";
import nodejsSVG from "../svgs/nodejs.svg";

const PacManField = styled.div.attrs<PMFieldProps>((props) => ({
   style: {
      transform: `translateX(-50%) perspective(${
         props.$width * 0.5
      }vw) rotateX(60deg)`,
      transition: `all 0.5s ${props.$trans}`,
   },
}))`
   width: 12%;
   height: 150%;
   background-color: #ffffff2e;
   position: absolute;
   top: 0;
   left: 50%;
   transform-origin: 50% 0;
`;

const openMouthPM =
   "polygon(33.33% 6.66%, 66.66% 6.66%, 66.66% 13.33%, 80% 13.33%, 80% 20%, 86.66% 20%, 86.66% 33.33%, 93.33% 33.33%, 93.33% 66.66%, 86.66% 66.66%, 86.66% 80%, 80% 80%, 80% 86.66%, 66.66% 86.66%, 66.66% 73.33%, 60% 73.33%, 60% 53.33%, 53.33% 53.33%, 53.33% 40%, 46.66% 40%, 46.66% 53.33%, 40% 53.33%, 40% 73.33%, 33.33% 73.33%, 33.33% 86.66%, 20% 86.66%, 20% 80%, 13.33% 80%, 13.33% 66.66%, 6.66% 66.66%, 6.66% 33.33%, 13.33% 33.33%, 13.33% 20%, 20% 20%, 20% 13.33%, 33.33% 13.33%)";
const closeMouthPM =
   "polygon(33.33% 6.66%, 66.66% 6.66%, 66.66% 13.33%, 80% 13.33%, 80% 20%, 86.66% 20%, 86.66% 33.33%, 93.33% 33.33%, 93.33% 66.66%, 86.66% 66.66%, 86.66% 80%, 80% 80%, 80% 86.66%, 66.66% 86.66%, 66.66% 93.33%, 33.33% 93.33%, 33.33% 86.66%, 20% 86.66%, 20% 80%, 13.33% 80%, 13.33% 66.66%, 6.66% 66.66%, 6.66% 33.33%, 13.33% 33.33%, 13.33% 20%, 20% 20%, 20% 13.33%, 33.33% 13.33%)";

const PacMan = styled.div.attrs<PMAnimation>((props) => ({
   style: {
      clipPath: props.$move ? openMouthPM : closeMouthPM,
      width: `${props.$width * 0.1}vw`,
      height: `${props.$width * 0.1}vw`,
   },
}))`
   background-color: yellow;
   position: absolute;
   top: 6.6666%;
   left: 50%;
   transform: translateX(-50%);
   box-sizing: border-box;
   z-index: 2;
   transition: all 0.5s ease;
`;

const PacManCookieContainer = styled.div.attrs<SizeProps>((props) => ({
   style: {
      top: `calc(${props.$height * 0.1}vh + ${props.$width * 0.03}vw)`,
   },
}))`
   position: absolute;
   left: 0;
   width: 100%;
   height: calc(100% - 10vh);
   overflow: hidden;
   transition: all 0.5s ease;
`;

const smallCookie =
   "polygon(25% 0%, 75% 0%, 75% 12.5%, 87.5% 12.5%, 87.5% 25%, 100% 25%, 100% 75%, 87.5% 75%, 87.5% 87.5%, 75% 87.5%, 75% 100%, 25% 100%, 25% 87.5%, 12.5% 87.5%, 12.5% 75%, 0% 75%, 0% 25%, 12.5% 25%, 12.5% 12.5%, 25% 12.5%)";
const bigCookie =
   "polygon(25% 0%, 75% 0%, 75% 25%, 100% 25%, 100% 75%, 75% 75%, 75% 100%, 25% 100%, 25% 75%, 0% 75%, 0% 25%, 25% 25%)";

const PacManCookie = styled.div.attrs<PMCookiePosition>((props) => ({
   style: {
      top: `${(props.$yPos * props.$width) / 100}vw`,
      width: `${((props.$svg ? 6 : 3) * props.$width) / 100}vw`,
      height: `${((props.$svg ? 6 : 3) * props.$width) / 100}vw`,
      backgroundImage: props.$svg ? `url(${props.$svg})` : "none",
      clipPath: props.$svg ? smallCookie : bigCookie,
      transition: props.$trans,
   },
}))`
   background-color: yellow;
   background-size: 70%;
   position: absolute;
   left: 50%;
   transform: translateX(-50%);
   background-position: center;
   background-repeat: no-repeat;
`;

const PMCookiesConfig = [
   { $yPos: 10, $svg: nodejsSVG },
   { $yPos: 22 },
   { $yPos: 32 },
   { $yPos: 42 },
   { $yPos: 54, $svg: nodejsSVG },
   { $yPos: 66 },
   { $yPos: 76 },
   { $yPos: 86 },
   { $yPos: 98, $svg: nodejsSVG },
   { $yPos: 110 },
   { $yPos: 120 },
   { $yPos: 130 },
   { $yPos: 142, $svg: nodejsSVG },
   { $yPos: 154 },
   { $yPos: 164 },
   { $yPos: 174 },
];

export const PacManStack: React.FC<PMPagePosition> = ({
   $pagePos,
   $pageEvent,
   $width,
   $height,
}) => {
   const [pMAnimation, setPMAnimation] = useState(true);
   const [isMove, setIsMove] = useState(true);
   const [cookiePos, setCookiePos] = useState(0);
   const [prevEvent, setPrevEvent] = useState(0);
   const [cookieTrans, setCookieTrans] = useState("all 0.7s linear");
   const [filedTrans, setFiledTrans] = useState(
      "cubic-bezier(0.96, 0.71, 0, 0.53)"
   );
   useEffect(() => {
      const interval = setInterval(() => {
         setPMAnimation((pMAnimation) => !pMAnimation || isMove);
      }, 166.5);
      return () => {
         clearInterval(interval);
      };
   }, [isMove]);
   useEffect(() => {
      if (
         (prevEvent == 3 && $pageEvent == 4) ||
         (prevEvent == 4 && $pageEvent == 3)
      ) {
         setCookieTrans("all 0.5s ease");
         setFiledTrans(
            prevEvent == 3
               ? "cubic-bezier(0.96, 0.71, 0, 0.53)"
               : "cubic-bezier(0.45, 0.54, 0.01, 0.84)"
         );
         setPrevEvent($pageEvent);
      } else {
         setIsMove(false);
         setCookieTrans("all 0.7s linear");
         setCookiePos(cookiePos + 44 * (prevEvent - $pageEvent));
         setPrevEvent($pageEvent);
         const timeout = setTimeout(() => {
            setIsMove(true);
         }, 1000);
         return () => {
            clearTimeout(timeout);
         };
      }
   }, [$pageEvent]);
   return (
      <PageWrap $pagePos={$pagePos} $width={$width} $height={$height}>
         <PacManField $width={$width} $trans={filedTrans}>
            <PacMan $move={pMAnimation} $width={$width} />
            <PacManCookieContainer $width={$width} $height={$height}>
               {PMCookiesConfig.map((cookie, index) => (
                  <PacManCookie
                     key={index + "ck"}
                     $yPos={cookiePos + cookie.$yPos}
                     $svg={cookie.$svg ? cookie.$svg : ""}
                     $width={$width}
                     $height={$height}
                     $trans={cookieTrans}
                  />
               ))}
            </PacManCookieContainer>
         </PacManField>
      </PageWrap>
   );
};

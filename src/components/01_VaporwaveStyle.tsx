import styled from "styled-components";
import { useState, useEffect } from "react";
import { GLProps, HeightProps, SizeProps, WidthProps } from "../types/types";

export const VpwvBg = styled.div.attrs<WidthProps>((props) => ({
   style: {
      background: `radial-gradient(
      circle ${props.$width * 0.5}vw at 50% 80%,
      rgb(190, 20, 122),
      rgb(118, 29, 82) 40%,
      rgb(56, 0, 34))`,
   },
}))`
   width: 100%;
   height: 32.5%;
   overflow: hidden;
   position: relative;
`;

export const VpwvTitle = styled.div.attrs<WidthProps>((props) => ({
   style: {
      fontSize: `${props.$width * 0.1}vw`,
      letterSpacing: `${props.$width * 0.03}vw`,
      marginBottom: `${props.$width * 0.05}vw`,
   },
}))`
   color: white;
   width: 100%;
   text-align: center;
   font-weight: 800;
   white-space: nowrap;
   pointer-events: none;
   user-select: none;
`;

const GroundLineTemplate = styled.div`
   z-index: 1;
   border-left: 3px solid #ffeaf7;
   border-top: 3px solid #ffeaf7;
   box-shadow: 0px 0px 5px 5px #f9aedb;
`;

const SunCircle = styled.div.attrs<SizeProps>((props) => ({
   style: {
      width: `${props.$height * 0.2}vh`,
      height: `${props.$height * 0.2}vh`,
      bottom: `${props.$height * 0.02}vh`,
   },
}))`
   border-radius: 50%;
   background: linear-gradient(to bottom, #ff860c, #d60035, #ff0e4a);
   position: absolute;
   left: 50%;
   transform: translateX(-50%);
`;

const SunLineContainer = styled.div.attrs<SizeProps>((props) => ({
   style: {
      width: `${props.$height * 0.205}vh`,
      height: `${props.$height * 0.205}vh`,
   },
}))`
   border-radius: 50%;
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
   overflow: hidden;
   backdrop-filter: blur(3px);
`;

interface SLProps {
   $lineWidth: number;
   $yPos: number;
   $trans: string;
}

const SunLine = styled.div.attrs<SLProps>((props) => ({
   style: {
      borderBottom: `${props.$lineWidth}px solid rgb(169, 40, 117)`,
      bottom: `${props.$yPos}%`,
      transition: props.$trans,
   },
}))`
   box-sizing: border-box;
   position: absolute;
   width: 100%;
   height: 0;
`;

const vtcLines = [
   { xPos: "05%", degree: "+85deg" },
   { xPos: "12%", degree: "+80deg" },
   { xPos: "19%", degree: "+70deg" },
   { xPos: "26%", degree: "+55deg" },
   { xPos: "33%", degree: "+40deg" },
   { xPos: "40%", degree: "+25deg" },
   { xPos: "47%", degree: "+10deg" },
   { xPos: "53%", degree: "-10deg" },
   { xPos: "60%", degree: "-25deg" },
   { xPos: "67%", degree: "-40deg" },
   { xPos: "74%", degree: "-55deg" },
   { xPos: "81%", degree: "-70deg" },
   { xPos: "88%", degree: "-80deg" },
   { xPos: "95%", degree: "-85deg" },
];

const GroundContainerWrap = styled.div`
   position: relative;
   width: 100%;
   height: 67.5%; /* 135vh */
   left: 0;
   overflow: hidden;
   background: linear-gradient(to bottom, #5c0338, #85687b 20%, #7d546d);
`;

const GroundHrzLineContainer = styled.div.attrs<HeightProps>((props) => ({
   style: {
      height: `${props.$height * 0.175}vh` /* 35vh */,
   },
}))`
   position: absolute;
   width: 100%;
   overflow: hidden;
`;

const GroundVerticalLine = styled(GroundLineTemplate).attrs<GLProps>(
   (props) => ({
      style: {
         transform: `rotate(${props.$degree ? props.$degree : "0deg"})`,
         left: props.$xPos ? props.$xPos : "50vw",
      },
   })
)`
   transform-origin: 0 0;
   box-sizing: border-box;
   position: absolute;
   width: 0;
   height: 160vh;
   top: 0;
`;

const GroundHorizonalLine = styled(GroundLineTemplate).attrs<GLProps>(
   (props) => ({
      style: {
         top: props.$yPos ? `${props.$yPos}vh` : "0vh",
         transition: props.$trans ? props.$trans : "none",
      },
   })
)`
   position: absolute;
   width: 100vw;
   height: 0;
`;

export const VpwvSun: React.FC<SizeProps> = ({ $width, $height }) => {
   const transLine = "all 0.5s linear";
   const [lines, setLines] = useState([
      { lineWidth: 30, yPos: -10, trans: transLine },
      { lineWidth: 24, yPos: 10, trans: transLine },
      { lineWidth: 18, yPos: 30, trans: transLine },
      { lineWidth: 12, yPos: 50, trans: transLine },
      { lineWidth: 0, yPos: 70, trans: transLine },
   ]);
   const [isActive, setIsActive] = useState(
      document.visibilityState === "visible"
   );

   useEffect(() => {
      const handleVisibilityChange = () => {
         if (document.visibilityState === "visible") {
            setIsActive(true);
         } else {
            setIsActive(false);
         }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
         document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
         );
      };
   }, []);
   useEffect(() => {
      if (!isActive) return;

      const intervalId = setInterval(
         () => {
            setLines((prevLines) =>
               prevLines.map((line) => {
                  let newYPos = line.yPos + 2;
                  let newLineWidth = 30 - (newYPos * 3) / 7;
                  let newTrans = transLine;
                  if (newYPos > 71) {
                     newLineWidth = 0;
                     newYPos = -10;
                     newTrans = "none";
                  }
                  return {
                     ...line,
                     yPos: newYPos,
                     lineWidth: newLineWidth,
                     trans: newTrans,
                  };
               })
            );
         },
         500,
         []
      );
      return () => clearInterval(intervalId); // 컴포넌트 언마운트시 정리
   }, [isActive]);

   return (
      <SunCircle $width={$width} $height={$height}>
         <SunLineContainer $width={$width} $height={$height}>
            {lines.map((line, index) => (
               <SunLine
                  key={index + "sunline"}
                  $lineWidth={line.lineWidth}
                  $yPos={line.yPos}
                  $trans={line.trans}
               />
            ))}
         </SunLineContainer>
         <SunLineContainer $width={$width} $height={$height} />
      </SunCircle>
   );
};

export const GroundContainer: React.FC<HeightProps> = ({ $height }) => {
   const transLinear = "all 0.15s linear";
   const [lines, setLines] = useState([
      { yPos: 0.1, trans: transLinear },
      { yPos: 0.16555, trans: transLinear },
      { yPos: 0.27409, trans: transLinear },
      { yPos: 0.45379, trans: transLinear },
      { yPos: 0.7513, trans: transLinear },
      { yPos: 1.24385, trans: transLinear },
      { yPos: 2.05932, trans: transLinear },
      { yPos: 3.40941, trans: transLinear },
      { yPos: 5.6446, trans: transLinear },
      { yPos: 9.34518, trans: transLinear },
      { yPos: 15.47185, trans: transLinear },
      { yPos: 25.61513, trans: transLinear },
   ]);
   const [isActive, setIsActive] = useState(
      document.visibilityState === "visible"
   );

   useEffect(() => {
      const handleVisibilityChange = () => {
         if (document.visibilityState === "visible") {
            setIsActive(true);
         } else {
            setIsActive(false);
         }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
         document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
         );
      };
   }, []);
   useEffect(() => {
      if (!isActive) return;
      const intervalId = setInterval(() => {
         setLines((prevLines) =>
            prevLines.map((line) => {
               let newYPos = line.yPos * 1.183;
               let newTrans = transLinear;
               if (newYPos > 42) {
                  newYPos = 0.1;
                  newTrans = "none";
               }
               return {
                  ...line,
                  yPos: newYPos,
                  trans: newTrans,
               };
            })
         );
      }, 150);
      return () => clearInterval(intervalId);
   }, [isActive]);

   return (
      <GroundContainerWrap>
         <GroundHorizonalLine />
         <GroundHrzLineContainer $height={$height}>
            {lines.map((line, index) => (
               <GroundHorizonalLine
                  key={index + "hzn"}
                  $yPos={line.yPos * $height / 200}
                  $trans={line.trans}
               />
            ))}
         </GroundHrzLineContainer>
         {vtcLines.map((line, index) => (
            <GroundVerticalLine
               key={index + "vtc"}
               $xPos={line.xPos}
               $degree={line.degree}
            />
         ))}
      </GroundContainerWrap>
   );
};

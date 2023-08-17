import { PagePosition } from "../types/types";
import { PageWrap } from "./00_CompTemplates";
import {
   GroundContainer,
   VpwvBg,
   VpwvTitle,
   VpwvSun,
} from "./01_VaporwaveStyle";

const Vaporwave: React.FC<PagePosition> = ({ $pagePos, $width, $height }) => {
   return (
      <PageWrap $pagePos={$pagePos} $width={$width} $height={$height}>
         <VpwvBg $width={$width}>
            <VpwvTitle $width={$width}>OPEN YOU UP</VpwvTitle>
            <VpwvTitle $width={$width}>PORTPOLIO</VpwvTitle>
            <VpwvSun $width={$width} $height={$height} />
         </VpwvBg>
         <GroundContainer $height={$height} />
      </PageWrap>
   );
};
export default Vaporwave;

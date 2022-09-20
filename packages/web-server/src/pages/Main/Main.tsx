/*------------------------------------------------------------------------------------------------------------------------------------------
 * Main.tsx
 * WRITER : 최정근
 * DATE : 2022-09-01
 * DISCRIPTION : 
 * TYPE : Page
 * 개정이력 :
--------------------------------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import axios from 'axios';
import Util from 'common/util';

import SO_GOOD from 'resource/image/so-good.png';
import { DivisionBox } from 'lib/AmzPack';

interface MainProps {}
function Main(props: MainProps) {
  /* ――――――――――――――― Variable ――――――――――――――― */
  /* ===== Props ===== */
  const {} = props;

  /* ===== State ===== */

  /* ===== Const ===== */

  /* ====== API ====== */

  /* ―――――――――――――――― Method ―――――――――――――――― */

  /* ―――――――――――――― Use Effect ―――――――――――――― */

  /* ―――――――――――――――― Return ―――――――――――――――― */
  return (
    <DivisionBox data-page="main" template="80px 80px auto" direction="VERTICAL" horizonAlign="center">
      <p>제 발로 찾아오다니!</p>
      <p>협조적이라 좋구나!</p>
      <img src={SO_GOOD} />
    </DivisionBox>
  );
}

namespace Main {}

export default Main;

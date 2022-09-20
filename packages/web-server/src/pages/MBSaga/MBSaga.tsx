/*------------------------------------------------------------------------------------------------------------------------------------------
 * MBSaga.tsx
 * WRITER : 모시깽이
 * DATE : 20XX-XX-XX
 * DISCRIPTION : 
 * TYPE : Page
 * 개정이력 :
--------------------------------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ANT_DEN from '../../resource/sound/ant-den.mp3';
import { MB_NA } from '../../common/const/mb';
import Util from '../../common/util';

interface MBSagaProps {}

function MBSaga(props: MBSagaProps) {
  /* ――――――――――――――― Variable ――――――――――――――― */
  /* ===== Props ===== */
  const {} = props;
  const mbList = [...MB_NA];
  /* ===== State ===== */
  const [mbIdx, setMbIdx] = React.useState<number>(0);
  /* ===== Const ===== */
  /* ====== API ====== */

  /* ―――――――――――――――― Method ―――――――――――――――― */
  /* ―――――――――――――― Use Effect ―――――――――――――― */
  React.useEffect(() => {}, []);

  /* ―――――――――――――――― Return ―――――――――――――――― */
  return (
    <div data-page="mbSaga">
      <header>
        <ReactAudioPlayer src={ANT_DEN} autoPlay loop controls />
        <div>
          <ul className="select-list">
            {mbList.map((v, i) => {
              return (
                <li key={i} onClick={() => setMbIdx(i)}>
                  <span>{`${i}`}</span>
                  <span>{`${v.title}`}</span>
                  <span>{`${Util.format.date(v.date, 'Y-M-D')}`}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
      <article>
        {mbList.map((v, i) => {
          return mbIdx === i ? (
            <div className="main-box" key={i}>
              <div className="date">{`${Util.format.date(v.date, 'Y-M-D')}`}</div>
              <div className="contents">{v.contents}</div>
            </div>
          ) : null;
        })}
      </article>
    </div>
  );
}

namespace MBSaga {}

export default MBSaga;

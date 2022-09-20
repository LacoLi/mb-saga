/*------------------------------------------------------------------------------------------------------------------------------------------
 * Bible.tsx
 * WRITER : 모시깽이
 * DATE : 20XX-XX-XX
 * DISCRIPTION : 
 * TYPE : Page
 * 개정이력 :
--------------------------------------------------------------------------------------------------------------------------------------------*/
import Death from 'component/Death';
import { DivisionBox } from 'lib/AmzPack';
import { useNavigate } from 'react-router-dom';
import MB_ART_01 from 'resource/image/mb-art-01.png';

interface BibleProps {}

function Bible(props: BibleProps) {
  /* ――――――――――――――― Variable ――――――――――――――― */
  /* ===== Props ===== */
  const {} = props;
  /* ===== State ===== */
  /* ===== Const ===== */
  const navigate = useNavigate();

  /* ====== API ====== */

  /* ―――――――――――――――― Method ―――――――――――――――― */

  /* ―――――――――――――― Use Effect ―――――――――――――― */

  /* ―――――――――――――――― Return ―――――――――――――――― */
  return (
    <DivisionBox data-page="bible" template="auto max-content max-content auto" direction="VERTICAL" verticalAlign="center" horizonAlign="center">
      <DivisionBox className="title-box" verticalAlign="end">
        <em>MB BIBLE</em>
      </DivisionBox>
      <div className="death-box">
        <Death title="MB is comming..." />
      </div>
      <DivisionBox className="button-box" template="max-content" horizonAlign="center" gap="10px" repeat>
        <button className="blog" onClick={() => navigate('/mb-saga')}>
          <em>Blog</em>
        </button>
        <button className="twitch" onClick={() => alert('준비중 입니다...')}>
          <em>Twitch</em>
        </button>
      </DivisionBox>
      <div></div>
    </DivisionBox>
  );
}

namespace Bible {}

export default Bible;

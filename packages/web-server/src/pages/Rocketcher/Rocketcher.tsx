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
import Eevee from 'component/Eevee';
import PokemonFriends from 'component/PokemonFriends';
import MysteriousGarden from 'component/MysteriousGarden';
import Pikaboo from 'component/Pikaboo';
import PumpkinPikachu from 'component/PumpkinPikachu';
import { useParams } from 'react-router-dom';
import Util from 'common/util';

type RocketcherInfoType = {
  huntTotal: string;
  huntGrunt: string;
  huntLeader: string;
  huntEventNPC: string;
  durationTime: string;
  averageTime: string;
  stardust: number;
  lastHunt: string;
  timeSinceLastHunt: string;
  status: string;
};

type InfoType =
  | {
      result: 'fail';
    }
  | {
      result: 'ok';
      data?: RocketcherInfoType;
    };

interface MainProps {}
function Main(props: MainProps) {
  /* ――――――――――――――― Variable ――――――――――――――― */
  /* ===== Props ===== */
  const { username } = useParams();
  const {} = props;

  /* ===== State ===== */
  const [info, setInfo] = React.useState<InfoType>();

  /* ===== Const ===== */
  const lastHunt = (() => {
    if (info?.result === 'ok' && !!info.data) {
      const time = Math.floor(getDifferenceInSeconds(new Date(info.data.lastHunt).getTime(), new Date().getTime()));
      const second = Math.floor(time % 60);
      const minute = Math.floor((time / 60) % 60);
      const hour = Math.floor(time / 60 / 60);

      return `${hour > 0 ? `${hour}시` : ''} ${minute > 0 ? `${minute}분` : ''} ${second > 0 ? `${second}초` : ''}`;
    } else return '';
  })();

  /* ====== API ====== */
  const getInfo = () => {
    const split = window.location.origin.split(':');
    const domain = `${split[0]}:${split[1]}`;
    const url = `${domain}:666`;
    console.log('--> Get Info ' + domain);

    axios
      .get(`${url}/show/${username}`)
      .then((response) => {
        setInfo(response.data);
      })
      .catch((e) => {
        console.log('[Error] ', e);
      });
  };

  /* ―――――――――――――――― Method ―――――――――――――――― */
  function getDifferenceInSeconds(date1: number, date2: number) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / 1000;
  }

  /* ―――――――――――――― Use Effect ―――――――――――――― */
  React.useEffect(() => {
    getInfo();
  }, []);

  Util.interval.useInterval(() => {
    getInfo();
  }, 10000);

  /* ―――――――――――――――― Return ―――――――――――――――― */
  return (
    // <div data-page="main" className='mint-grad-bg'>
    <div data-page="rocketcher">
      {/* <Eevee />
      <PokemonFriends />
      <MysteriousGarden />
      <PumpkinPikachu /> */}
      <Pikaboo />
      <div className="info-card">
        <div className="wrapper">
          {/* Username */}
          <em className="username">{username}</em>
          {/* 사냥현황 */}
          <em className="title">
            <i className={`fa-solid fa-wand-sparkles`} />
            <em>사냥현황</em>
          </em>

          <em className="header">전체</em>
          <em>{info?.result === 'ok' && `${Util.format.insertComma(info.data?.huntTotal ?? '')} 마리`}</em>

          <em className="header">조무래기</em>
          <em>{info?.result === 'ok' && `${Util.format.insertComma(info.data?.huntGrunt ?? '')} 마리`}</em>

          <em className="header">리더</em>
          <em>{info?.result === 'ok' && `${Util.format.insertComma(info.data?.huntLeader ?? '')} 마리`}</em>

          <em className="header">이벤트NPC</em>
          <em>{info?.result === 'ok' && `${Util.format.insertComma(info.data?.huntEventNPC ?? '')} 마리`}</em>

          {/* 기록 */}
          <em className="title">
            <i className={`fa-solid fa-skull`} />
            <em>기록</em>
          </em>

          <em className="header">누적 사냥 시간</em>
          <em>{info?.result === 'ok' && (info.data?.durationTime ?? '-')}</em>

          <em className="header">평균 사냥 시간</em>
          <em>{info?.result === 'ok' && `${info.data?.averageTime ?? '-'}초`}</em>

          <em className="header">최근 사냥</em>
          <em>{info?.result === 'ok' && `${lastHunt ?? '-'} 전`}</em>

          <em className="header">별의 모래</em>
          <em>{info?.result === 'ok' && Util.format.insertComma(info.data?.stardust ?? '')}</em>

          {/* 상태 */}
          <em className="title">
            <i className={`fa-solid fa-book-skull`} />
            <em>상태</em>
          </em>

          <em className={`header ${info?.result === 'ok' && info.data?.status === '생존' ? 'alive' : 'death'}`}>
            {info?.result === 'ok' && (info.data?.status ?? '-')}
          </em>
        </div>
        <div className="mascot">
          <PumpkinPikachu />
        </div>
      </div>
    </div>
  );
}

namespace Main {}

export default Main;

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
import { MB_NA, IMBData } from '../../common/const/mb-me';
import Util from '../../common/util';
import classNames from 'classnames';
import MB_PROFILE from '../../resource/image/gmb-profile.png';
import MB_ART_02 from '../../resource/image/mb-art-02.png';
import { useParams } from 'react-router-dom';

interface MBSagaProps {}

enum searchType {
  ALL = 'A',
  INDEX = 'I',
  TITLE = 'T',
  CONTENTS = 'C',
}

enum sortTargetType {
  INDEX = 'I',
  TITLE = 'T',
  DATE = 'D',
}

enum sortType {
  ASC,
  DESC,
}

function MBSaga(props: MBSagaProps) {
  /* ――――――――――――――― Variable ――――――――――――――― */
  /* ===== Props ===== */
  const {} = props;
  const { id } = useParams();

  /* ===== Const ===== */
  const mbList = [...MB_NA];

  /* ===== State ===== */
  const [searchOption, setSearchOption] = React.useState<{
    type: searchType;
    text: string;
  }>({ type: searchType.ALL, text: '' });
  const [sortOption, setSortOption] = React.useState<{ type: sortTargetType; sort: sortType }>({
    type: sortTargetType.INDEX,
    sort: sortType.ASC,
  });
  const [mbIdx, setMbIdx] = React.useState<number>(!!id ? Number(id) : Math.floor(Math.random() * mbList.length));
  const [mbData, setMbData] = React.useState<IMBData>(mbList[mbIdx]);
  const [mbHidden, setMbHidden] = React.useState<boolean>(false);
  const [mbPlayer, setMbPlayer] = React.useState<boolean>(false);

  /* ===== Ref ===== */
  const ref = React.useRef<HTMLDivElement>(null);

  /* ====== API ====== */

  /* ―――――――――――――――― Method ―――――――――――――――― */
  const handleSearchChange = (option: typeof searchOption) => {
    setSearchOption(option);
  };
  const handleSortHader = (option: typeof sortOption) => {
    if (sortOption.type !== option.type) {
      setSortOption({ ...option, sort: sortType.ASC });
    } else {
      setSortOption({ ...option, sort: sortOption.sort === sortType.ASC ? sortType.DESC : sortType.ASC });
    }
  };
  const handleListClick = (v: IMBData, i: number) => {
    setMbIdx(i);
    setMbData(v);
    if (!!ref.current) ref.current.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const speakGodMBText = () => {
    //if (typeof SpeechSynthesisUtterance === 'undefined' || typeof window.speechSynthesis === 'undefined') {
    //  return;
    //}

    window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화

    const speechMsg = new SpeechSynthesisUtterance();
    speechMsg.rate = 1; // 속도: 0.1 ~ 10
    speechMsg.pitch = 1; // 음높이: 0 ~ 2
    speechMsg.lang = 'ko-KR';
    speechMsg.text = mbData.contents;

    // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
    window.speechSynthesis.speak(speechMsg);
  };
  const getSortClass = (type: sortTargetType) => {
    let returnClass = '';

    if (type === sortOption.type) {
      returnClass = `sort-${sortOption.sort === sortType.ASC ? 'asc' : 'desc'}`;
    }

    return returnClass;
  };

  /* ―――――――――――――― Use Effect ―――――――――――――― */
  React.useEffect(() => {
    if (!!mbPlayer) {
      speakGodMBText();
    } else {
      window.speechSynthesis.cancel();
    }
  }, [mbPlayer, mbData.contents]);

  /* ―――――――――――――――― Return ―――――――――――――――― */
  return (
    <div data-page="mbSaga">
      <header className={classNames(mbHidden ? 'hide-list' : '')}>
        <ReactAudioPlayer src={ANT_DEN} autoPlay={true} loop />
        <div className="search">
          <select value={searchOption.type} onChange={(v) => handleSearchChange({ ...searchOption, type: v.target.value as searchType })}>
            <option value={searchType.ALL}>{`전체`}</option>
            <option value={searchType.INDEX}>{`색인`}</option>
            <option value={searchType.TITLE}>{`제목`}</option>
            <option value={searchType.CONTENTS}>{`내용`}</option>
          </select>
          <input value={searchOption.text} onChange={(v) => handleSearchChange({ ...searchOption, text: v.target.value })} />
          <div className="list-control" onClick={() => setMbHidden(!mbHidden)}></div>
        </div>
        <ul className="select-list">
          <li className="select-header">
            <span
              className={classNames(getSortClass(sortTargetType.INDEX))}
              onClick={() => handleSortHader({ ...sortOption, type: sortTargetType.INDEX })}
            >
              색인
            </span>
            <span
              className={classNames(getSortClass(sortTargetType.TITLE))}
              onClick={() => handleSortHader({ ...sortOption, type: sortTargetType.TITLE })}
            >
              제목
            </span>
            <span
              className={classNames(getSortClass(sortTargetType.DATE))}
              onClick={() => handleSortHader({ ...sortOption, type: sortTargetType.DATE })}
            >
              날짜
            </span>
          </li>
          {mbList
            .filter((v, i) => {
              switch (searchOption.type) {
                case searchType.ALL:
                  return searchOption.text === ''
                    ? true
                    : i === Number(searchOption.text) || v.title.includes(searchOption.text) || v.contents.includes(searchOption.text);
                case searchType.INDEX:
                  return searchOption.text === '' ? true : i === Number(searchOption.text);
                case searchType.TITLE:
                  return v.title.includes(searchOption.text);
                case searchType.CONTENTS:
                  return v.contents.includes(searchOption.text);
                default:
                  return false;
              }
            })
            .sort((a, b) => {
              if (sortOption.type === sortTargetType.INDEX) {
                return sortOption.sort === sortType.ASC ? 1 : -1;
              } else if (sortOption.type === sortTargetType.TITLE) {
                return a.title > b.title
                  ? -1 * (sortOption.sort === sortType.ASC ? -1 : 1)
                  : a.title === b.title
                  ? 0
                  : 1 * (sortOption.sort === sortType.ASC ? -1 : 1);
              } else if (sortOption.type === sortTargetType.DATE) {
                return a.date > b.date
                  ? -1 * (sortOption.sort === sortType.ASC ? -1 : 1)
                  : a.date === b.date
                  ? 0
                  : 1 * (sortOption.sort === sortType.ASC ? -1 : 1);
              } else {
                return 1;
              }
            })
            .map((v, i) => {
              return (
                <li
                  key={i}
                  onClick={() =>
                    handleListClick(
                      v,
                      mbList.findIndex((vv, ii) => vv.title === v.title),
                    )
                  }
                >
                  <span>{`${mbList.findIndex((vv, ii) => vv.title === v.title)}`}</span>
                  <span>{`${v.title}`}</span>
                  <span>{`${Util.format.date(v.date, 'Y-M-D')}`}</span>
                </li>
              );
            })}
        </ul>
      </header>
      <div className="title">{`[${mbIdx}] ${mbData.title}`}</div>
      <article>
        <div className={classNames('speak-player', !mbPlayer ? 'stop' : '')} onClick={() => setMbPlayer(!mbPlayer)}></div>
        <div className="main-box">
          <img src={MB_ART_02} alt="GOD MB" />
          <div className="main-box-wrap" ref={ref}>
            <div className="date">{`${Util.format.date(mbData.date, 'Y-M-D')}`}</div>
            <div className="contents">{`${mbData.contents}`}</div>
          </div>
        </div>
      </article>
    </div>
  );
}

namespace MBSaga {}

export default MBSaga;

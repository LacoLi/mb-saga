/*------------------------------------------------------------------------------------------------------------------------------------------
 * MBSaga.tsx
 * WRITER : 모시깽이
 * DATE : 20XX-XX-XX
 * DISCRIPTION : 
 * TYPE : Page
 * 개정이력 :
--------------------------------------------------------------------------------------------------------------------------------------------*/
import React, { useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ANT_DEN from '../../resource/sound/ant-den.mp3';
import { MB_ME, IMBData, TagColor } from '../../common/const/mb-me';
import { MB_GRAFFITI } from '../../common/const/mb-graffiti';
import Util from '../../common/util';
import classNames from 'classnames';
import MB_PROFILE from '../../resource/image/gmb-profile.png';
import MB_ART_02 from '../../resource/image/mb-art-02.png';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from 'lib/AmzPack';
import MDEditor from '@uiw/react-md-editor';

interface MBSagaProps { }

enum BlogCategoryType {
  ME = 'me',
  GRAFFITI = 'graffiti',
}

enum SearchType {
  ALL = 'ALL',
  INDEX = 'INDEX',
  TITLE = 'TITLE',
  CONTENTS = 'CONTENTS',
  TAG = 'TAG',
}

enum SortTargetType {
  INDEX = 'INDEX',
  TITLE = 'TITLE',
  TAG = 'TAG',
  DATE = 'DATE',
}

enum SortType {
  ASC,
  DESC,
}

enum ViewerType {
  TEXT,
  MARKDOWN,
}

function MBSaga(props: MBSagaProps) {
  /* ――――――――――――――― Variable ――――――――――――――― */
  /* ===== Props ===== */
  const { } = props;
  const { paramNav = BlogCategoryType.ME, paramId } = useParams();

  /* ===== Const ===== */
  const domain = window.location.href.replace('http://', '').split('/')[0];

  /* ===== State ===== */
  const [navi, setNavi] = React.useState<BlogCategoryType>(paramNav === BlogCategoryType.ME ? BlogCategoryType.ME : BlogCategoryType.GRAFFITI);
  const [mbList, setMbList] = React.useState<IMBData[]>(paramNav === BlogCategoryType.ME ? [...MB_ME] : [...MB_GRAFFITI]);
  const [searchOption, setSearchOption] = React.useState<{
    type: SearchType;
    text: string;
  }>({ type: SearchType.ALL, text: '' });
  const [sortOption, setSortOption] = React.useState<{ type: SortTargetType; sort: SortType }>({
    type: SortTargetType.INDEX,
    sort: SortType.ASC,
  });
  const [mbIdx, setMbIdx] = React.useState<number>(!!paramId ? Number(paramId) : Math.floor(Math.random() * mbList.length));
  const [mbData, setMbData] = React.useState<{
    category: BlogCategoryType;
    data: IMBData;
  }>({
    category: paramNav === BlogCategoryType.ME ? BlogCategoryType.ME : BlogCategoryType.GRAFFITI,
    data: mbList[mbIdx],
  });
  const [mbHidden, setMbHidden] = React.useState<boolean>(false);
  const [mbPlayer, setMbPlayer] = React.useState<boolean>(false);
  const [mbSpeakContents, setMbSpeakContents] = React.useState<string | undefined>(undefined);
  const [infoVisits, setInfoVisits] = React.useState<number>(0);
  const [infoHates, setInfoHates] = React.useState<number>(0);
  const [infoJonnaHates, setInfoJonnaHates] = React.useState<number>(0);
  const [viewer, setViewer] = React.useState<ViewerType>(ViewerType.TEXT);

  /* ===== Ref ===== */
  const listRef = React.useRef<HTMLUListElement>(null);
  const contentsRef = React.useRef<HTMLDivElement>(null);

  /* ====== API ====== */
  //const API_SERVER = `http://${domain}:666`;
  //const API_SERVER = 'http://bible.hmbgaq.com:666';
  const split = window.location.origin.split(':');
  const ip = `${split[0]}:${split[1]}`;
  const API_SERVER = `${ip}:666`;

  // 방문자 수 조회 (GET - /blog/visit/:category/:storyId)
  async function getVisits(category: BlogCategoryType, storyId: string) {
    let visits = 0;
    const res = await axios.get(`${API_SERVER}/blog/visit/${category}/${storyId}`);
    if (res.data.result === 'ok') {
      visits = res.data.data.visits;
      setInfoVisits(visits ?? 0);
    }

    return visits;
  }

  // 방문자 수 증가 (PUT - /blog/visit/:category/:storyId)
  async function addVisits(category: BlogCategoryType, storyId: string) {
    const res = await axios.put(`${API_SERVER}/blog/visit/${category}/${storyId}`);

    if (res.data.result === 'ok') {
      await getVisits(category, storyId);
    }

    return res.data.result === 'ok';
  }

  // 싫어요 (PUT - /blog/evaluation/dislike/:category/:storyId)
  async function addDislike(category: BlogCategoryType, storyId: string) {
    alert('싫어요!');
    const res = await axios.put(`${API_SERVER}/blog/evaluation/dislike/${category}/${storyId}`);

    if (res.data.result === 'ok') {
      await getEvaluation(category, storyId);
    }

    return res.data.result === 'ok';
  }

  // Jonna 싫어요 (PUT - /blog/evaluation/detest/:category/:storyId)
  async function addDetest(category: BlogCategoryType, storyId: string) {
    alert('존나 싫어요!');
    const res = await axios.put(`${API_SERVER}/blog/evaluation/detest/${category}/${storyId}`);

    if (res.data.result === 'ok') {
      await getEvaluation(category, storyId);
    }

    return res.data.result === 'ok';
  }

  // 싫어요, Jonna 싫어요 개수 조회 (GET - /blog/evaluation/:category/:storyId)
  async function getEvaluation(category: BlogCategoryType, storyId: string) {
    let evaluation = {
      dislike: 0,
      detest: 0,
    };
    const res = await axios.get(`${API_SERVER}/blog/evaluation/${category}/${storyId}`);

    if (res.data.result === 'ok') {
      evaluation = res.data;

      setInfoHates(Number(res.data.data.dislike ?? 0));
      setInfoJonnaHates(Number(res.data.data.detest ?? 0));
    }

    return evaluation;
  }

  /* ―――――――――――――――― Method ―――――――――――――――― */
  const handleNavClick = (v: BlogCategoryType) => {
    setNavi(v);
    if (!!listRef.current) listRef.current.scrollTo({ top: 0 });
  };
  const handleSearchChange = (option: typeof searchOption) => {
    setSearchOption(option);
  };
  const handleSortHeaderClick = (option: typeof sortOption) => {
    if (sortOption.type !== option.type) {
      setSortOption({ ...option, sort: SortType.ASC });
    } else {
      setSortOption({ ...option, sort: sortOption.sort === SortType.ASC ? SortType.DESC : SortType.ASC });
    }
  };
  const handleListClick = (v: IMBData, i: number) => {
    setMbIdx(i);
    setMbData({
      category: navi,
      data: v,
    });
    setMbSpeakContents(undefined);
    if (!!contentsRef.current) contentsRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleContentsMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //const speakContents = !!document.getSelection() ? document.getSelection()?.toString() : undefined;
    //if (!!mbPlayer && !speakContents) return;
    //setMbSpeakContents(speakContents);
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
    speechMsg.text = !!mbSpeakContents ? mbSpeakContents : mbData.data.contents;

    speechMsg.onend = () => {
      //if (!!mbPlayer) setMbSpeakContents(undefined);

      setMbPlayer(false);
    };

    // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
    window.speechSynthesis.speak(speechMsg);
  };
  const getSortClass = (type: SortTargetType) => {
    let returnClass = '';

    if (type === sortOption.type) {
      returnClass = `sort-${sortOption.sort === SortType.ASC ? 'asc' : 'desc'}`;
    }

    return returnClass;
  };
  const copyURL = () => {
    const tempElement = document.createElement('textarea');
    document.body.appendChild(tempElement);
    tempElement.readOnly = true;
    tempElement.value = `http://${domain}/mb-saga/${mbData.category}/${mbIdx}`;
    tempElement.select();
    document.execCommand('copy');

    alert('클립보드에 링크가 복사되었습니다.');

    document.body.removeChild(tempElement);
  };

  /* ―――――――――――――― Use Effect ―――――――――――――― */
  React.useEffect(() => {
    if (!!mbPlayer) {
      speakGodMBText();
    } else {
      window.speechSynthesis.cancel();
    }
  }, [mbPlayer, mbSpeakContents, mbData.data.contents]);

  React.useEffect(() => {
    setMbList(navi === BlogCategoryType.ME ? [...MB_ME] : [...MB_GRAFFITI]);
  }, [navi]);

  React.useEffect(() => {
    // 방문자 수 증가
    (async () => {
      await addVisits(navi, mbIdx.toString());
    })();

    // 싫어요, Jonna 싫어요 개수 조회
    (async () => {
      await getEvaluation(navi, mbIdx.toString());
    })();
  }, [JSON.stringify(mbData)]);

  /* ―――――――――――――――― Return ―――――――――――――――― */
  return (
    <div data-page="mbSaga" className={classNames(mbData.data.tag.length > 0 ? 'use-tags' : '')}>
      <nav>
        <ul>
          <li className={classNames(navi === BlogCategoryType.ME ? 'active' : '')}>
            <span onClick={() => handleNavClick(BlogCategoryType.ME)}>나</span>
          </li>
          <li className={classNames(navi === BlogCategoryType.GRAFFITI ? 'active' : '')}>
            <span onClick={() => handleNavClick(BlogCategoryType.GRAFFITI)}>낙서장</span>
          </li>
        </ul>
      </nav>
      <header className={classNames(mbHidden ? 'hide-list' : '')}>
        <ReactAudioPlayer src={ANT_DEN} autoPlay={true} loop />
        <div className="search">
          <select value={searchOption.type} onChange={(v) => handleSearchChange({ ...searchOption, type: v.target.value as SearchType })}>
            <option value={SearchType.ALL}>{`전체`}</option>
            <option value={SearchType.INDEX}>{`색인`}</option>
            <option value={SearchType.TITLE}>{`제목`}</option>
            <option value={SearchType.CONTENTS}>{`내용`}</option>
            <option value={SearchType.TAG}>{`태그`}</option>
          </select>
          <input value={searchOption.text} onChange={(v) => handleSearchChange({ ...searchOption, text: v.target.value })} />
          <div className="list-control" onClick={() => setMbHidden(!mbHidden)}></div>
        </div>
        <ul className="select-list" ref={listRef}>
          <li className="select-header">
            <span
              className={classNames(getSortClass(SortTargetType.INDEX))}
              onClick={() => handleSortHeaderClick({ ...sortOption, type: SortTargetType.INDEX })}
            >
              색인
            </span>
            <span
              className={classNames(getSortClass(SortTargetType.TITLE))}
              onClick={() => handleSortHeaderClick({ ...sortOption, type: SortTargetType.TITLE })}
            >
              제목
            </span>
            <span
              className={classNames(getSortClass(SortTargetType.TAG))}
              onClick={() => handleSortHeaderClick({ ...sortOption, type: SortTargetType.TAG })}
            >
              태그
            </span>
            <span
              className={classNames(getSortClass(SortTargetType.DATE))}
              onClick={() => handleSortHeaderClick({ ...sortOption, type: SortTargetType.DATE })}
            >
              날짜
            </span>
          </li>
          {mbList
            .filter((v, i) => {
              switch (searchOption.type) {
                case SearchType.ALL:
                  return searchOption.text === ''
                    ? true
                    : i === Number(searchOption.text) ||
                    v.title.includes(searchOption.text) ||
                    v.contents.includes(searchOption.text) ||
                    v.tag.filter((ele) => new RegExp(searchOption.text).test(ele)).length > 0;
                case SearchType.INDEX:
                  return searchOption.text === '' ? true : i === Number(searchOption.text);
                case SearchType.TITLE:
                  return v.title.includes(searchOption.text);
                case SearchType.CONTENTS:
                  return v.contents.includes(searchOption.text);
                case SearchType.TAG:
                  return searchOption.text === '' ? true : v.tag.filter((ele) => new RegExp(searchOption.text).test(ele)).length > 0;
                default:
                  return false;
              }
            })
            .sort((a, b) => {
              if (sortOption.type === SortTargetType.INDEX) {
                return sortOption.sort === SortType.ASC ? 1 : -1;
              } else if (sortOption.type === SortTargetType.TITLE) {
                return a.title > b.title
                  ? -1 * (sortOption.sort === SortType.ASC ? -1 : 1)
                  : a.title === b.title
                    ? 0
                    : 1 * (sortOption.sort === SortType.ASC ? -1 : 1);
              } else if (sortOption.type === SortTargetType.DATE) {
                return a.date > b.date
                  ? -1 * (sortOption.sort === SortType.ASC ? -1 : 1)
                  : a.date === b.date
                    ? 0
                    : 1 * (sortOption.sort === SortType.ASC ? -1 : 1);
              } else if (sortOption.type === SortTargetType.TAG) {
                return a.tag.length > b.tag.length
                  ? -1 * (sortOption.sort === SortType.ASC ? -1 : 1)
                  : a.tag.length === b.tag.length
                    ? 0
                    : 1 * (sortOption.sort === SortType.ASC ? -1 : 1);
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
                  <span>{`${v.tag}`}</span>
                  <span>{`${Util.format.date(v.date, 'Y-M-D')}`}</span>
                </li>
              );
            })}
        </ul>
      </header>
      <div className="title">{`[${mbIdx}] ${mbData.data.title}`}</div>
      {mbData.data.tag.length > 0 ? (
        <div className="tags">
          {mbData.data.tag.map((v, i) => {
            return (
              <span
                key={i}
                className={classNames('tag', TagColor[v].dangerous ? 'dangerous' : '')}
                style={{
                  backgroundColor: TagColor[v].color,
                }}
              >
                {v}
              </span>
            );
          })}
        </div>
      ) : null}
      <article>
        <section className="info-section">
          <span>
            {`조회수 `}
            <em>{`${Util.format.insertComma(infoVisits)}`}</em>
            {`회`}
          </span>
          <span>
            {`싫어요 `}
            <em>{`${Util.format.insertComma(infoHates)}`}</em>
            {`회`}
          </span>
          <span>
            {`X싫어요 `}
            <em>{`${Util.format.insertComma(infoJonnaHates)}`}</em>
            {`회`}
          </span>
          <span>
            <em>{`${Util.format.date(mbData.data.date, 'Y-M-D')}`}</em>
          </span>
        </section>
        <section className="use-section">
          <div className="hate" onClick={() => addDislike(navi, mbIdx.toString())}>
            <Icon name="thumbs-down" type="solid" />
            <em>싫어요</em>
          </div>
          <div className="jonna-hate" onClick={() => addDetest(navi, mbIdx.toString())}>
            <Icon name="hand-middle-finger" type="solid" />
            <em>X싫어요</em>
          </div>
          <div className="copy" onClick={() => copyURL()}>
            <Icon name="paperclip" type="solid" />
            <em>공유</em>
          </div>
          <div className="viewer" onClick={() => setViewer(ViewerType.TEXT)}>
            <Icon name="t" type="solid" />
            <em>Text</em>
          </div>
          <div className="viewer" onClick={() => setViewer(ViewerType.MARKDOWN)}>
            <Icon name="markdown" type="brands" />
            <em>Markdown</em>
          </div>
        </section>
        <div className={classNames('speak-player', !mbPlayer ? 'stop' : '')} onClick={() => setMbPlayer(!mbPlayer)} style={{ display: 'none' }}></div>
        <div className={'copy-url'} onClick={() => copyURL()} style={{ display: 'none' }}></div>
        <div className="main-box">
          <img src={MB_ART_02} alt="GOD MB" />
          <div className="main-box-wrap" ref={contentsRef}>
            {viewer === ViewerType.TEXT ? <div className="contents" onMouseUp={handleContentsMouseUp}>
              {!!mbData.data.highlight ? <span className="highlight">{mbData.data.highlight}</span> : null}
              {`${mbData.data.contents}`}
            </div> : null}
            {viewer === ViewerType.MARKDOWN ? <MDEditor.Markdown source={mbData.data.contents} /> : null}
          </div>
        </div>
      </article>
      <textarea id="copyTextarea"></textarea>
    </div>
  );
}

namespace MBSaga { }

export default MBSaga;

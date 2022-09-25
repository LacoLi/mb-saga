/*------------------------------------------------------------------------------------------------------------------------------------------
 * Translate.tsx
 * WRITER : 모시깽이
 * DATE : 20XX-XX-XX
 * DISCRIPTION : 
 * TYPE : Page
 * 개정이력 :
--------------------------------------------------------------------------------------------------------------------------------------------*/
import { MB_GRAFFITI } from 'common/const/mb-graffiti';
import { MB_ME } from 'common/const/mb-me';
import { DivisionBox } from 'lib/AmzPack';
import React from 'react';
import MDEditor from '@uiw/react-md-editor';

interface TranslateProps { }

function Translate(props: TranslateProps) {
    /* ――――――――――――――― Variable ――――――――――――――― */
    /* ===== Props ===== */
    const { } = props;

    /* ===== State ===== */
    const [type, setType] = React.useState<string>('');
    const [id, setId] = React.useState<string>('');
    const [content, setContent] = React.useState<string>('');
    const [username, setUsername] = React.useState<string>('');

    /* ===== Const ===== */

    /* ====== API ====== */

    /* ―――――――――――――――― Method ―――――――――――――――― */

    /* ―――――――――――――― Use Effect ―――――――――――――― */
    React.useEffect(() => {
        if (type !== '' && id !== '') {
            switch (type) {
                case 'me': setContent(MB_ME[parseInt(id)].contents); break;
                case 'graffiti': setContent(MB_GRAFFITI[parseInt(id)].contents); break;
            }
        }
        else {
            setContent('');
        }
    }, [type, id]);

    /* ―――――――――――――――― Return ―――――――――――――――― */
    return <DivisionBox data-page="translate" template='max-content max-content max-content auto max-content' direction='VERTICAL' gap='10px'>
        <div>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value=''>선택</option>
                <option value='me'>나</option>
                <option value='graffiti'>낙서장</option>
            </select>
        </div>
        <select value={id} onChange={(e) => setId(e.target.value)}>
            <option value=''>선택</option>
            {type === 'me' ? MB_ME.map((ele, idx) => {
                return <option key={`mb-me-${idx}`} value={idx}>{ele.title}</option>
            }) : null}
            {type === 'graffiti' ? MB_GRAFFITI.map((ele, idx) => {
                return <option key={`mb-graffiti-${idx}`} value={idx}>{ele.title}</option>
            }) : null}
        </select>
        <div>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
            <MDEditor value={content} onChange={(value) => setContent(value ?? '')} />
        </div>
        <div><button>추가</button></div>
    </DivisionBox>;
};

namespace Translate { };

export default Translate;

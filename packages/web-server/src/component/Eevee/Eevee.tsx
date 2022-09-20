/*------------------------------------------------------------------------------------------------------------------------------------------
 * Eevee.tsx
 * WRITER : 모시깽이
 * DATE : 20XX-XX-XX
 * DISCRIPTION : 
 * TYPE : Component
 * 개정이력 :
--------------------------------------------------------------------------------------------------------------------------------------------*/
import React from 'react';

interface EeveeProps { };

function Eevee(props: EeveeProps) {
    /* ――――――――――――――― Variable ――――――――――――――― */
    /* ===== Props ===== */
    const { } = props;
    /* ===== State ===== */
    /* ===== Const ===== */
    /* ====== API ====== */

    /* ―――――――――――――――― Method ―――――――――――――――― */

    /* ―――――――――――――― Use Effect ―――――――――――――― */

    /* ―――――――――――――――― Return ―――――――――――――――― */
    return (
        <div data-component='eevee'>
            <div className="eevee">
                <div className="body">
                    <div className="head">
                        <div className="ears">
                            <div className="ear">
                                <div className="lobe"></div>
                            </div>
                            <div className="ear">
                                <div className="lobe"></div>
                            </div>
                        </div>
                        <div className="face">
                            <div className="eyes">
                                <div className="eye">
                                    <div className="eyelid"></div>
                                </div>
                                <div className="eye">
                                    <div className="eyelid"></div>
                                </div>
                            </div>
                            <div className="nose"></div>
                            <div className="mouth"></div>
                        </div>
                    </div>
                    <div className="chest">
                        <div className="fur">
                            <div className="patch"></div>
                        </div>
                        <div className="fur">
                            <div className="patch"></div>
                        </div>
                        <div className="fur">
                            <div className="patch"></div>
                        </div>
                    </div>
                    <div className="legs">
                        <div className="leg">
                            <div className="inner-leg"></div>
                        </div>
                        <div className="leg">
                            <div className="inner-leg"></div>
                        </div>
                        <div className="leg">
                            <div className="inner-leg"></div>
                        </div>
                        <div className="leg">
                            <div className="inner-leg"></div>
                        </div>
                    </div>
                    <div className="tail">
                        <div className="tail">
                            <div className="tail">
                                <div className="tail">
                                    <div className="tail">
                                        <div className="tail -end"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

namespace Eevee { };

export default Eevee;
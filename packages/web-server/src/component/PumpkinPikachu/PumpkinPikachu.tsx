/*------------------------------------------------------------------------------------------------------------------------------------------
 * PumpkinPikachu.tsx
 * WRITER : 모시깽이
 * DATE : 20XX-XX-XX
 * DISCRIPTION : 
 * TYPE : Component
 * 개정이력 :
--------------------------------------------------------------------------------------------------------------------------------------------*/
import React from 'react';

interface PumpkinPikachuProps { };

function PumpkinPikachu(props: PumpkinPikachuProps) {
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
        <div data-component='pumpkinPikachu'>
            <div className="leaves"></div>
            <div className="leaves right"></div>
            <div className="pikachu">
                <div className="limbs"></div>
            </div>
            <div className="pumpkin">
                <div className="face"></div>
            </div>
            <div className="face-deets"></div>
            <div className="arms"></div>
            <div className="hat"></div>
        </div>
    );
};

namespace PumpkinPikachu { };

export default PumpkinPikachu;
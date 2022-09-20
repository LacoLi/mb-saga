/*------------------------------------------------------------------------------------------------------------------------------------------
 * PokemonFriends.tsx
 * WRITER : 모시깽이
 * DATE : 20XX-XX-XX
 * DISCRIPTION : 
 * TYPE : Component
 * 개정이력 :
--------------------------------------------------------------------------------------------------------------------------------------------*/
import React from 'react';

interface PokemonFriendsProps { };

function PokemonFriends(props: PokemonFriendsProps) {
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
        <div data-component='pokemonFriends'>
            <ul className="moon">
                <li className="crater"></li>
                <li className="crater"></li>
                <li className="crater"></li>
            </ul>
            <ul className="mountain-range">
                <li className="mountain"></li>
                <li className="mountain"></li>
                <li className="mountain"></li>
                <li className="mountain"></li>
                <li className="mountain"></li>
                <li className="mountain"></li>
                <li className="mountain"></li>
                <li className="mountain"></li>
                <li className="mountain"></li>
                <li className="mountain"></li>
                <li className="mountain"></li>
            </ul>
            <ul className="forest">
                <li className="hill"></li>
                <li className="hill"></li>
                <li className="hill"></li>
            </ul>
            <ul className="sparkles">
                <li className="sparkle one"></li>
                <li className="sparkle one"></li>
                <li className="sparkle one"></li>
                <li className="sparkle one"></li>
                <li className="sparkle two"></li>
                <li className="sparkle two"></li>
                <li className="sparkle two"></li>
                <li className="sparkle two"></li>
                <li className="sparkle three"></li>
                <li className="sparkle three"></li>
                <li className="sparkle three"></li>
                <li className="sparkle three"></li>
                <li className="sparkle four"></li>
                <li className="sparkle four"></li>
                <li className="sparkle four"></li>
                <li className="sparkle four"></li>
                <li className="sparkle five"></li>
                <li className="sparkle five"></li>
                <li className="sparkle five"></li>
                <li className="sparkle five"></li>
                <li className="sparkle six"></li>
                <li className="sparkle six"></li>
                <li className="sparkle six"></li>
                <li className="sparkle six"></li>
                <li className="sparkle seven"></li>
                <li className="sparkle seven"></li>
                <li className="sparkle seven"></li>
                <li className="sparkle seven"></li>
                <li className="sparkle eight"></li>
                <li className="sparkle eight"></li>
                <li className="sparkle eight"></li>
                <li className="sparkle eight"></li>
            </ul>
            <div className="grass">
                <div className="pokemon">
                    <div className="poke" id="bulbasaur">
                        <div className="ear"></div>
                        <div className="ear"></div>
                        <div className="head"></div>
                        <div className="leg"></div>
                        <div className="bulba-body"></div>
                        <div className="bulbs">
                            <div className="bulb"></div>
                        </div>
                    </div>
                    <div className="poke" id="pikachu">
                        <div className="ear"></div>
                        <div className="ear"></div>
                        <div className="hand"></div>
                        <div className="pika-body"></div>
                        <div className="head"></div>
                        <div className="pika-tail"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

namespace PokemonFriends { };

export default PokemonFriends;
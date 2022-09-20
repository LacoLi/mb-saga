/*------------------------------------------------------------------------------------------------------------------------------------------
 * [FTName | capitalize]Data.tsx
 * WRITER : 모시깽이
 * DATE : 20XX-XX-XX
 * DISCRIPTION : 
 * TYPE : Redux Data
 * 개정이력 :
--------------------------------------------------------------------------------------------------------------------------------------------*/
import { DeepPartial } from 'redux';

namespace <FTName | capitalize>Data {
  export const ActionType = {
    SET: Symbol('SET'),
    CLEAR: Symbol('CLEAR'),
  };

  export interface IReducer {
    type: typeof ActionType[keyof typeof ActionType];
    payload: IPayload;
  }

  export interface IReducerDeepPartial {
    type: IReducer['type'];
    payload: DeepPartial<IReducer['payload']>;
  }

  export interface IPayload {}
}

export default <FTName | capitalize>Data;

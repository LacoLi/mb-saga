/*------------------------------------------------------------------------------------------------------------------------------------------
 * [FTName | capitalize]Action.tsx
 * WRITER : 모시깽이
 * DATE : 20XX-XX-XX
 * DISCRIPTION : 
 * TYPE : Redux Action
 * 개정이력 :
--------------------------------------------------------------------------------------------------------------------------------------------*/
import <FTName | capitalize>Data from './[FTName | capitalize]Data';

namespace <FTName | capitalize>Action {
  export const set = (payload: <FTName | capitalize>Data.IPayload): <FTName | capitalize>Data.IReducerDeepPartial => {
    return {
      type: <FTName | capitalize>Data.ActionType.SET,
      payload: payload,
    };
  };

  export const clear = (): <FTName | capitalize>Data.IReducerDeepPartial => {
    return {
      type: <FTName | capitalize>Data.ActionType.CLEAR,
      payload: {},
    };
  };
}

export default <FTName | capitalize>Action;

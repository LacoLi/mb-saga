import { Reducer } from 'redux';
import <FTName | capitalize>Data from './[FTName | capitalize]Data';

const removeIPayload = <T extends <FTName | capitalize>Data.IPayload>(t: T): T => {
  return t;
};

export const init<FTName | capitalize>State: <FTName | capitalize>Data.IPayload = Object.freeze(removeIPayload({}));

const <FTName | capitalize>Reducer:Reducer<<FTName | capitalize>Data.IPayload, <FTName | capitalize>Data.IReducer> = (state = init<FTName | capitalize>State, { type, payload }: <FTName | capitalize>Data.IReducer): <FTName | capitalize>Data.IPayload => {
  switch (type) {
    case <FTName | capitalize>Data.ActionType.SET:
      return { ...state, ...payload };

    case <FTName | capitalize>Data.ActionType.CLEAR:
      return { ...init<FTName | capitalize>State };

    default:
      return state;
  }
};

export default <FTName | capitalize>Reducer;

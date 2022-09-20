import React from 'react';

namespace Util {
  export namespace is {
    export function string(data: any): data is string {
      return typeof data === 'string';
    }
    export function number(data: any): data is number {
      return typeof data === 'number';
    }
    export function func(data: any): data is Function {
      return typeof data === 'function';
    }
    export function object(data: any): data is object {
      return typeof data === 'object';
    }
    export function array(data: any): data is any[] {
      return Array.isArray(data);
    }
    export function empty(data: Array<any>): boolean {
      return !data.length;
    }
    export function undefData(data: any): data is undefined {
      return data === undefined;
    }
    export function nullData(data: any): data is null {
      return data === null;
    }
    export function undefOrNull(data: any): data is undefined | null {
      return data === undefined || data === null;
    }
  }

  export namespace interval {
    export const useInterval = (callback: Function, delay: number) => {
      const savedCallback = React.useRef<Function>();

      React.useEffect(() => {
        savedCallback.current = callback;
      });

      React.useEffect(() => {
        function tick() {
          if (savedCallback.current !== undefined) {
            savedCallback.current();
          }
        }

        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }, [delay]);
    };
  }

  export namespace format {
    /**
     * 숫자에 콤마 추가
     * @param data 콤마를 추가 할 문자열 또는 숫자
     * @returns
     */
    export const insertComma = (data: string | number) => {
      let str = typeof data === 'number' ? data.toString() : onlyNumber(data);
      return str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    };

    interface IOnlyNumber {
      (data: string): string;
      (data: string, allowComma: boolean): string;
      (data: string, allowComma: boolean, firstZero: boolean): string;
    }
    /**
     * 문자열에서 숫자만 남기고 모두 제거
     * @param data 숫자만 남길 문자열
     * @param allowComma 콤마를 추가 할 문자
     * @param firstZero 숫자 앞 0 제외체크
     * @returns
     */
    const onlyNumber: IOnlyNumber = (data: string, addComma: boolean = false, firstZero: boolean = true) => {
      data = firstZero ? rmFirstZero(data.replace(/[^\d]/g, '')) : data.replace(/[^\d]/g, '');
      return addComma ? insertComma(data) : data;
    };
    /**
     * 문자열 앞 '0' 모두 제거
     * @param str '0' 을 제거할 문자열
     * @returns
     */
    const rmFirstZero = (str: string) => {
      return new RegExp(/^[0]*$/).test(str) ? '0' : str.replace(/^0+/, '');
    };
    /**
     * 날짜를 format에 맞춰 반환한다
     * @param data 날짜 데이타 (Date | number | undefined)
     * @param format 지정할 포맷 'Y-M-D' (string)
     * @param leftPad 좌측 0 포함 여부 (boolean | undefined)
     * @returns
     */
    export const date = (date: Date | number | undefined, format: string, leftPad: boolean = true) => {
      if (!!date) {
        const tempDate = typeof date === 'number' ? new Date(date) : date;
        const year = `${tempDate.getFullYear()}`;
        const month = `${leftPad ? `0${tempDate.getMonth() + 1}`.slice(-2) : tempDate.getMonth() + 1}`;
        const day = `${leftPad ? `0${tempDate.getDate()}`.slice(-2) : tempDate.getDate()}`;

        return format.replaceAll('Y', year).replaceAll('M', month).replaceAll('D', day);
      } else {
        return '';
      }
    };
    /**
     * 시간을 format에 맞춰 반환한다
     * @param data 날짜 데이타 (Date | number | undefined)
     * @param format 지정할 포맷 'H-M-S' (string)
     * @param leftPad 좌측 0 포함 여부 (boolean | undefined)
     * @returns
     */
    export const time = (date: Date | number | undefined, format: string, leftPad: boolean = true) => {
      if (!!date) {
        const tempDate = typeof date === 'number' ? new Date(date) : date;
        const hour = `${leftPad ? `0${tempDate.getHours()}`.slice(-2) : tempDate.getHours()}`;
        const min = `${leftPad ? `0${tempDate.getMinutes()}`.slice(-2) : tempDate.getMinutes()}`;
        const sec = `${leftPad ? `0${tempDate.getSeconds()}`.slice(-2) : tempDate.getSeconds()}`;

        return format.replaceAll('H', hour).replaceAll('M', min).replaceAll('S', sec);
      } else {
        return '';
      }
    };
  }

  /* ==========
   * Check
   * ========== */
  export namespace check {
    // Or 여러개 한번에 체크
    export function or<T, R extends T>(target: T, list: R[]): boolean;
    export function or<T, R extends T, YES, NO>(target: T, list: R[], yes: YES, no: NO): YES | NO;
    export function or<T, R extends T, YES, NO>(target: T, list: R[], yes?: YES, no?: NO): YES | NO | boolean {
      let res: boolean = false;

      for (let ele of list) {
        if (target === ele) {
          res = true;
          break;
        }
      }

      if (res === true && yes !== undefined) return yes;
      else if (res === false && no !== undefined) return no;
      else return res;
    }

    // And 여러개 한번에 체크
    export function and<T, R extends T>(target: T, list: R[]): boolean;
    export function and<T, R extends T, YES, NO>(target: T, list: R[], yes: YES, no: NO): YES | NO;
    export function and<T, R extends T, YES, NO>(target: T, list: R[], yes?: YES, no?: NO): YES | NO | boolean {
      let res: boolean = true;

      for (let ele of list) {
        if (target !== ele) {
          res = false;
          break;
        }
      }

      if (res === true && yes !== undefined) return yes;
      else if (res === false && no !== undefined) return no;
      else return res;
    }
  }
  export namespace props {
    export function data(attr: { dataLayout?: string; dataPage?: string; dataContainer?: string; dataComponent?: string }) {
      return {
        ...(!!attr.dataLayout && { 'data-layout': attr.dataLayout }),
        ...(!!attr.dataPage && { 'data-page': attr.dataPage }),
        ...(!!attr.dataContainer && { 'data-container': attr.dataContainer }),
        ...(!!attr.dataComponent && { 'data-component': attr.dataComponent }),
      };
    }
  }
  export namespace enums {
    export function getKeys(e: Record<string, string | number>) {
      return Object.keys(e).filter((v) => isNaN(Number(v)));
    }
    // export function getValues<T extends Record<string, string | number> = Record<string, string | number>>(e: T): T {
    //   return Object.values(e).filter((v) => !isNaN(Number(v)));
    // }
    export function getValues(e: Record<string, string | number>) {
      return Object.values(e).filter((v) => !isNaN(Number(v)));
    }

    export function map<T = any>(e: Record<string, string | number>, func: (key: string, value: string | number, idx: number) => T): T[] {
      const keys = enums.getKeys(e);
      return keys.map((key, idx) => func(key, e[key], idx));
    }

    export function foreach(e: Record<string, string | number>, func: (key: string, value: string | number, idx: number) => void): void {
      const keys = enums.getKeys(e);
      keys.map((key, idx) => func(key, e[key], idx));
    }
  }
}

export default Util;

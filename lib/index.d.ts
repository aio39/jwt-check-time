declare type time = `${number}${unit}`;
interface config {
  time: time;
  expUnit: keyof typeof unit;
  expName: string;
}
declare type CheckReturn = [isNotExpired: boolean, isLeft: boolean];
declare enum unit {
  s = 's',
  S = 'S',
  m = 'm',
  M = 'M',
  h = 'h',
  H = 'H',
  d = 'd',
  D = 'D',
}
declare class CheckJWT {
  defaultConfig: config;
  constructor(config: Partial<config>);
  setConfig(config: Partial<config>): void;
  private static getTokenPayload;
  private getUpperSecond;
  private getTokenExp;
  private getTimeNow;
  private checkIsNotTimeOut;
  private checkIsOverTokenExp;
  private checkIsOverLimitTime;
  create(config: Partial<config>): CheckJWT;
  check(token: string): CheckReturn;
}
declare const checkJWT: CheckJWT;
export default checkJWT;

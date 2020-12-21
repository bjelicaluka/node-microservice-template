export interface IAlarmEventDispatcher {
  dispatchAlarm(userGroupId: string, data: any): void;
}
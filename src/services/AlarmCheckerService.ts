import { inject, injectable } from "inversify";
import { IAlarmEventDispatcher } from "../contracts/IAlarmEventDispatcher";
import { IAlarmCheckerService } from "../contracts/services/IAlarmCheckerService";
import { IAlarmRecordService } from "../contracts/services/IAlarmRecordService";
import { IAlarmSensorService } from "../contracts/services/IAlarmSensorService";
import { ISensorService, SensorInfo } from "../contracts/services/proxy/ISensorService";
import { Alarm } from "../entity/Alarm";
import { AlarmRecord } from "../entity/AlarmRecord";
import { AlarmSensor } from "../entity/AlarmSensor";
import { AlarmPriority } from "../entity/enum/AlarmPriority";
import { AlarmType } from "../entity/enum/AlarmType";
import { Sensor } from "../entity/remote/Sensor";

interface AlarmInfo {
  threshold: number;
  criticalValue: number;
  propertyName: string;
  alarmType: AlarmType;
  delta: number;
  priority: AlarmPriority;
  sensor?: Sensor;
}

@injectable()
export class AlarmCheckerService implements IAlarmCheckerService {

  private alarmRecordService: IAlarmRecordService;
  private alarmSensorService: IAlarmSensorService;
  private alarmEventDispatcher: IAlarmEventDispatcher;

  constructor(
    @inject("IAlarmRecordService") alarmRecordService: IAlarmRecordService,
    @inject("IAlarmSensorService") alarmSensorService: IAlarmSensorService,
    @inject("IAlarmEventDispatcher") alarmEventDispatcher: IAlarmEventDispatcher,
  ) {
    this.alarmRecordService = alarmRecordService;
    this.alarmSensorService = alarmSensorService;
    this.alarmEventDispatcher = alarmEventDispatcher;
  }

  public async checkForAlarms(sensorInfo: SensorInfo, data: any): Promise<void> {
    const alarmSensors = await this.alarmSensorService.getBySensorId(sensorInfo.sensor.id);

    alarmSensors.forEach((alarmSensor: AlarmSensor) => {
      alarmSensor.alarms.forEach(this.handleAlarm(sensorInfo, alarmSensor, data));
    });
  }

  private handleAlarm = (sensorInfo: SensorInfo, alarmSensor: AlarmSensor, data: any) => async (alarm: Alarm) => {
    const value: number = data[alarmSensor.propertyName];
    const hasAlarm: boolean = alarm.alarmType == AlarmType.Above ? value >= alarm.threshold : value <= alarm.threshold;

    if (hasAlarm) {
      this.dispatchAlarm(sensorInfo.userGroupId, await this.getAlarmInfo(alarm, alarmSensor, sensorInfo.sensor, value));
      this.saveAlarmRecord(alarmSensor.id, value, alarm.threshold);
    }
  };

  private dispatchAlarm(userGroupId: string, alarmInfo: AlarmInfo): void {
    this.alarmEventDispatcher.dispatchAlarm(userGroupId, alarmInfo);
  }

  private async getAlarmInfo(alarm: Alarm, alarmSensor: AlarmSensor, sensor: Sensor, value: number): Promise<AlarmInfo> {
    return {
      sensor: sensor,
      criticalValue: value,
      threshold: alarm.threshold,
      propertyName: alarmSensor.propertyName,
      alarmType: alarm.alarmType,
      delta: Math.abs(value - alarm.threshold),
      priority: alarm.priority
    }
  }

  private saveAlarmRecord(alarmSensorId: number, criticalValue: number, currentTreshold: number): void {
    this.alarmRecordService.add({
      alarmSensor: {
        id: alarmSensorId
      },
      criticalValue,
      currentTreshold,
    } as AlarmRecord);
  }

}
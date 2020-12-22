import { inject, injectable } from "inversify";
import { IAlarmEventDispatcher } from "../contracts/IAlarmEventDispatcher";
import { IAlarmCheckerService } from "../contracts/services/IAlarmCheckerService";
import { IAlarmRecordService } from "../contracts/services/IAlarmRecordService";
import { IAlarmSensorService } from "../contracts/services/IAlarmSensorService";
import { SensorInfo } from "../contracts/services/proxy/ISensorService";
import { AlarmRecord } from "../entity/AlarmRecord";
import { AlarmSensor } from "../entity/AlarmSensor";
import { AlarmType } from "../entity/AlarmType";

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

  async checkForAlarms(sensorInfo: SensorInfo, data: any): Promise<void> {
    const alarmSensors = await this.alarmSensorService.getBySensorId(sensorInfo.id);
    alarmSensors.forEach((alarmSensor: AlarmSensor) => {
      const { alarms, propertyName, id } = alarmSensor;

      alarms.forEach(alarm => {

        const value: number = data[propertyName];
        const hasAlarm: boolean = alarm.alarmType == AlarmType.Above ? value >= alarm.threshold : value <= alarm.threshold;
        if (hasAlarm) {
          // threshold, propertyName, alarm message, prioritet alarma(jako kriticno), tip alarma, koliko je "kritican alarm" - delta(10 iznad thresholda), sensor name, location
          this.alarmEventDispatcher.dispatchAlarm(sensorInfo.userGroupId, {
            value,
            sensor: sensorInfo.name,
            alarmType: alarm.alarmType == AlarmType.Above ? 'Above' : 'Below',
          });
          
          this.alarmRecordService.add({
            alarmSensor: {
              id
            },
            criticalValue: value
          } as AlarmRecord);
        }

      });
    });
  }

}
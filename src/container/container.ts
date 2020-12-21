import { Container } from 'inversify';
import { IAlarmRecordService } from '../contracts/Services/IAlarmRecordService';
import { IAlarmSensorService } from '../contracts/Services/IAlarmSensorService';
import { IAlarmService } from '../contracts/Services/IAlarmService';
import { AlarmController } from '../controllers/AlarmController';
import { AlarmRecordController } from '../controllers/AlarmRecordController';
import { AlarmSensorController } from '../controllers/AlarmSensorController';
import { AlarmRecordService } from '../services/AlarmRecordService';
import { AlarmSensorService } from '../services/AlarmSensorService';
import { AlarmService } from '../services/AlarmService';

const AppContainer = new Container();

AppContainer.bind<IAlarmService>("IAlarmService").to(AlarmService);
AppContainer.bind<IAlarmRecordService>("IAlarmRecordService").to(AlarmRecordService);
AppContainer.bind<IAlarmSensorService>("IAlarmSensorService").to(AlarmSensorService);

AppContainer.bind<AlarmController>(AlarmController).toSelf();
AppContainer.bind<AlarmRecordController>(AlarmRecordController).toSelf();
AppContainer.bind<AlarmSensorController>(AlarmSensorController).toSelf();

export { AppContainer };

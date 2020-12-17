import { Entity, Column, OneToMany, ManyToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Alarm } from "./Alarm";
import { AlarmRecord } from "./AlarmRecord";

@Entity()
export class AlarmSensor extends BaseEntity {

  @Column()
  sensorId: string;

  @ManyToMany(() => Alarm, alarm => alarm.alarmSensors)
  alarms: Alarm;

  @OneToMany(() => AlarmRecord, alarmRecord => alarmRecord.alarmSensor)
  alarmRecords: AlarmRecord[];

  @Column()
  propertyName: string;

}
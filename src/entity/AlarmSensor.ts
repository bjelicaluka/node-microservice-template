import { Entity, ObjectIdColumn, ObjectID, Column, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Alarm } from "./Alarm";
import { AlarmRecord } from "./AlarmRecord";

@Entity()
export class AlarmSensor extends BaseEntity {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  sensorId: string;

  @ManyToMany(() => Alarm, alarm => alarm.alarmSensors)
  alarms: Alarm;

  @OneToMany(() => AlarmRecord, alarmRecord => alarmRecord.alarmSensor)
  alarmRecords: AlarmRecord[];

  @Column()
  propertyName: string;

}

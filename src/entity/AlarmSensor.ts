import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Alarm } from "./Alarm";
import { AlarmRecord } from "./AlarmRecord";

@Entity()
export class AlarmSensor extends BaseEntity {

  @Column()
  sensorId: string;

  @ManyToMany(() => Alarm, alarm => alarm.alarmSensors, {
    nullable: false,
    eager: true,
  })
  @JoinTable()
  alarms: Alarm;

  @OneToMany(() => AlarmRecord, alarmRecord => alarmRecord.alarmSensor, {
    nullable: false,
  })
  alarmRecords: AlarmRecord[];

  @Column()
  propertyName: string;

}

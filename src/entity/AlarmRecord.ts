import { Entity, ObjectIdColumn, ObjectID, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { AlarmSensor } from "./AlarmSensor";

@Entity()
export class AlarmRecord extends BaseEntity {

  @ObjectIdColumn()
  id: ObjectID;

  @ManyToOne(() => AlarmSensor, alarm => alarm.alarmRecords)
  alarmSensor: AlarmSensor;

  @Column()
  criticalValue: number;

}

import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { AlarmSensor } from "./AlarmSensor";

@Entity()
export class AlarmRecord extends BaseEntity {

  @ManyToOne(() => AlarmSensor,
    alarm => alarm.alarmRecords,
    { 
      nullable: false,
      eager: true,
    })
  alarmSensor: AlarmSensor;

  @Column()
  criticalValue: number;

  @Column({
    nullable: true
  })
  currentTreshold: number;

}

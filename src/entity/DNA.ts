import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { HumanType } from "./HumanType";

@Entity()
export class DNA {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => HumanType, (humanType) => humanType.id)
  humanType: HumanType;
}

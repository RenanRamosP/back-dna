import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class HumanType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}

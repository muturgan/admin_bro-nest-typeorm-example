import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: number;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public age!: number;
}
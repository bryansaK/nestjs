import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique(['email'])
@Entity()
export class User {

@PrimaryGeneratedColumn()
id: number;

@Column({type: 'varchar', length: 30})
username: string;

@Column({type: 'varchar', length: 30})
email: string

@Column({type: 'varchar'})
password: string;

}

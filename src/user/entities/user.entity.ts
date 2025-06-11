import { Note } from "src/notes/entities/note.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique(['email'])
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    username: string;

    @Column({ type: 'varchar', length: 30 })
    email: string

    @Column({ type: 'varchar' })
    password: string;

    @OneToMany(() => Note, note => note.user)
    notes: Note[];

}

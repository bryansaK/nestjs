import { User } from "src/user/entities/user.entity"; // Import de l'entité User
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Note {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.notes, { eager: true })
  user: User;

  @Column({ type: 'text' })
  note: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'boolean', default: false })
  isPublic: boolean;

}

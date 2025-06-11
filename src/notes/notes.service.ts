import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from 'src/user/entities/user.entity';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class NotesService {

  constructor(@InjectRepository(Note) private readonly noteRepository: Repository<Note>,) { }

  async create(createNoteDto: CreateNoteDto, user: User) {
    const note: Note = new Note()
    note.note = createNoteDto.note;
    note.user = user;
    note.isPublic = createNoteDto.isPublic;
    return await this.noteRepository.save(note)

  }

  findAll() {
    return `This action returns all notes`;
  }

   findAllForUser(user: User) {
    const options: FindManyOptions<Note> = {
      where: { user: user },
      order: { date: 'DESC' },
    };

    return this.noteRepository.find(options);
  }

  findAllForUserPublic(user: User) {
    const options: FindManyOptions<Note> = {
      where: { user: user , isPublic: true},
      order: { date: 'DESC' },
    };

    return this.noteRepository.find(options);
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    return this.noteRepository.update({ id: id }, updateNoteDto)
  }

  async remove(id: number) {
    return this.noteRepository.delete({ id: id })
  }
}

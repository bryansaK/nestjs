import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Controller('note')
export class NotesController {
  constructor(private readonly notesService: NotesService, private readonly userService: UserService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createNoteDto: CreateNoteDto, @Req() req) {
    await this.notesService.create(createNoteDto, req.user);
    return this.notesService.findAllForUser(req.user);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(":id")
  async findAllForUser(@Param('id') id: string) {
    const user = await this.userService.findOne(+id)
    return this.notesService.findAllForUser(user);
  }

  @Get("/public/:id")
  async findAllForUserPublic(@Param('id') id: string) {
    const user = await this.userService.findOne(+id)
    return this.notesService.findAllForUserPublic(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @Req() req) {
    await this.notesService.update(+id, updateNoteDto);
    return this.notesService.findAllForUser(req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Req() req) {
    await this.notesService.remove(+id);
    return this.notesService.findAllForUser(req.user);
  }

}

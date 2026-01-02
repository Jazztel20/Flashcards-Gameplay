import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import Flashcard from '#models/flashcard'
import User from '#models/user'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare isPublic: boolean

  //INPUTS PERSONNALISES
  @column.dateTime()
  declare publishedDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare userId: number

  @hasMany(() => Flashcard)
  declare public flashcards: HasMany<typeof Flashcard>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Deck from '#models/deck'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Flashcard extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare question: string

  @column()
  declare answer: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare deckId: number | null

  @belongsTo(() => Deck)
  declare deck: BelongsTo<typeof Deck>
}

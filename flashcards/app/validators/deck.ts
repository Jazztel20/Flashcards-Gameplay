import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'
import type { FieldContext } from '@vinejs/vine/types'

async function recordUniq(
  db: Database,
  value: string,
  ctx: FieldContext,
  tableName: string,
  fieldName: string
) {
  const record = await db
    .from(tableName)
    .whereNot('id', ctx.meta.deckId)
    .where(fieldName, value)
    .first()
  return !record
}

export const deckValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255),
  })
)

/**
 * Validates the deck update action payload.
 */
export const updateDeckValidator = vine.compile(
  vine.object({
    titre: vine
      .string()
      .trim()
      .unique(async (...ctxParams) => await recordUniq(...ctxParams, 'decks', 'titre'))
      .minLength(1)
      .maxLength(50),
    published_date: vine
      .string()
      .unique(async (...ctxParams) => await recordUniq(...ctxParams, 'decks', 'published_date'))
      .email(),
  })
)

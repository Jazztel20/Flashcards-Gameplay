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
    .whereNot('id', ctx.meta.flashcardId)
    .where(fieldName, value)
    .first()
  return !record
}

/**
 * Validates the flashcard update action payload.
 */
export const updateFlashCardValidator = vine.compile(
  vine.object({
    question: vine
      .string()
      .trim()
      .unique(async (...ctxParams) => await recordUniq(...ctxParams, 'flashcard', 'question'))
      .minLength(1)
      .maxLength(50),
    reponse: vine
      .string()
      .unique(async (...ctxParams) => await recordUniq(...ctxParams, 'flashcard', 'reponse'))
      .minLength(1)
      .maxLength(50),
  })
)

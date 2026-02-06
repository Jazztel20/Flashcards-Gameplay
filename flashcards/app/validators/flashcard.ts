import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'
import type { FieldContext } from '@vinejs/vine/types'
//import { SimpleMessagesProvider } from '@vinejs/vine'

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
 * Validator for creating/updating a flashcard
 */
export const flashcardValidator = vine.compile(
  vine.object({
    question: vine.string().trim().minLength(2),
    answer: vine.string().trim().minLength(2),
  })
)

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
    answer: vine
      .string()
      .unique(async (...ctxParams) => await recordUniq(...ctxParams, 'flashcard', 'answer'))
      .minLength(1)
      .maxLength(50),
  })
)

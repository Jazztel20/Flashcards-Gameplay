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
    .whereNot('id', ctx.meta.userId)
    .where(fieldName, value)
    .first()
  return !record
}

/**
 * Validates the user update action payload.
 */
export const updateUserValidator = vine.compile(
  vine.object({
    pseudo: vine
      .string()
      .trim()
      .unique(
        async (...ctxParams) =>
          await recordUniq(...ctxParams, 'user' /*tableName*/, 'pseudo' /*fieldName*/)
      )
      .minLength(1)
      .maxLength(50),
    email: vine
      .string()
      .unique(
        async (...ctxParams) =>
          await recordUniq(...ctxParams, 'user' /*tableName*/, 'email' /*fieldName*/)
      )
      .email(),
  })
)

import vine, { SimpleMessagesProvider } from '@vinejs/vine'

/**
 * Validator for user registration
 */
export const registerValidator = vine.compile(
  vine.object({
    pseudo: vine.string().trim().minLength(3).maxLength(30),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(4),
  })
)
registerValidator.messagesProvider = new SimpleMessagesProvider({
  'required': 'Le champ {{ field }} est obligatoire.',
  'string': 'Le format du champ {{ field }} est invalide.',
  'email': "L'adresse email n'est pas valide.",
  'minLength': 'Le champ {{ field }} doit contenir au moins {{ min }} caractères.',
  'maxLength': 'Le champ {{ field }} ne doit pas dépasser {{ max }} caractères.',
  'database.unique': 'Cet email est déjà utilisé.',
})

/**
 * Validator for user login
 */
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)
loginValidator.messagesProvider = new SimpleMessagesProvider({
  required: 'Le champ {{ field }} est obligatoire.',
  email: "L'adresse email n'est pas valide.",
})

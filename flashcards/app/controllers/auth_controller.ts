import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/auth'

export default class AuthController {
  // Affichage du formulaire d'inscription
  async registerShow({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  // Gestion de l'inscription
  async register({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)

    await auth.use('web').login(user)

    return response.redirect().toRoute('home')
  }

  // Affichage du formulaire de connexion
  async loginShow({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  // Gestion de la connexion
  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.redirect().toRoute('home')
  }

  // Déconnexion
  async logout({ auth, session, response }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', "L'utilisateur s'est déconnecté avec succès")
    return response.redirect().toRoute('home')
  }
}

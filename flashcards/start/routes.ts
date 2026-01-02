import DecksController from '#controllers/decks_controller'
import UsersController from '#controllers/users_controller'
import FlashcardController from '#controllers/flashcards_controller'
import router from '@adonisjs/core/services/router'
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'

router.group(() => {
  // Routes d'authentification
  router.get('/register', [AuthController, 'registerShow']).as('auth.register.show')
  router.post('/register', [AuthController, 'register']).as('auth.register.store')
  router.get('/login', [AuthController, 'loginShow']).as('auth.login.show')
  router.post('/login', [AuthController, 'login']).as('auth.login.store')
  router.post('/logout', [AuthController, 'logout']).as('auth.logout')

  // Affichage tous les decks
  router.get('/', [DecksController, 'index']).as('home')
  // Affichage deck unique
  router
    .get('decks/:id', [DecksController, 'showSingleDeck'])
    .as('decks.showSingleDeck')
    .where('id', router.matchers.number())
  // Liste flashcards d'un deck
  router.get('decks/:deck_id/cards', [FlashcardController, 'index']).as('flashcards.index')
})

import decks_controller from '#controllers/decks_controller'
import users_controller from '#controllers/users_controller'
import { errors } from '@adonisjs/core'
import router from '@adonisjs/core/services/router'
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// Home Router GET
router.get('/', async ({ view }) => {
  try {
    const homePage = await view.render('home')
    return homePage
  } catch (error) {
    if (error instanceof errors.E_ROUTE_NOT_FOUND) {
      console.log(`${error?.name || 'Row'} not found`)
    }
    throw error
  }
})

// Ressources du deck (informations à display sur la page)

router.resource('decks', decks_controller).only(['show', 'create', 'update'])

// Récupérer tous les decks
router.get('/decks', async ({ view }) => {
  try {
    const decksPage = await view.render('decks')
    return decksPage
  } catch (error) {
    if (error instanceof errors.E_ROUTE_NOT_FOUND) {
      console.log(`${error?.name || 'Row'} not found`)
    }
    throw error
  }
})

// Generates route named "overview" on decks
//router.on('/decks').render('/decks/overview')
router.get('/users/create', [users_controller, 'create'])

// Users to show up on the router
router.on('/users').render('/users/show')

/* Router.get('/users/:id', async ({ view, params }) => {
  // Renders a view and passes dynamic data from the route parameters
  return view.render('users/show', { userId: params.id })
})*/

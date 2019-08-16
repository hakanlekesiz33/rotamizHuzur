const Router = require('nextjs-dynamic-routes')
 
const router = new Router()

router.add({ name: 'about', pattern: '/about' })

router.add({ name: 'bloglar', pattern: '/bloglar' })
 
// if the name of your route is different from your component file name:
router.add({
  name: 'characterAndFilm',
  pattern: '/character-and-film/:characterId/:filmId',
  page: '/character-and-film'
})
 
module.exports = router
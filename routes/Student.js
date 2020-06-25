const router = require('express').Router()

const StudentController = require('../controllers/StudentController')

router.get('/', StudentController.list)
router.get('/:id', StudentController.show)
router.put('/:id', StudentController.update)
router.put('/:id/pass', StudentController.pass)
router.post('/create', StudentController.create)

module.exports = router

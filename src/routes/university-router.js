const express = require('express')

const UniversityCtrl = require('../controllers/universityController')

const router = express.Router()

router.get('/universities/populate-db', UniversityCtrl.populateDB)

router.post('/universities', UniversityCtrl.createUniversity)
router.put('/universities/:id', UniversityCtrl.updateUniversity)
router.delete('/universities/:id', UniversityCtrl.deleteUniversity)
router.get('/universities/:id', UniversityCtrl.getUniversityById)
router.get('/universities', UniversityCtrl.getUniversities)

module.exports = router
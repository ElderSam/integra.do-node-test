const express = require('express')

const UniversityCtrl = require('../controllers/universityController')

const router = express.Router()

router.get('/universities/populate-db', UniversityCtrl.populateDB)

router.get('/universities/:id', UniversityCtrl.getUniversityById)
router.get('/universities', UniversityCtrl.getUniversities)

module.exports = router
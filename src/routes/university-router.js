const express = require('express')

const UniversityCtrl = require('../controllers/universityController')

const router = express.Router()

router.get('/universities/populate-db', UniversityCtrl.populateDB)

module.exports = router
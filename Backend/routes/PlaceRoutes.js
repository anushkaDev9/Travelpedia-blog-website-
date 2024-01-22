const express=require('express');
const {check}=require('express-validator')
const placesControllers = require('../controllers/PlaceControllers');

const router = express.Router();
router.post('/',
placesControllers.createPlaces);
router.get('/:pid', placesControllers.getPlacesById);
router.get('/user/:uid',placesControllers.getPlacesByUser);
router.delete('/:pid',placesControllers.deletePlaces);

router.patch('/:pid',
placesControllers.updatePlaces);

module.exports = router;
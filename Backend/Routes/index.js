const express = require('express');

const locationController = require('../Controllers/locations');
const restaurantController = require('../Controllers/restaurant');
const restaurantControllerByCity = require('../Controllers/restaurantByCity');
const mealtypeController = require('../Controllers/mealtype');
const userController = require('../Controllers/user');
const menuController = require('../Controllers/menu');
const userDController = require('../Controllers/userDetails');

const route = express.Router();

route.get('/locations', locationController.getLocations);           
route.get('/restaurants', restaurantController.getRestaurant);      
route.get('/mealtype', mealtypeController.getMealtypes);            

route.post('/sighnup', userController.Sighnup);          
route.post('/users', userDController.getUsetDetails);           
route.post('/login', userController.login);                         

route.get('/restaurantss/:askedCity', restaurantControllerByCity.getRestaurantByCity);   
route.get('/restaurant/:askedId', restaurantControllerByCity.getRestaurantById);   

route.post('/filter', restaurantController.filterRestaurant);       

route.get('/menus/:resId', menuController.getMenu);                       

module.exports = route;
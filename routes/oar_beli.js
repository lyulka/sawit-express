var express = require('express');
var router = express.Router();

var OARBeli = require('../models/oar_beli');

const oarbeli_collection = function(req, res, next) {
    OARBeli.find({})
        .exec((err, list_oarbeli) => {
            if (err) { return next(err); }
            
            // Successful, so send
            res.json(list_oarbeli);
        })
}

const oarbeli_create_post = function(req, res, next) {
    // TODO
}

/// OARBeli API ROUTES ///

// GET request for OARBeli
router.get('/collection', getCollection);

// POST request for creating OARBeli
router.get('/collection/create', postCreateOARBeli);

module.exports = router;
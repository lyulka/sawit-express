var async = require('async');
var express = require('express');
var router = express.Router();

var OARBeli = require('../models/oar_beli');

const oarbeli_collection = function(req, res, next) {
    async.parallel({
        list_oarbeli: (callback) => {
            OARBeli.find({})
                .exec(callback);
        },
    }, (err, results) => {
        if (err) { return next(err); }

        // Successful,so send
        res.json(results.list_oarbeli);
    });
}

const oarbeli_create_post = function(req, res, next) {
    // TODO
}

const oarbeli_delete_post = function(req, res, next) {
    // TODO
}

const oarbeli_edit_post = function(req, res, next) {
    // TODO
}



/// OARBeli API ROUTES ///

// GET request for OARBeli
router.get('/collection', oarbeli_collection);

// POST request for creating oarbeli
// router.post('/collection/create', oarbeli_create_post);

// POST request for deleting oarbeli
// router.post('/collection/delete/:id, oarbeli_delete_post);

// POST request for editing oarbeli
// router.post('/collection/edit/:id, oarbeli_edit_post);

module.exports = router;
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
    try {
        var oarbeli = new OARBeli({
            date: req.body.date,
            cpo: req.body.cpo,
            cpoTonnage: req.body.cpoTonnage,
            pk: req.body.pk,
            pkTonnage: req.body.pkTonnage,
            cangkang: req.body.cangkang,
            cangkangTonnage: req.body.cangkangTonnage,
            ring1: req.body.ring1,
            ring1Tonnage: req.body.ring1Tonnage,
            rampLuar: req.body.rampLuar,
            rampLuarTonnage: req.body.rampLuarTonnage,
            ptpn: req.body.ptpn,
            ptpnTonnage: req.body.ptpnTonnage,
            inti: req.body.inti,
            intiTonnage: req.body.intiTonnage,
            plasma1: req.body.plasma1,
            plasma1Tonnage: req.body.plasma1Tonnage,
            plasma3: req.body.plasma3,
            plasma3Tonnage: req.body.plasma3Tonnage,
            hkl: req.body.hkl,
            hklTonnage: req.body.hklTonnage,
            hka: req.body.hka,
            hkaTonnage: req.body.hkaTonnage,
            hkla: req.body.hkla,
            hklaTonnage: req.body.hklaTonnage,
            ss: req.body.ss,
            ssTonnage: req.body.ssTonnage,
            kosOlah: req.body.kosolah,
            oarBeli: 0.69,
        });


        oarbeli.save((err) => {
            return next(err);
        })

        res.send("Create successful");

    } catch(err) {
        return next(err);
    }
}

const oarbeli_delete_post = function(req, res, next) {
    try {
        const entryId = req.params.id;

        OARBeli.deleteOne({ id: entryId }, (err) => {
            return next(err);
        })

        res.send("Delete successful");

    } catch(err) {
        return next(err);
    }
}

const oarbeli_edit_get = function(req, res, next) {
    async.parallel({
        entry_oarbeli: (callback) => {
            OARBeli
                .findOne(req.params.id)
                .exec(callback);
        },
    }, (err, results) => {
        if (err) { return next(err); }

        // Successful, so send
        res.json(results.entry_oarbeli);
    })
}

const oarbeli_edit_post = function(req, res, next) {

}



/// OARBeli API ROUTES ///

// GET request for OARBeli
router.get('/collection', oarbeli_collection);

// POST request for creating oarbeli
router.post('/collection/create', oarbeli_create_post);
router.get('/collection/create', (req, res) => {
    res.send("This is the endpoint for creating new posts");
});

// POST request for deleting oarbeli
router.post('/collection/delete/:id, oarbeli_delete_post');
router.get('/collection/detete/:id', (req, res) => {
    res.send("This is the endpoint for deleting post: " + req.params.id);
})

// GET request for editing oarbeli
router.get('/collection/entry/:id', oarbeli_edit_get);

// POST request for editing oarbeli
// router.post('/collection/edit/:id, oarbeli_edit_post);

module.exports = router;
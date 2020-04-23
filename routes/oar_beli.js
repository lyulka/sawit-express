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
            kosOlah: req.body.kosOlah,
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

        OARBeli.deleteOne({ _id: entryId }, (err) => {
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
                .findOne({ _id: req.params.id })
                .exec(callback);
        },
    }, (err, results) => {
        if (err) { return next(err); }

        // Successful, so send
        res.json(results.entry_oarbeli);
    });
}


const oarbeli_edit_put = function(req, res, next) {
    const filter = { _id: req.params.id }
    const update = {
        date: req.body.date,
        cpo: Number(req.body.cpo),
        cpoTonnage: Number(req.body.cpoTonnage),
        pk: Number(req.body.pk),
        pkTonnage: Number(req.body.pkTonnage),
        cangkang: Number(req.body.cangkang),
        cangkangTonnage: Number(req.body.cangkangTonnage),
        ring1: Number(req.body.ring1),
        ring1Tonnage: Number(req.body.ring1Tonnage),
        rampLuar: Number(req.body.rampLuar),
        rampLuarTonnage: Number(req.body.rampLuarTonnage),
        ptpn: Number(req.body.ptpn),
        ptpnTonnage: Number(req.body.ptpnTonnage),
        inti: Number(req.body.inti),
        intiTonnage: Number(req.body.intiTonnage),
        plasma1: Number(req.body.plasma1),
        plasma1Tonnage: Number(req.body.plasma1Tonnage),
        plasma3: Number(req.body.plasma3),
        plasma3Tonnage: Number(req.body.plasma3Tonnage),
        hkl: Number(req.body.hkl),
        hklTonnage: Number(req.body.hklTonnage),
        hka: Number(req.body.hka),
        hkaTonnage: Number(req.body.hkaTonnage),
        hkla: Number(req.body.hkla),
        hklaTonnage: Number(req.body.hklaTonnage),
        ss: Number(req.body.ss),
        ssTonnage: Number(req.body.ssTonnage),
        kosOlah: Number(req.body.kosOlah),
        oarBeli: 0.69,
    };

    async.parallel({
        entry: (callback) => {
            OARBeli
                .findOneAndUpdate(filter, update)
                .exec(callback);
        }
    }, (err, results) => {
        if (err) { return next(err); }
    })
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
router.delete('/collection/delete/:id', oarbeli_delete_post);
router.get('/collection/detete/:id', (req, res) => {
    res.send("This is the endpoint for deleting post: " + req.params.id);
})

// GET request for editing oarbeli
router.get('/collection/entry/:id', oarbeli_edit_get);

// POST request for editing oarbeli
router.put('/collection/edit/:id', oarbeli_edit_put);

module.exports = router;
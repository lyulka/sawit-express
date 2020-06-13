var async = require('async');
var express = require('express');
var router = express.Router();

var OARBeli = require('../models/oar_beli');

const getTargetOarbeli = (body) => {
  var totalPembelian = 0;
  var totalTonnage = (body.ring1Tonnage + body.rampLuarTonnage + body.ptpnTonnage + body.intiTonnage + body.plasma1Tonnage + body.plasma3Tonnage
    + body.hklTonnage + body.hklaTonnage + body.ssTonnage);
  var targetOarbeli = 0;

  totalPembelian += body.ring1 * body.ring1Tonnage;
  totalPembelian += body.rampLuar * body.rampLuarTonnage;
  totalPembelian += body.ptpn * body.ptpnTonnage;
  totalPembelian += body.inti * body.intiTonnage;
  totalPembelian += body.plasma1 * body.plasma1Tonnage;
  totalPembelian += body.plasma3 * body.plasma3Tonnage;
  totalPembelian += body.hkl * body.hklTonnage;
  totalPembelian += body.hka * body.hkaTonnage;
  totalPembelian += body.hkla * body.hklaTonnage;
  totalPembelian += body.ss * body.ssTonnage;
  totalPembelian += body.kosOlah * totalTonnage * 1000;
  totalPembelian -= totalTonnage * 1000 * 0.04 * body.cangkang;
  totalPembelian -= totalTonnage * 1000 * 0.05 * body.pk;

  console.log("totalPembelian: " + totalPembelian);
  console.log("totalTonnage: " + totalTonnage);
  console.log(body);

  targetOarbeli = totalPembelian / (totalTonnage * body.cpo);

  return targetOarbeli;
}

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
    console.log("oarbeli_create_post: cool");

    var oarbeli = new OARBeli({
      date: req.body.date,
      cpo: req.body.cpo,
      pk: req.body.pk,
      cangkang: req.body.cangkang,
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
      oarBeli: getTargetOarbeli(req.body),
    });

    oarbeli.save((err) => {
      return next(err);
    })

    res.send(oarbeli);

  } catch(err) {
    return next(err);
  }
}

const oarbeli_delete_post = function(req, res, next) {
  try {
    const entryId = req.params.id;

    OARBeli.deleteOne({ _id: entryId }, (err) => {
      if (err) 
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
    date: req.body.date,
    cpo: req.body.cpo,
    pk: req.body.pk,
    cangkang: req.body.cangkang,
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
    oarBeli: getTargetOarbeli(req.body),
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
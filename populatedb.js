var async = require('async');
var OARBeli = require('./models/oar_beli');

var mongoose = require('mongoose');
var passwords = require('./passwords.json');
var mongoDB = passwords.connectionStringSawit0;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const OARBeliBuilder = require('./utilities/oar_beli_builder')

var oarbeli_array = [];

function oarbeliCreate(oarbeliDetails, callback) {
    var oarbeli = new OARBeli(oarbeliDetails);

    oarbeli.save(function(err) {
        if (err) {
            callback(err, null);
            return
        }
        console.log('New OARBeli: ' + oarbeliDetails.date)
        oarbeli_array.push(oarbeliDetails);
        callback(null, oarbeli);
    });
}

function initializeOarbeliCollection(callback) {
    async.parallel([
        (callback) => {
            var oarBeliBuilder = new OARBeliBuilder();
            
            oarBeliBuilder
                .date(new Date("2020/03/02"))
                .cpo(10)
                .cpoTonnage(100)
                .pk(20)
                .pkTonnage(200)
                .cangkang(30)
                .cangkangTonnage(300)
                .ring1(40)
                .ring1Tonnage(400)
                .rampLuar(55)
                .rampLuarTonnage(550)
                .ptpn(60)
                .ptpnTonnage(600)
                .inti(70)
                .intiTonnage(700)
                .plasma1(80)
                .plasma1Tonnage(800)
                .plasma3(90)
                .plasma3Tonnage(900)
                .hkl(100)
                .hklTonnage(1000)
                .hka(110)
                .hkaTonnage(1100)
                .hkla(115)
                .hklaTonnage(1150)
                .ss(120)
                .ssTonnage(1200)
                .kosOlah(130)
                .oarBeli(0.4)

            oarbeliCreate(oarBeliBuilder.createObject(), callback);
        }, (callback) => {
            var oarBeliBuilder = new OARBeliBuilder();
            
            oarBeliBuilder
                .date(new Date("2020/04/03"))
                .cpo(10)
                .cpoTonnage(100)
                .pk(20)
                .pkTonnage(200)
                .cangkang(30)
                .cangkangTonnage(300)
                .ring1(40)
                .ring1Tonnage(400)
                .rampLuar(55)
                .rampLuarTonnage(550)
                .ptpn(60)
                .ptpnTonnage(600)
                .inti(70)
                .intiTonnage(700)
                .plasma1(80)
                .plasma1Tonnage(800)
                .plasma3(90)
                .plasma3Tonnage(900)
                .hkl(100)
                .hklTonnage(1000)
                .hka(110)
                .hkaTonnage(1100)
                .hkla(115)
                .hklaTonnage(1150)
                .ss(120)
                .ssTonnage(1200)
                .kosOlah(130)
                .oarBeli(0.4)

            oarbeliCreate(oarBeliBuilder.createObject(), callback);
        }, (callback) => {
            var oarBeliBuilder = new OARBeliBuilder();
            
            oarBeliBuilder
                .date(new Date("2020/01/06"))
                .cpo(10)
                .cpoTonnage(100)
                .pk(20)
                .pkTonnage(200)
                .cangkang(30)
                .cangkangTonnage(300)
                .ring1(40)
                .ring1Tonnage(400)
                .rampLuar(55)
                .rampLuarTonnage(550)
                .ptpn(60)
                .ptpnTonnage(600)
                .inti(70)
                .intiTonnage(700)
                .plasma1(80)
                .plasma1Tonnage(800)
                .plasma3(90)
                .plasma3Tonnage(900)
                .hkl(100)
                .hklTonnage(1000)
                .hka(110)
                .hkaTonnage(1100)
                .hkla(115)
                .hklaTonnage(1150)
                .ss(120)
                .ssTonnage(1200)
                .kosOlah(130)
                .oarBeli(0.4)

            oarbeliCreate(oarBeliBuilder.createObject(), callback);
        }, (callback) => {
            var oarBeliBuilder = new OARBeliBuilder();
            
            oarBeliBuilder
                .date(new Date("2020/03/20"))
                .cpo(10)
                .cpoTonnage(100)
                .pk(20)
                .pkTonnage(200)
                .cangkang(30)
                .cangkangTonnage(300)
                .ring1(40)
                .ring1Tonnage(400)
                .rampLuar(55)
                .rampLuarTonnage(550)
                .ptpn(60)
                .ptpnTonnage(600)
                .inti(70)
                .intiTonnage(700)
                .plasma1(80)
                .plasma1Tonnage(800)
                .plasma3(90)
                .plasma3Tonnage(900)
                .hkl(100)
                .hklTonnage(1000)
                .hka(110)
                .hkaTonnage(1100)
                .hkla(115)
                .hklaTonnage(1150)
                .ss(120)
                .ssTonnage(1200)
                .kosOlah(130)
                .oarBeli(0.5)

            oarbeliCreate(oarBeliBuilder.createObject(), callback);
        }
    ],
    // optional callback
    callback);
}

async.series([
    initializeOarbeliCollection,
],
// Optional callback
(err, results) => {
    if (err) {
        console.log('FINAL ERR: ' + err);
    }
    else {
        console.log('We got it: ' + oarbeli_array);
    }
    // All done, disconnect from MongoDB
    mongoose.connection.close();
})
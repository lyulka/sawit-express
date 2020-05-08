var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define the schema
var OARBeliSchema = new Schema ({
    date: { type: Date, required: true, unique: true },
    cpo: { type: Number, required: true },
    pk: { type: Number, required: true },
    cangkang: { type: Number, required: true },
    ring1: { type: Number, required: true },
    ring1Tonnage: { type: Number, required: true },
    rampLuar: { type: Number, required: true },
    rampLuarTonnage: { type: Number, required: true },
    ptpn: { type: Number, required: true },
    ptpnTonnage: { type: Number, required: true },
    inti: { type: Number, required: true },
    intiTonnage: { type: Number, required: true },
    plasma1: { type: Number, required: true },
    plasma1Tonnage: { type: Number, required: true },
    plasma3: { type: Number, required: true },
    plasma3Tonnage: { type: Number, required: true },
    hkl: { type: Number, required: true },
    hklTonnage: { type: Number, required: true },
    hka: { type: Number, required: true },
    hkaTonnage: { type: Number, required: true },
    hkla: { type: Number, required: true },
    hklaTonnage: { type: Number, required: true },
    ss: { type: Number, required: true },
    ssTonnage: { type: Number, required: true },
    kosOlah: { type: Number, required: true },
    oarBeli: { type: Number, required: true}
});

// Export model
module.exports = mongoose.model('OARBeli', OARBeliSchema);
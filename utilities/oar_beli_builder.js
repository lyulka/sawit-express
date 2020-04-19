class OARBeliBuilder {
    constructor() {

    };

    date(date) {this.mDate = date; return this;}

    cpo(cpo) {this.mCpo = cpo; return this;}

    cpoTonnage(cpo_tonnage) {this.mCpoTonnage = cpo_tonnage; return this;}
    
    pk(pk) {this.mPk = pk; return this;}
    
    pkTonnage(pk_tonnage) {this.mPkTonnage = pk_tonnage; return this;}
    
    cangkang(cangkang) {this.mCangkang = cangkang; return this;}
    
    cangkangTonnage(cangkang_tonnage) {this.mCangkangTonnage = cangkang_tonnage; return this;}
    
    ring1(ring1) {this.mRing1 = ring1; return this;}
    
    ring1Tonnage(ring1_tonnage) {this.mRing1Tonnage = ring1_tonnage; return this;}
    
    supplier(supplier) {this.mSupplier = supplier; return this;}
    
    supplierTonnage(supplier_tonnage) {this.mSupplierTonnage = supplier_tonnage; return this;}
    
    rampLuar(ramp_luar) {this.mRampLuar = ramp_luar; return this;}
    
    rampLuarTonnage(ramp_luar_tonnage) {this.mRampLuarTonnage = ramp_luar_tonnage; return this;}
    
    ptpn(ptpn) {this.mPtpn = ptpn; return this;}
    
    ptpnTonnage(ptpn_tonnage) {this.mPtpnTonnage = ptpn_tonnage; return this;}
    
    inti(inti) {this.mInti = inti; return this;}
    
    intiTonnage(inti_tonnage) {this.mIntiTonnage = inti_tonnage; return this;}
    
    plasma1(plasma1) {this.mPlasma1 = plasma1; return this;}
    
    plasma1Tonnage(plasma1_tonnage) {this.mPlasma1Tonnage = plasma1_tonnage; return this;}
    
    plasma3(plasma3) {this.mPlasma3 = plasma3; return this;}
    
    plasma3Tonnage(plasma3_tonnage) {this.mPlasma3Tonnage = plasma3_tonnage; return this;}
    
    hkl(hkl) {this.mHkl = hkl; return this;}
    
    hklTonnage(hkl_tonnage) {this.mHklTonnage = hkl_tonnage; return this;}
    
    hka(hka) {this.mHka = hka; return this;}
    
    hkaTonnage(hka_tonnage) {this.mHkaTonnage = hka_tonnage; return this;}
    
    hkla(hkla) {this.mHkla = hkla; return this;}
    
    hklaTonnage(hkla_tonnage) {this.mHklaTonnage = hkla_tonnage; return this;}
    
    ss(ss) {this.mSs = ss; return this;}
    
    ssTonnage(ss_tonnage) {this.mSsTonnage = ss_tonnage; return this;}
    
    kosOlah(kos_olah) {this.mKosOlah = kos_olah; return this;}
    
    oarBeli(oar_beli) {this.mOarBeli = oar_beli; return this;}

    createObject() {
        var result = {};

        console.log("Date: " + this.mDate);
        console.log("cpo: " + this.mCpo);

        result.date = this.mDate;
        result.cpo = this.mCpo;
        result.cpoTonnage = this.mCpoTonnage;
        result.pk = this.mPk;
        result.pkTonnage = this.mPkTonnage;
        result.cangkang = this.mCangkang;
        result.cangkangTonnage = this.mCangkangTonnage;
        result.ring1 = this.mRing1;
        result.ring1Tonnage = this.mRing1Tonnage;
        result.supplier = this.mSupplier;
        result.supplierTonnage = this.mSupplierTonnage;
        result.rampLuar = this.mRampLuar;
        result.rampLuarTonnage = this.mRampLuarTonnage;
        result.ptpn = this.mPtpn;
        result.ptpnTonnage = this.mPtpnTonnage;
        result.inti = this.mInti;
        result.intiTonnage = this.mIntiTonnage;
        result.plasma1 = this.mPlasma1;
        result.plasma1Tonnage = this.mPlasma1Tonnage;
        result.plasma3 = this.mPlasma3;
        result.plasma3Tonnage = this.mPlasma3Tonnage;
        result.hkl = this.mHkl;
        result.hklTonnage = this.mHklTonnage;
        result.hka = this.mHka;
        result.hkaTonnage = this.mHkaTonnage;
        result.hkla = this.mHkla;
        result.hklaTonnage = this.mHklaTonnage;
        result.ss = this.mSs;
        result.ssTonnage = this.mSsTonnage;
        result.kosOlah = this.mKosOlah;
        result.oarBeli = this.mOarBeli;

        return result;
    }
}

module.exports = OARBeliBuilder;
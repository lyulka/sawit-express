const commaFormatter = (value) => {
    const decPlaces = 2
    const decSep = ".";
    const thouSep = ",";

    var sign = value < 0 ? "-" : "";
    var i = String(parseInt(value = Math.abs(Number(value) || 0).toFixed(decPlaces)));
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, thouSep) +
        (decPlaces ? decSep + Math.abs(value - i).toFixed(decPlaces).slice(2) : "");
}

const tonaseFormatter = (value) => {
    return `${value} ton`
}


exports.formatter = (type) => {
    switch (type) {
        case 'comma':
            return commaFormatter;
        case 'tonase':
            return tonaseFormatter;
        default:
            return commaFormatter;
    }
}
const { readers } = require("./readers");

const groupByFirstLetter = (data) => {
    return data.reduce((rv, x) => {
        (rv[x[0]] = rv[x[0]] || []).push(x);
        return rv;
    }, {});
};

const readIGC = (igcData) => {
    const lines = igcData.split("\r\n");
    if (lines.length === 0) {
        console.log("Empty file!");
        return { headers: [], positions: [] };
    }
    const records = groupByFirstLetter(lines); // grouped lines, example: { B: ["B1247...", ...], H: ["HFDTE040421", ...]}

    const headers = []; // list of translated data
    for (let Hrecord of records.H) {
        const reader = readers.filter((r) => Hrecord.startsWith(r.code))[0]; // get reader able to translate this header
        if (reader) {
            // if found
            if (Hrecord.indexOf(":") >= 0) {
                // if there is ":"
                if (Hrecord.indexOf(":") < Hrecord.length - 1) {
                    //and there is something after ":"
                    headers.push(reader.getData(Hrecord.split(":")[1]));
                }
            } else {
                // if not process whole record
                headers.push(reader.getData(Hrecord));
            }
        }
    }

    const positions = []; // list of translated positions
    const reader = readers.filter((r) => r.code === "B")[0]; // get reader able to translate B records
    if (reader) {
        // if reader exists
        for (let Brecord of records.B) {
            positions.push(reader.getData(Brecord));
        }
    }
    return { headers, positions };
};

export default readIGC;

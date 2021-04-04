const { readers } = require("./readers");

const groupByFirstLetter = (data) => {
    return data.reduce((rv, x) => {
        (rv[x[0]] = rv[x[0]] || []).push(x);
        return rv;
    }, {});
};

const readIGC = (igcData) => {
    const lines = igcData.split("\n");
    const records = groupByFirstLetter(lines); // grouped lines, example: { B: ["B1247...", ...], H: ["HFDTE040421", ...]}

    const headers = []; // list of translated data
    for (let Hrecord of records.H) {
        const reader = readers.filter((r) => Hrecord.startsWith(r.code))[0]; // get reader able to translate this header
        if (reader) {
            // if found
            if (Hrecord.split(":")[1] !== undefined) {
                // if there is something after ":"
                headers.push(reader.getData(Hrecord.split(":")[1]));
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

const fetch = require("node-fetch");
const readers = require("./readers");

const groupByFirstLetter = (data) => {
    return data.reduce((rv, x) => {
        (rv[x[0]] = rv[x[0]] || []).push(x);
        return rv;
    }, {});
};

const readIGC = async (link) => {
    const igcData = await (await fetch(link)).text();
    const lines = igcData.split("\n");
    const records = groupByFirstLetter(lines);
    for (let Hrecord of records.H) {
        const reader = readers.filter((r) => Hrecord.startsWith(r.code))[0]; // get reader
        if (reader) {
            if (Hrecord.split(":")[1] !== undefined) {
                // if there is something after ":"
                console.log(reader.getData(Hrecord.split(":")[1]));
            } else {
                // if not process whole record
                console.log(reader.getData(Hrecord));
            }
        }
    }
};

readIGC(
    "https://xcportal.pl/sites/default/files/tracks/2021-04-02/2021-04-02-xcs-aaa-011412629206.igc"
);

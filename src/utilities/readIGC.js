const fetch = require("node-fetch");
const { readers } = require("./readers");
const axios = require("axios");

const groupByFirstLetter = (data) => {
    return data.reduce((rv, x) => {
        (rv[x[0]] = rv[x[0]] || []).push(x);
        return rv;
    }, {});
};

const readIGC = (igcData) => {
    try {
        const lines = igcData.split("\n");
        const records = groupByFirstLetter(lines);

        const headers = [];
        for (let Hrecord of records.H) {
            const reader = readers.filter((r) => Hrecord.startsWith(r.code))[0]; // get reader
            if (reader) {
                if (Hrecord.split(":")[1] !== undefined) {
                    // if there is something after ":"
                    headers.push(reader.getData(Hrecord.split(":")[1]));
                } else {
                    // if not process whole record
                    headers.push(reader.getData(Hrecord));
                }
            }
        }

        const positions = [];
        const reader = readers.filter((r) => r.code === "B")[0];
        for (let Brecord of records.B) {
            if (reader) {
                positions.push(reader.getData(Brecord));
            }
        }
        return { headers, positions };
    } catch (err) {
        console.log(err);
    }
};

export default readIGC;

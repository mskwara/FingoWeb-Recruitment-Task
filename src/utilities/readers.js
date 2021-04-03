export default [
    {
        code: "HFDTE",
        getData: (record) => {
            const value = record.substring(5);
            const day = value.substr(0, 2);
            const month = value.substr(2, 2);
            const year = value.substr(4, 2);
            return `Date: ${day}.${month}.${year}`;
        },
    },
    {
        code: "HFFXA",
        getData: (record) => {
            const value = record.substring(5);
            return `Fix accuracy: ${parseInt(value)} meters`;
        },
    },
    {
        code: "HFPLT",
        getData: (record) => {
            return `Pilot in charge: ${record}`;
        },
    },
    {
        code: "HFCM2",
        getData: (record) => {
            return `Second pilot: ${record}`;
        },
    },
    {
        code: "HFGTY",
        getData: (record) => {
            return `Glider model: ${record}`;
        },
    },
    {
        code: "HFGID",
        getData: (record) => {
            return `Glider registration number: ${record}`;
        },
    },
    {
        code: "HFDTM",
        getData: (record) => {
            return `GPS datum: ${record}`;
        },
    },
    {
        code: "HFRFW",
        getData: (record) => {
            return `Firmware revision of the logger: ${record}`;
        },
    },
    {
        code: "HFRHW",
        getData: (record) => {
            return `Hardware revision of the logger: ${record}`;
        },
    },
    {
        code: "HFFTY",
        getData: (record) => {
            return `Logger manufacturer and model: ${record}`;
        },
    },
    {
        code: "HFGPS",
        getData: (record) => {
            return `Manufacturer and model of the GPS receiver used in the logger: ${record}`;
        },
    },
    {
        code: "HFPRS",
        getData: (record) => {
            return `Pressure sensor used in the logger: ${record}`;
        },
    },
    {
        code: "HFCID",
        getData: (record) => {
            return `The fin-number: ${record}`;
        },
    },
    {
        code: "HFCCL",
        getData: (record) => {
            return `Glider class: ${record}`;
        },
    },
];

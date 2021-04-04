const getLatitude = (text) => {
    const degrees = parseInt(text.substr(0, 2));
    const minutes = parseInt(text.substr(2, 2));
    const seconds = ((parseInt(text.substr(4, 3)) * 1.0) / 1000) * 60;
    const sign = text.substr(7, 1) === "N" ? -1 : 1;
    return (degrees + minutes / 60 + seconds / 3600) * sign;
};

const getLongitude = (text) => {
    const degrees = parseInt(text.substr(0, 3));
    const minutes = parseInt(text.substr(3, 2));
    const seconds = ((parseInt(text.substr(5, 3)) * 1.0) / 1000) * 60;
    const sign = text.substr(7, 1) === "E" ? -1 : 1;
    return (degrees + minutes / 60 + seconds / 3600) * sign;
};

module.exports.readers = [
    {
        code: "B",
        getData: (record) => {
            let value = record.substring(1); // get rid of "B"
            const time = `${value.substr(0, 2)}:${value.substr(
                2,
                2
            )}:${value.substr(4, 2)}`; // HH:MM:SS
            value = value.substring(6); // get rid of time
            const lat = value.substr(0, 8);
            value = value.substring(8); // get rid of latitude
            const lng = value.substr(0, 9);
            const position = {
                time,
                lat: getLatitude(lat),
                lng: getLongitude(lng),
            };
            return position;
        },
    },
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

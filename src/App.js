import "./App.css";
import { useState } from "react";
import MapViewer from "./components/MapViewer";
import readIGC from "./utilities/readIGC";
import axios from "axios";

const App = () => {
    const [link, setLink] = useState("");
    const [data, setData] = useState({
        headers: [],
        positions: [],
    });
    const [loading, setLoading] = useState(false);

    const onInput = (event) => {
        setLink(event.target.value);
    };
    const processData = async () => {
        if (link.slice(-4) !== ".igc") {
            console.log("Wrong link!");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.get(
                // get igc file
                process.env.REACT_APP_HOST + link.replaceAll("/", "%2F")
            );
            setLoading(false);
            const { headers, positions } = readIGC(res.data); // spread result of readIGC function into headers and positions
            setData({
                headers,
                positions,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="App">
            <header>IGC Reader by Michał Skwara</header>
            <input
                type="text"
                value={link}
                onChange={onInput}
                placeholder="Paste igc link"
            ></input>
            <button onClick={processData}>Display</button>
            <p className="hint">Examples:</p>
            <p className="hint">
                https://xcportal.pl/sites/default/files/tracks/2021-04-04/2021-04-04-xfh-000-03_2542648512.igc
            </p>
            <p className="hint">
                https://xcportal.pl/sites/default/files/tracks/2021-04-04/2021-04-04-xtr-b67b5200ef90-011813799330.igc
            </p>
            {loading && <p>Loading data...</p>}

            <h1>Flight information:</h1>
            {data.headers.length === 0 && <p>Insert your link first...</p>}
            {data.headers.map((header, index) => (
                <p key={index}>{header}</p>
            ))}

            <h1>Map (limited free version):</h1>
            <MapViewer positions={data.positions} />
        </div>
    );
};

export default App;

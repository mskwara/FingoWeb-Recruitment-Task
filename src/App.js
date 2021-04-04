import "./App.css";
import { useState } from "react";
import MapViewer from "./components/MapViewer";
import readIGC from "./utilities/readIGC";
import axios from "axios";

const App = () => {
    const [link, setLink] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const onInput = (event) => {
        setLink(event.target.value);
    };
    const processData = async () => {
        console.log(process.env.REACT_APP_HOST);
        setLoading(true);
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
            {data && data.headers && (
                <>
                    <h1>Headers:</h1>
                    {data.headers.map((header, index) => (
                        <p key={index}>{header}</p>
                    ))}
                </>
            )}
            {loading && "Loading..."}
            {data && (
                <>
                    <h1>Map (limited free version):</h1>
                    <MapViewer positions={data.positions} />
                </>
            )}
        </div>
    );
};

export default App;

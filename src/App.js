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
        setLoading(true);
        const res = await axios.get(
            "http://localhost:8000/" + link.replaceAll("/", "%2F")
        );
        setLoading(false);
        const { headers, positions } = readIGC(res.data);
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
            {data &&
                data.headers &&
                data.headers.map((header, index) => (
                    <p key={index}>{header}</p>
                ))}
            {loading && "Loading..."}
            {data && <MapViewer positions={data.positions} />}
        </div>
    );
};

export default App;

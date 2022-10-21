import React from "react";
import { useState, useEffect} from "react";
import { queryMatch, airportString, manageScrollView } from '../../utils.js';
import Results from '../Results';
import "./styles.css";

function Autocomplete({label, setPoint, clearPoint}) {
    const [value, setValue] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState(null);
    const [input, setInput] = useState(null);

    useEffect(() => {
        manageScrollView();
    });

    function positions() {
        return {
        NONE: 0,
        ONLY: 1,
        FIRST: 2,
        LAST: 3,
        MID: 4
        };
    }

    function highlightedPosition(index) {
        if (index === -1) {
        return 0;
        } else if (!results[index + 1] && !results[index - 1]) {
        return 1;
        } else if (!results[index - 1]) {
        return 2;
        } else if (!results[index + 1]) {
        return 3;
        } else {
        return 4;
        }
    }

    function updateResults(e) {
        setValue(e.target.value);
        setSuggestion(e.target.value);
        setResults(queryMatch(e.target.value));
        setSelected(null);
        if (!results[0]) {
        clearPoint(label);
        }
    }

    function handleDown(index) {
        switch (highlightedPosition(index)) {
        case positions().NONE:
            setSuggestion(airportString(results[0]));
            setSelected(results[0]);
            break;
        case positions().FIRST:
        case positions().MID:
            setSuggestion(airportString(results[index + 1]));
            setSelected(results[index + 1]);
            break;
        case positions().ONLY:
        case positions().LAST:
            return;
        }
    }

    function handleUp(index) {
        if (!selected) return;

        switch (highlightedPosition(index)) {
        case positions().FIRST:
        case positions().ONLY:
            setSuggestion(value);
            setSelected(null);
            break;
        default:
            setSuggestion(airportString(results[index - 1]));
            setSelected(results[index - 1]);
        }
    }

    function handleEnter() {
        if (!selected) {
        const first = results[0];
        if (first) {
            confirm(first);
        } else {
            return;
        }
        } else {
        confirm(selected);
        }
    }

    function confirm(airport) {
        setSuggestion(airportString(airport));
        setResults([]);
        setPoint(label, JSON.stringify({
        lat: airport.lat,
        lng: airport.lng,
        name: airport.name
        }));
        }

    function updateSuggestion(e) {
        const key = e.keyCode;
        const index = results.indexOf(selected);
        if (![13, 38, 40].includes(key)) return;

        if (!results[0]) return;

        switch (key) {
        case 38:
            e.preventDefault();
            handleUp(index);
            break;
        case 40:
            e.preventDefault();
            handleDown(index);
            break;
        case 13:
            handleEnter();
            break;
        }
    }

    function setField(e) {
        const item = e.currentTarget;
        const coords = JSON.parse(item.dataset.coords);
        setSuggestion(item.innerHTML);
        setResults([]);
        setPoint(label, JSON.stringify({
        lat: coords.lat,
        lng: coords.lng,
        name: item.dataset.name
        }));
    }

    function clearResults(e) {
        setResults([]);
    }

    // function manageScrollView() {
    //     if (!selected) return;
    //     const index = results.indexOf(selected);
    //     const position = highlightedPosition(index);
    //     const list = document.getElementById("results");
    //     const item = document.getElementById(`result-${index}`);
    //     const listHeight = list.offsetHeight;
    //     const itemHeight = item.offsetHeight;
    //     const itemPosition = item.offsetTop;
    //     const scrollPosition = list.scrollTop;
    //     const bottom = listHeight + scrollPosition;
    //     const itemBottom = itemPosition + itemHeight;
    //     if (position === positions().FIRST) {
    //     list.scrollTop = 0;
    //     } else if (position === positions().LAST) {
    //     list.scrollTop = itemBottom - listHeight;
    //     } else if (itemBottom > bottom) {
    //     list.scrollTop = itemBottom - listHeight;
    //     } else if (itemPosition < scrollPosition) {
    //     list.scrollTop = itemPosition;
    //     }
    // }

    return (
        <div className="autocomplete">
            <label>{ label }</label>
            <input
                ref={ input => { setInput(input); } }
                id={ label }
                onBlur={ clearResults }
                onChange={ updateResults }
                value={ suggestion }
                onKeyDown={ updateSuggestion }
            />
            { results[0] &&
            <Results
                setField={ setField }
                results={ results }
                selected={ selected }
            />
            }
        </div>

    );
}

export default Autocomplete;
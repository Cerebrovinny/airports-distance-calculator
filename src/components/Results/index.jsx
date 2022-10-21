import React from 'react';

export default ({ results, setField, selected }) => {
    const items = results.map((result, idx) => {
        const itemString = result.iata + " - " + result.name + ", " + result.city + ", " + result.state;
        const coords = JSON.stringify({ lat: result.lat, lng: result.lng });
        if (result === selected) {
            return (
                <li
                    onMouseDown={ setField }
                    key={ idx }
                    data-coords={ coords }
                    data-name={ result.name }
                    className='selected'>
                    { itemString }
                </li>
            );
        } else {
            return (
                <li
                    onMouseDown={ setField }
                    key={ idx }
                    data-coords={ coords }
                    data-name={ result.name }>
                    { itemString }
                </li>
            );
        }
    });

    return (
        <ul>
            { items }
        </ul>
    );
};

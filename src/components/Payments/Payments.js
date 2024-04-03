import React from 'react';

const Payments = () => {
    const webSocket = new WebSocket('ws://127.0.0.1:8000/applications/ws/new_applications')
    console.log(webSocket.readyState)
    webSocket.onopen = function (event) {
        console.log('Я открылся')
    }
    return (
        <div>
            Выплаты
        </div>
    );
};

export default Payments;
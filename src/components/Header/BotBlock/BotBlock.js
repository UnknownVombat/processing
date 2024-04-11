// import React, {useState} from 'react';
import React from "react";
import bell from "../../../icons/bxs-bell.svg";
import '../Header.css'
import {userapi} from "../../../api/userApi";

const BotBlock = () => {
    const {data: botData, error: botError, isLoading: botLoading, isError: botIsError} = userapi.useBotQuery()
    if (botIsError) {
        console.log(botError)
    }
    if (botLoading) {
        return <div>Loading</div>
    }
    return (
        <div className={'little_icons'}>
            <a href={'https://t.me/' + (botData['success'] === true ? botData['result']: '')} target="_blank" rel="noreferrer"><img src={bell} alt='Bl'/></a>
        </div>
    );
};

export default BotBlock;
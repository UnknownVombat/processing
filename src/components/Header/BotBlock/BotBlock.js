// import React, {useState} from 'react';
import React from "react";
import bell from "../../../icons/bxs-bell.svg";
import '../Header.css'
import {userapi} from "../../../api/userApi";
import {authStorage} from "../../../storages/AuthStorage";

const BotBlock = () => {
    const key = authStorage((state) => state.key)

    const header = {'Authorization': key}
    const {data: botData, error: botError, isLoading: botLoading, isError: botIsError} = userapi.useBotQuery(header)
    if (botIsError) {
        console.error(botError)
    }
    if (botLoading) {
        return <div>Loading</div>
    }
    return (
        <div className={'little_icons'}>
            <a href={'https://t.me/' + (botData ? botData['result']: '')} target="_blank" rel="noreferrer"><img src={bell} alt='Bl'/></a>
        </div>
    );
};

export default BotBlock;
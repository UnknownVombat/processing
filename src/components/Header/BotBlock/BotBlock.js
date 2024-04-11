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

    // const [bot, setBot] = useState('')
    const bot = ''

    if (botData) {
        if (botData['access']) {
            // setBot(botData['result'])
            console.log(botData['result'])
        }
    }
    if (botIsError) {
        console.error(botError)
    }
    if (botLoading) {
        console.log('Loading...')
    }
    return (
        <div className={'little_icons'}>
            <a href={'https://t.me/' + bot} target="_blank" rel="noreferrer"><img src={bell} alt='Bl'/></a>
        </div>
    );
};

export default BotBlock;
import React, {useState} from 'react';
import bell from "../../../icons/bxs-bell.svg";
import '../Header.css'
import {userapi} from "../../../api/userApi";
import {authStorage} from "../../../storages/AuthStorage";

const BotBlock = () => {
    const key = authStorage((state) => state.key)

    const header = {'Authorization': key}
    const {data: botData, error: botError} = userapi.useBotQuery(header)

    const [bot, setBot] = useState('')

    if (botData) {
        if (botData['access']) {
            setBot(botData['result'])
        }
    }
    if (botError) {
        console.error(botError)
    }
    return (
        <div className={'little_icons'}>
            <a href={'https://t.me/' + bot} target="_blank" rel="noreferrer"><img src={bell} alt='Bl'/></a>
        </div>
    );
};

export default BotBlock;
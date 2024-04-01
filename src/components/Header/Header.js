import React, {useState} from 'react';
import './Header.css'
import wrench from '../../icons/bxs-wrench.svg'
import bell from '../../icons/bxs-bell.svg'
import user from '../../icons/bxs-user.svg'
import arrow from '../../icons/bx-chevron-down.svg'
import start from '../../icons/play-regular-24.png'
import stop from '../../icons/pause-regular-24.png'
import {logoutUser, switchActive} from "../../Requests";
import {NavLink} from "react-router-dom";
import {authStorage} from "../../storages/AuthStorage";


const Header = () => {
    const key = authStorage((state) => state.key)
    const resetKey = authStorage((state) => state.resetKey)
    function logoutF(){
        resetKey('')
        logoutUser(key)
    }
    function changeUserActive() {
        document.getElementById('user_block').classList.toggle('active')
        document.getElementById('user_hidden_block').classList.toggle('active')
    }
    function changePauseActive() {
        document.getElementById('is_paused').classList.toggle('active')
        document.getElementById('check_pause').classList.toggle('active')
    }
    const [isActive, setActive] = useState(false);

    async function handleToggle(){
        setActive(!isActive);
        const result = await switchActive(!isActive, key)
        console.log(result)
    }
    return (
        <header>
            <div className={'block'}>
                <div className={'little_icons_block'}>
                    <div className={'is_paused'} onClick={handleToggle} id='is_paused'>
                        <img src={isActive ? stop: start} alt='St'/>
                        <p>{isActive ? 'Остановить': 'Активировать'}</p>
                    </div>
                    <div className={'little_icons'} onClick={changePauseActive} id='check_pause'>
                        <img src={wrench} alt='Wr'/>
                    </div>
                    <div className={'little_icons'}>
                        <a href='https://www.youtube.com/' target="_blank" rel="noreferrer"><img src={bell} alt='Bl'/></a>
                    </div>
                </div>
                <div className={'user_block_big'}>
                    <div className={'user_block'} id='user_block' onClick={changeUserActive}>
                        <img src={user} alt='Us'/>
                        <p>OFFICE_USER1</p>
                        <img src={arrow} alt='Ar'/>
                    </div>
                    <div className={'user_hidden_block'} id='user_hidden_block'>
                        <div className={'user_block_little'}>Настройки</div>
                        <NavLink to='/auth'><div className={'user_block_little'} onClick={logoutF}>Выйти</div></NavLink>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;
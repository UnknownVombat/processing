import React from 'react';
import './Header.css'
import wrench from '../../icons/bxs-wrench.svg'
import user_img from '../../icons/bxs-user.svg'
import arrow from '../../icons/bx-chevron-down.svg'
import start from '../../icons/play-regular-24.png'
import stop from '../../icons/pause-regular-24.png'
import {NavLink, useNavigate} from "react-router-dom";
import {authStorage} from "../../storages/AuthStorage";
import {userapi} from "../../api/userApi";
import BotBlock from "./BotBlock/BotBlock";
import useAuthRedirect from '../../hooks/keyCheckHook';
import { dataStorage } from '../../storages/DataStorage';


const Header = () => {
    useAuthRedirect()
    const navigate = useNavigate()
    const resetKey = authStorage((state) => state.resetKey)
    const setUpdates = dataStorage((state) => state.setGetUpdates)

    const {data: workersData, error: workersError, isError: workersIsError} = userapi.useWorkersQuery()
    const [logout, {data: logoutData, error: logoutError, isError: logoutIsError}] = userapi.useLogoutMutation()
    const [switchActive, {data: activeData, error: activeError, isError: activeIsError}] = userapi.useSwitchActiveMutation()


    function logoutF(){
        logout()
        resetKey('')
    }
    function changeUserActive() {
        document.getElementById('user_block').classList.toggle('active')
        document.getElementById('user_hidden_block').classList.toggle('active')
    }
    function changePauseActive() {
        document.getElementById('is_paused').classList.toggle('active')
        document.getElementById('check_pause').classList.toggle('active')
    }

    function handleToggle(){
        const status = {'paused': 'active', 'active': 'paused'}
        const body = {'status': status[workersData['user']['status']]}
        console.log(`New status: ${status[workersData['user']['status']]}`)
        if(status[workersData['user']['status']] === "active") {
            setUpdates(true)
        } else if (status[workersData['user']['status']] === "paused") {
            setUpdates(false)
        }
        switchActive(body)
    }

    if (activeData) {
        console.log(activeData)
        if (activeData['access'] === true) {
            window.location.reload()
        }
    }
    if (activeIsError) {
        console.log(activeError)
    }
    if (workersData) {
        console.log(workersData)
        // setAuth(authData['access'])
    }
    if (workersIsError) {
        console.log(workersError)
        // resetKey('')
        // navigate('/auth')
    }
    if (logoutData) {
        resetKey('')
        navigate('/auth')
    }
    if (logoutIsError) {
        console.log(logoutError)
        navigate('/auth')
    }
    return (
        <header>
            <div className={'block'}>
                <div className={'little_icons_block'}>
                    <div className={'is_paused'} onClick={handleToggle} id='is_paused'>
                        <img src={workersData ? workersData['user']['status'] === 'active' ? stop: start: stop} alt='St'/>
                        <p>{workersData ? workersData['user']['status'] === 'active' ? 'Остановить': 'Активировать': 'Остановить'}</p>
                    </div>
                    <div className={'little_icons'} onClick={changePauseActive} id='check_pause'>
                        <img src={wrench} alt='Wr'/>
                    </div>
                    <BotBlock />
                </div>
                <div className={'user_block_big'}>
                    <div className={'user_block'} id='user_block' onClick={changeUserActive}>
                        <img src={user_img} alt='Us'/>
                        <p>{workersData ? workersData['user']['name']: ''}</p>
                        <img src={arrow} alt='Ar'/>
                    </div>
                    <div className={'user_hidden_block'} id='user_hidden_block'>
                        <NavLink to='/settings'><div className={'user_block_little'}>Настройки</div></NavLink>
                        <NavLink to='/auth'><div className={'user_block_little'} onClick={logoutF}>Выйти</div></NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
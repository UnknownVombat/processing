import React, {useState} from 'react';
import './Header.css'
import wrench from '../../icons/bxs-wrench.svg'
import user_img from '../../icons/bxs-user.svg'
import arrow from '../../icons/bx-chevron-down.svg'
import start from '../../icons/play-regular-24.png'
import stop from '../../icons/pause-regular-24.png'
import {NavLink, useNavigate} from "react-router-dom";
import {authStorage} from "../../storages/AuthStorage";
import {dataStorage} from "../../storages/DataStorage";
import {userapi} from "../../api/userApi";
import BotBlock from "./BotBlock/BotBlock";


const Header = () => {
    const key = authStorage((state) => state.key)
    const resetKey = authStorage((state) => state.resetKey)
    const user = dataStorage((state) => state.user)
    const resetUser = dataStorage((state) => state.resetStatus)

    const header = {'Authorization': key}
    const {data: authData, error: authError, isError: authIsError} = userapi.useAuthQuery(header)
    const [logout, {data: logoutData, error: logoutError, isError: logoutIsError}] = userapi.useLogoutMutation()
    const [switchActive, {data: activeData, error: activeError, isError: activeIsError}] = userapi.useSwitchActiveMutation()

    const [authented, setAuth] = useState(true)
    const [isActive, setActive] = useState(user['status']);
    const navigate = useNavigate()

    function logoutF(){
        resetKey('')
        logout(header)
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
        const status = {true: 'active', false: 'paused'}
        const body = {'status': status[!isActive]}
        switchActive(body, header)
    }
    if (activeData) {
        if (activeData['access'] === true) {
            setActive(!isActive);
            resetUser(user['name'], user['balance'], !isActive)
        }
    }
    if (activeIsError) {
        console.error(activeError)
    }
    if (authData) {
        alert('Получил данные')
        setAuth(authData['access'])
    }
    if (authIsError) {
        console.error(authError)
    }
    if (logoutData) {
        navigate('/auth')
    }
    if (logoutIsError) {
        console.error(logoutError)
        navigate('/auth')
    }
    // if (authLoading || logoutIsLoading || activeIsLoading) {
    //     return <div>Loading</div>
    // }
    // useEffect(() => {
    //
    // }, [isActive]);
    if (authented) {
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
                        <BotBlock />
                    </div>
                    <div className={'user_block_big'}>
                        <div className={'user_block'} id='user_block' onClick={changeUserActive}>
                            <img src={user_img} alt='Us'/>
                            <p>{user['name']}</p>
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
    } else {
        window.location.href = '/auth'
    }

};

export default Header;
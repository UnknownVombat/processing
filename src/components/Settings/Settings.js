import React, { useEffect } from 'react';
import styles from './Settings.module.css'
import {userapi} from "../../api/userApi";
import {useNavigate} from "react-router-dom";
import MethodsBlock from "./MethodsBlock/MethodsBlock";
import useAuthRedirect from "../../hooks/keyCheckHook"
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Settings = () => {
    useAuthRedirect()
    const { handleSubmit, register, reset } = useForm()
    const {data: workersData, error: workersError, isError: workersIsError} = userapi.useWorkersQuery()
    const [addBot, {data, error}] = userapi.useAddBotMutation()

    const navigate = useNavigate()

    useEffect(() => {
        if (data && data['success'] === true) {
            toast.success("Бот добавлен!")
            reset()
        }
    }, [data, reset])

    if (workersIsError) {
        if (workersError.status === 401) {
            console.error(workersError)
            navigate('/auth')
        } else {
            console.error(workersError.status)
        }
    }

    if (error) {
        console.error(error)
    }

    const addNewBot = (data) => {
        addBot(data)
    }

    return (
        <div className={styles.block}>
          <div className={styles.settings_div}>
            <h2>Настройки</h2>
            <form className={styles.form} onSubmit={handleSubmit(addNewBot)}>
              <label>Введите токен бота</label>
              <input type='text' placeholder='Токен бота' id='bot_token' 
              {...register("bot_token", {required: true})}/>
              <label>Введите имя бота</label>
              <input type='text' placeholder='Имя бота' id='bot_name' 
              {...register("bot_name", {required: true})}/>
              <label>Введите ваш телеграм ID</label>
              <input type='text' placeholder='Телеграм ID' id='tg_id' 
              {...register("telegram_id", {required: true})}/>
              <input type="submit" className={styles.submit} value={"Добавить"} />
            </form>
          </div>
          {workersData && workersData.status === 'user' ? null : <MethodsBlock />}
        </div>
      );
      

};

export default Settings;
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "./Forms.module.css"
import { adminApi } from "../../../api/adminApi";


const AddUserForm = () => {

    const [addUserTrigger, { data: userData, isError: userIsError }] = adminApi.useAddWorkerMutation()

    const {
        handleSubmit,
        register,
        setValue
    } = useForm(
        {
            mode: "onBlur"
        }
    )

    const handleClick = (data) => {
        console.log(data)
        toast.info("Делаю запрос!")
        addUserTrigger(data)
    }

    if(userIsError) {
        toast.error("Ошибка добавления пользователя")
    }

    if(userData) {
        if(userData["access"] === "true") {
            toast.success("Работник добавлен!")
        }
    }
    
    return (
        <form className={styles.form} onSubmit={handleSubmit(handleClick)}>
            <h3>Добавить пользователя</h3>
            <div className={styles.field_block}>
                <label>Введите имя пользователя</label>
                <input type='text' placeholder='Имя пользователя' id='user_name' {...register("name", {required: "Поле не заполнено!"})}/>
            </div>
            <div className={styles.field_block}>
                <label>Введите логин</label>
                <input type='text' placeholder='Логин' id='login' {...register("login", {required: true})}/>
            </div>
            <div className={styles.field_block}>
                <label>Пользователь админ?</label>
                <div className={styles.radio_div}>
                    <input type='radio' name='admin' value='true' id='is_admin' onClick={() => setValue("is_admin", true)}/>
                    <label htmlFor='admin_true'>Да</label>
                    <input type='radio' name='admin' value='false' defaultChecked={true} id='is_admin' onClick={() => setValue("is_admin", false)}/>
                    <label htmlFor='admin_false'>Нет</label>
                </div>
            </div>
            <div className={styles.field_block}>
                <label>Введите айди команды</label>
                <input type='number' placeholder='Айди' id='team_id' {...register("team_id", {required: true})}/>
            </div>
            <div className={styles.field_block}>
                <label>Введите пароль</label>
                <input type='text' placeholder='Пароль' id='password' {...register("password", {required: true})}/>
            </div>
            <input className={styles.submit} value={"Добавить"} type="submit"/>
        </form>
    )
}


export default AddUserForm;
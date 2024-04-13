import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "./Forms.module.css"
import { adminApi } from "../../../api/adminApi";


const AddTeamForm = () => {

    const [addTeamTrigger, {data: teamData, isError: teamIsError,  error: teamError }] = adminApi.useAddTeamMutation()

    const {
        handleSubmit,
        register
    } = useForm(
        {
            mode: "onBlur"
        }
    )

    const handleClick = (data) => {
        console.log(data)
        addTeamTrigger(data)
    }

    if(teamIsError) {
        toast.error("Ошибка добавления команды!")
        console.log(teamError)
    }

    if(teamData){
        if(teamData["access"] === true){
            toast.success("Команда добавлена!")
        } else {
            toast.error("Команда не добавлена!")
        }
    }
    
    return (
        <form className={styles.form} onSubmit={handleSubmit(handleClick)}>
            <h3>Добавить команду</h3>
            <div className={styles.field_block}>
                <label>Введите название команды</label>
                <input type='text' placeholder='Название команды' id='team_name' {...register("name", { required: true })}/>
            </div>
            <div className={styles.field_block}>
                <label>Введите контакт админа</label>
                <input type='text' placeholder='Контакт админа' id='admin_contact' {...register("admin_contact", {required: true})}/>
            </div>
            <input className={styles.submit} disabled={false} value={"Добавить"} type="submit"/>
        </form>
    )
}


export default AddTeamForm;

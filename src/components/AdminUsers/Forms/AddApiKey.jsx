import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "./Forms.module.css"
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { adminApi } from "../../../api/adminApi";


const AddApiForm = () => {

    const [addKeyTrigger, { data: keyData }] = adminApi.useAddKeyMutation()

    const [ apiKey, setApiKey ] = useState(null)
    const [ privateKey, setPrivateKey ] = useState(null)

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
        toast.info("Делаю запрос!")
        addKeyTrigger(data)
    }

    useEffect(() => {
        if (keyData) {
            console.log(keyData);
            if (keyData["access"] === true) {
                setApiKey(keyData["result"]["api_key"]);
                setPrivateKey(keyData["result"]["private_key"]);
                toast.success("Ключ получен!");
            } else {
                toast.error("Ошибка генерации ключа.");
            }
        }
    }, [keyData]);
    
    return (
        <form className={styles.form} onSubmit={handleSubmit(handleClick)}>
            <h3>Создать API ключи</h3>
            <div className={styles.field_block}>
                <label>Введите имя партнера</label>
                <input type='text' placeholder='Имя партнера' id='source_name' {...register("name", {required: true})}/>
            </div>
            <input type="submit" value={"Создать"}  />
            
            {apiKey && privateKey ? (
                <div>
                    <CopyToClipboard text={apiKey}>
                        <div>
                            <p>Ключ для клиента (Нажми на него, чтобы скопировать):<br/></p>
                            <span className={styles.api_key} onClick={() => toast.info('API-key скопирован в буфер обмена', { autoClose: 2000 })}>{apiKey}</span>
                        </div>
                    </CopyToClipboard>
                    <CopyToClipboard text={privateKey}>
                        <div>
                            <p>Ключ для клиента (Нажми на него, чтобы скопировать):<br/></p>
                            <span className={styles.api_key} onClick={() => toast.info('Приватный ключ скопирован в буфер обмена', { autoClose: 2000 })}>{privateKey}</span>
                        </div>
                    </CopyToClipboard>
                </div>
            ) : null}
            <button onClick={() => setApiKey(null)}>Готово</button>
        </form>
    )
}


export default AddApiForm;

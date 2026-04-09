import React from 'react';

/** Types */
import type { SendMessageFormInterface, ChatWindowFooterPropsInterface } from './ChatWindowFooter.types';

/** Styles */
import styles from "./ChatWindowFooter.module.css";
import { PlusIcon, SendHorizontalIcon } from 'lucide-react';

/** Note: Form Handling */
import { useForm } from "react-hook-form";

const ChatWindowFooter:React.FC<ChatWindowFooterPropsInterface> = ({handleSendMessage}) => {
    const { register, handleSubmit,reset,setFocus} = useForm<SendMessageFormInterface>();

    /** Note: Handle On Submit Form Data. */
    const handleOnSubmitFormData = (data:SendMessageFormInterface) =>{
        handleSendMessage(data.content);
        reset();
        setFocus("content");
    }
    return (
        <footer className={styles.footer}>
            <form onSubmit={handleSubmit(handleOnSubmitFormData)} style={{width:"100%"}}>
                <div className={styles.footerMain}>
                    <span><PlusIcon color='#15191a'/></span>
                    <div id="send-message-input" className={styles.sendMessageInputDev}>
                        <input type="text" className={styles.sendMessageInput} {...register("content",{required:true,validate: (value) => value.trim() !== "" || "Only spaces not allowed"})}  autoComplete='off' placeholder='Write a message here' />
                        <button type='submit' className={styles.sendBtn} ><SendHorizontalIcon color='#15191a' /></button>
                    </div>
                </div>
            </form>

        </footer>
    );
}   

export default ChatWindowFooter;

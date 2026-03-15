import React from 'react';

/** Types */
import type { SendMessageFormInterface, ChatWindowFooterPropsInterface } from './ChatWindowFooter.types';

/** Styles */
import styles from "./ChatWindowFooter.module.css";
import { PlusIcon, SendHorizontalIcon } from 'lucide-react';

/** Note: Form Handling */
import { useForm } from "react-hook-form";

const ChatWindowFooter:React.FC<ChatWindowFooterPropsInterface> = ({handleSendMessage}) => {
    const { register, handleSubmit} = useForm<SendMessageFormInterface>();

    /** Note: Handle On Submit Form Data. */
    const handleOnSubmitFormData = (data:SendMessageFormInterface) =>{
        handleSendMessage(data.content);
    }
    return (
        <footer className={styles.footer}>
            <div className="footerMail">
                <span><PlusIcon color='#15191a'/></span>
                <form onSubmit={handleSubmit(handleOnSubmitFormData)} style={{width:"100%"}}>
                    <div id="send-message-input" className={styles.sendMessageInputDev}>
                        <input type="text" className={styles.sendMessageInput} {...register("content",{required:true})} placeholder='Write a message here' />
                        <button type='submit' className={styles.sendBtn}><SendHorizontalIcon color='#15191a' /></button>
                    </div>
                </form>
            </div>
        </footer>
    );
}   

export default ChatWindowFooter;

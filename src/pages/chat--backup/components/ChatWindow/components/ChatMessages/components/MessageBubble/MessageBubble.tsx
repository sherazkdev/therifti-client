import React,{useContext} from 'react';

/** Styles */
import styles from "./MessageBubble.module.css";

/** Types */
import type { MessageBubblePropsInterface } from './MessageBubble.types';

/** Note: Auth Provider */
import { AuthContext } from '../../../../../../../../contexts/auth/auth.context';

import userEmtyState from "../../../../../../../../assets/icons/user-empty-state.svg";

const MessageBubble:React.FC<MessageBubblePropsInterface> = ({message}) => {
    const {user} = useContext(AuthContext);
    return (
        <>
            {/* Your message */}
            {user?._id === message.sender._id ? (
                <article className={styles.myMessageArtice}>
                    <div id="message" className={styles.mymessage}>
                        <span className={styles.yourtailOutIcon}>
                            <svg viewBox="0 0 8 13" height="13" color='#edf2f2' width="8" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
                        </span>
                        <div id="content" className={styles.yourMessage}>{message.content}</div>
                    </div>
                </article>
            ): (
                <> 
                    {/* Sender Message */}
                    <article className={styles.senderMessageArtice}>
                        <div id="avatar" className={styles.avatar}>
                            <img src={message.sender.avatar || userEmtyState} title={message.sender.fullname} onError={ (e) => e.currentTarget.src = userEmtyState} loading='lazy' />
                        </div>
                        <div id="message" className={styles.sendermessage}>
                            <span className={styles.sendertailOutIcon}>
                                <svg viewBox="0 0 8 13" height="13" color='#edf2f2' width="8" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>
                            </span>
                            <div id="content" className={styles.senderMessage}>{message.content}</div>
                        </div>
                    </article>
                </>
            )}
        </>
    );
}

export default MessageBubble;

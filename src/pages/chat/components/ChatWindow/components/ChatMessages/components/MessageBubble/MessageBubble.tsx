import React,{useContext} from 'react';

/** Styles */
import styles from "./MessageBubble.module.css";

/** Types */
import type { MessageBubblePropsInterface } from './MessageBubble.types';

/** Note: Auth Provider */
import { AuthContext } from '../../../../../../../../contexts/auth/auth.context';

import userEmtyState from "../../../../../../../../assets/icons/user-empty-state.svg";
import { TailInIcon, TailOutIcon } from '../../../../../../../../assets/icons/svgs/svg';

const MessageBubble:React.FC<MessageBubblePropsInterface> = ({message}) => {
    const {user} = useContext(AuthContext);
    return (
        <>
            {/* Your message */}
            {user?._id === message.sender._id ? (
                <article className={styles.myMessageArtice}>
                    <div id="message" className={styles.mymessage}>
                        <span className={styles.yourtailOutIcon}>
                            <TailOutIcon style={{marginLeft:"4px"}}/>
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
                                <TailInIcon />
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

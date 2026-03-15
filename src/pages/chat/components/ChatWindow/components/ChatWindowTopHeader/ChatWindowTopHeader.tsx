import React from 'react';

/** Types */
import type { ChatWindowTopHeaderPropsInterface } from './ChatWindowTopHeader.types';

/** Styles */
import styles from "./ChatWindowTopHeader.module.css";
import { Link } from 'react-router-dom';
import { XCircleIcon } from 'lucide-react';

import useEmptyState from "../../../../../../assets/icons/user-empty-state.svg";

/** Note: Socket Provider */
import {useSockets} from '../../../../../../contexts/sockets/socket.context';
import { useAuth } from '../../../../../../contexts/auth/auth.context';
const ChatWindowTopHeader:React.FC<ChatWindowTopHeaderPropsInterface> = ({onBack, selectedChat, handleToggleWindowSection}) => {
    const { onlineUsers } = useSockets();
    const { user } = useAuth();

    return (
        <header id='header' className={styles.header}>
            
            <div id="topHeader" className={styles.topHeader}>
                
                <div>
                    <button onClick={onBack} className={styles.backBtn}>
                        <svg fill="none" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M13.015 4.23a.727.727 0 0 1-.033 1.028l-6.416 6.015h12.707a.727.727 0 1 1 0 1.454H6.566l6.416 6.015a.727.727 0 1 1-.995 1.061L4.23 12.531a.727.727 0 0 1 0-1.062l7.757-7.272a.727.727 0 0 1 1.028.033"></path></svg>
                    </button>
                </div>

                <div>
                    <button onClick={ () => handleToggleWindowSection('COVERZATION_DETAILS')} className={styles.infoBtn}>
                        <svg fill="none" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M13 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1 3a.75.75 0 0 0-.75.75v5.5a.75.75 0 0 0 1.5 0v-5.5A.75.75 0 0 0 12 10"></path><path fill="currentColor" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11m0-1.5a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19"></path></svg>
                    </button>
                </div>

            </div>

            <div id="second-section" className={styles.secondSection}>
                <div id="left-section" className={styles.leftSection}>
                    {/* avatar */}
                    <div>
                        <img className={styles.avatar} src={selectedChat?.member.avatar || useEmptyState} onError={ (e) => e.currentTarget.src = useEmptyState}  loading='lazy' />
                    </div>

                    <div className={styles.memberInfo}>
                        {/* name */}
                        <span className={styles.memberName}>{selectedChat?.member.fullname}</span>

                        {/* about */}
                        <span className={styles.memberAbout}> </span>

                        {/* is Online status */}
                        {selectedChat && onlineUsers && onlineUsers[selectedChat?.member._id] && <span className={styles.isOnline}>Active now</span>}
                    </div>
                </div>
                
                <div id="right-section" className={styles.rightSection}>
                    <span>
                        <Link to="/" className={styles.makeAPaymentBtn}>Make a payment</Link>
                    </span>
                    <span>
                        <Link to="/" className={styles.cancelBtn}>
                            <span><XCircleIcon /></span>
                            Cancel offer
                        </Link>
                    </span>
                </div>
            </div>

        </header>
    );
}

export default ChatWindowTopHeader;

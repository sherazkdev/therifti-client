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
import { ArrowLeftIcon, InfoIcon } from '../../../../../../assets/icons/svgs/svg';
const ChatWindowTopHeader:React.FC<ChatWindowTopHeaderPropsInterface> = ({onBack, selectedChat, handleToggleWindowSection, handleDeleteChat}) => {
    const { onlineUsers } = useSockets();

    return (
        <header id='header' className={styles.header}>
            
            <div id="topHeader" className={styles.topHeader}>
                
                <div>
                    <button onClick={onBack} className={styles.backBtn}>
                        <ArrowLeftIcon />
                    </button>
                </div>

                <div>
                    <button onClick={ () => handleToggleWindowSection('COVERZATION_DETAILS')} className={styles.infoBtn}>
                        <InfoIcon />
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
                        <Link to={""} onClick={handleDeleteChat} className={styles.cancelBtn}>
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

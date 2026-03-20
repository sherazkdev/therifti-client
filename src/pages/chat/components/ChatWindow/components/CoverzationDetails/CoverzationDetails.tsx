import React from 'react';

/** Types */
import type { CoverzationDetailsPropsInterface } from './CoverzationDetails.types';

/** Styls */
import styles from "./CoverzationDetails.module.css";
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import useEmptyState from "../../../../../../assets/icons/user-empty-state.svg";

const CoverzationDetails:React.FC<CoverzationDetailsPropsInterface> = ({handleToggleWindowSection, selectedChat}) => {
    return (
        <div id="coveration-main" className={styles.coverzationDetails}>
            
            <div id="topHeader" className={styles.topHeader}>
                
                <div>
                </div>
                
                <div>
                    <span>Details</span>
                </div>

                <div>
                    <button onClick={ () => handleToggleWindowSection('COVERZATION_MESSAGES')} className={styles.infoBtn}>
                        <svg fill="none" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M4.213 4.213a.727.727 0 0 1 1.029 0L12 10.972l6.759-6.759a.727.727 0 1 1 1.028 1.029L13.029 12l6.758 6.759a.727.727 0 0 1-1.028 1.028L12 13.029l-6.758 6.758a.727.727 0 0 1-1.029-1.028L10.972 12 4.213 5.242a.727.727 0 0 1 0-1.029"></path></svg>
                    </button>
                </div>

            </div>

            <ul>
                {/* Product Ref */}
                <li id='product-ref' className={styles.productRefLi}>
                    <Link to={"/"} className={styles.productRef}>
                        <div className={styles.productRefImage}>
                            <img src={selectedChat?.productRef.coverImage} loading='lazy' />
                            <span>{selectedChat?.productRef.title}</span>
                        </div>
                        
                        <div className={styles.angleRightSection}>
                            <button>
                                <ChevronDown color='#5a6566'/>
                            </button>
                        </div>
                    </Link>
                </li>
                
                {/* Seller Profile */}
                <li className={styles.profileLi}>
                    <Link to={"/profile"} className={styles.profile}>
                        <span className={styles.profileImg}>
                            <img src={selectedChat?.member.avatar || useEmptyState} onError={ (e) => e.currentTarget.src = useEmptyState} loading='lazy' alt="" />
                        </span>
                        <span>{selectedChat?.member.fullname}</span>
                    </Link>
                </li>
                
                {/* Delete Converzation */}
                <li className={styles.deleteConverzation}>
                    <span>
                        <svg fill="none" color='#d04555' viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M9.75 8a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0v-8.5A.75.75 0 0 1 9.75 8m4.5 0a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0v-8.5a.75.75 0 0 1 .75-.75"></path><path fill="currentColor" d="M8.25 4V2.75C8.25 1.784 9.034 1 10 1h4c.966 0 1.75.784 1.75 1.75V4h4.5a.75.75 0 0 1 0 1.5h-1.214v14.75c0 1.61-1.457 2.75-3.036 2.75H8c-1.58 0-3.036-1.14-3.036-2.75V5.5H3.75a.75.75 0 0 1 0-1.5zm1.5-1.25V4h4.5V2.75A.25.25 0 0 0 14 2.5h-4a.25.25 0 0 0-.25.25m7.786 2.75H6.464v14.75c0 .6.59 1.25 1.536 1.25h8c.945 0 1.536-.65 1.536-1.25z"></path></svg>
                    </span>
                    <span>Delete conversation</span>
                </li>

                {/* Block */}
                <li className={styles.blockSeller}>
                    <span>
                        <svg fill="none" color='#d04555' viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M12 1C5.924 1 1 5.926 1 12c0 6.075 4.924 11 11 11 6.074 0 11-4.925 11-11 0-6.074-4.926-11-11-11M2.5 12a9.5 9.5 0 0 1 15.666-7.227L4.773 18.166A9.46 9.46 0 0 1 2.5 12.002Zm3.334 7.227L19.227 5.834a9.46 9.46 0 0 1 2.273 6.167c0 5.246-4.254 9.499-9.5 9.499a9.46 9.46 0 0 1-6.166-2.273"></path></svg>
                    </span>
                    <span>Block</span>
                </li>
            </ul>
        </div>
    );
}

export default CoverzationDetails;

import React,{useContext} from 'react';


/** Types */
import type { OfferMessageBubblePropsInterface } from './OfferMessageBubble.types';

/** Note: Auth Provider */
import { AuthContext } from '../../../../../../../../contexts/auth/auth.context';

import YourMessageBubble from './components/YourMessageBubble/YourMessageBubble';
import SenderMessageBubble from './components/SenderMessageBubble/SenderMesssageBubble';

const OfferMessageBubble:React.FC<OfferMessageBubblePropsInterface> = ({message, selectedChat}) => {
    const {user} = useContext(AuthContext);
    return (
        <>
            {/* Your message */}
            {user?._id === message.sender._id ? (
                <YourMessageBubble message={message} />
            ): (
                <SenderMessageBubble  selectedChat={selectedChat} message={message} />
            )}
        </>
    );
}

export default OfferMessageBubble;

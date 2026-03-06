import type { AuthFlow, AuthSteps, SocialAuthInterface } from "../../Auth.types";

/** @note:Social Auth Props Interface */
export interface SocialAuthPropsInterface {
    type:AuthFlow,
    onEmailClick: () => void,
    onSwitchMode: (type:AuthFlow) => void,
    onSocialAuth: (type:SocialAuthInterface) => void
}
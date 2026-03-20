import { Outlet,useLocation} from "react-router-dom";

/** Top Header */
import Header from "../../components/Header/Header";
import MainFooter from "../../components/mainFooter/MainFooter";

const MainLayout = () => {
    
    /**
     * Note: Router get location current page. 
    */
    const router = useLocation();
    const headerVariants: {pattern: RegExp;variant: "solid" | "overlay";}[] = 
    [
        { pattern: /^\/$/, variant: "overlay" },
        { pattern: /^\/profile/, variant: "solid" },
        { pattern: /^\/product/, variant: "solid" },
        { pattern: /^\/category/, variant: "overlay" },
        { pattern: /^\/login/, variant: "solid" },
        { pattern: /^\/sell/, variant: "solid" },
        { pattern: /^\/inbox/, variant: "solid" },
        { pattern: /^\/notifications/, variant: "solid" },
    ];
    
    const variant = headerVariants.find( (r) => r.pattern.test(router.pathname));
    console.log(variant)
    return (
        <>
            <Header variant={variant?.variant} />

            {/* @note: Chilren components. */}
            <Outlet />

            {/* @note: Fixed Footer. */}
            <MainFooter />
        </>
    )
};

export default MainLayout;
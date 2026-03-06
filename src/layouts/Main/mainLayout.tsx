import { Outlet,useLocation} from "react-router-dom";

/** Top Header */
import Header from "../../components/Header/Header";
import MainFooter from "../../components/mainFooter/MainFooter";

const MainLayout = () => {
    
    /**
     * Note: Router get location current page. 
    */
    const router = useLocation();
    const headerVariants: Record<string, "solid" | "overlay"> = {
        "/": "overlay",
        "/profile": "solid",
        "/product": "solid",
        "/category": "overlay",
        "/login": "solid",
        "/sell": "solid",
    };
    
    const variant = headerVariants[router.pathname || "overlay"];

    return (
        <>
            <Header variant={variant} />

            {/* @note: Chilren components. */}
            <Outlet />

            {/* @note: Fixed Footer. */}
            <MainFooter />
        </>
    )
};

export default MainLayout;
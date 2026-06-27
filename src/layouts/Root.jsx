import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer";
import Nav from "../pages/Shared/Nav";


const Root = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


const MainLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayouts;
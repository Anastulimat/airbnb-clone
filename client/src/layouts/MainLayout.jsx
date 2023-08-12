import Header from "../components/Header.jsx";
import {Outlet} from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="p-4 flex flex-col min-h-screen">
            <Header/>
            <Outlet/>
        </div>
    )
}
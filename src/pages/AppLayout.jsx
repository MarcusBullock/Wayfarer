import Sidebar from "../components/Sidebar";
import User from "../components/User";
import Map from "../components/Map";
import { useAuth } from "../context/FakeAuthContext";
import { useEffect } from "react";
import styles from "./AppLayout.module.css";
import { useNavigate } from "react-router-dom";

function AppLayout() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(
        function () {
            if (!isAuthenticated) {
                navigate("/");
            }
        },
        [isAuthenticated, navigate]
    );
    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
            <User />
        </div>
    );
}

export default AppLayout;

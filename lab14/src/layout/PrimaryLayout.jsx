import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';

function PrimaryLayout() { 
    return (
        <>
            <HeaderComponent />
            <Outlet />
        </>
    )
}

export default PrimaryLayout;
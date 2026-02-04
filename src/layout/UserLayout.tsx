import LoggedHeader from '../components/Headers/LoggedHeader';

import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav/BottomNav';

export default function UserLayout() {
      
    return (
    <>
        <div className="relative flex flex-col bg-white2">
            
            <LoggedHeader />

            <main className="flex-1 min-h-screen my-20 overflow-y-auto p-2">
                <Outlet />
            </main>

            <BottomNav />  
        </div>
    
    </>
    );

}

import {CSidebar, CSidebarNav, CNavTitle, CNavItem} from '@coreui/react';

function Sidebar() {
    const logoutFn = () => {
        localStorage.clear();
        window.location.href ="/"
    }
    return(
        <CSidebar unfoldable className='vh-100 bg-black'>
            <CSidebarNav>
                <CNavItem className='bg-dark d-flex'>
                    <i className='bi bi-bar-chart-fill text-white mx-3 my-2'></i>
                    <h5 className='text-white fw-bolder mx-3 my-2'>Menu</h5>
                </CNavItem>
                <CNavTitle className='text-light fw-bolder'>
                    A CRM app for all your needs...
                </CNavTitle>
                <CNavItem className='bg-dark d-flex'>
                    <i className='bi bi-box-arrow-left text-white mx-3 my-2'></i>
                    <div className='text-white fw-bolder mx-3 my-2'>Home</div>
                </CNavItem>
                <div onClick={logoutFn}>
                <CNavItem className='bg-dark d-flex'>
                    <i className='bi bi-box-arrow-left text-white mx-3 my-2'></i>
                    <div className='text-white fw-bolder mx-3 my-2'>Logout</div>
                </CNavItem>
                </div>
            </CSidebarNav>
        </CSidebar>
    )
}

export default Sidebar;
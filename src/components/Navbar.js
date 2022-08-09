import React from 'react';

const Navbar = (props) => {
    const {userID, handleSignOut} = props;
    return ( 
        <div class="container-lg">
            <nav class="navbar m-3 p-3 border-white bg-dark text-blue text-center">
                <div class="container-lg justify-content-center">
                    <h1 class="h1">{userID}'s Notes</h1>
                </div>
                
                <div class="container-lg justify-content-end">
                <span>
                <h6 class="hover-link" onClick={handleSignOut}>Sign out</h6>
                </span>
                </div>
            </nav>
        </div>
     );
}
 
export default Navbar;
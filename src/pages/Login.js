import { DropdownButton, Dropdown } from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { userSignin } from '../api/auth'


function Login(){
    const [showSignup, setShowSignup]=useState(false);
    const [userType, setUserType]=useState("CUSTOMER");
    const [userId, setUserId]=useState("");
    const [password, setPassword]=useState("");

    const updateSignupData = (e) => {
        if (e.target.id === "userid"){
            setUserId(e.target.value)
        }
        else if (e.target.id === "password"){
            setPassword(e.target.value)
        }
    }

    const signupFn = () => {
        // prevent default 
        // data : userid, name, email, password, usertype
        // call teh api and pass data 
        // Display the successful message 
        console.log("Sign up button triggered")
    }

    const loginFn = (e) => {
        e.preventDefault();

        const data = {
            userId: userId,
            password: password
        }

        userSignin(data).then((response) => {
            console.log(response);
            // setItem(name, value)
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("userTypes", response.data.userTypes);
            localStorage.setItem("userStatus", response.data.userStatus);
            localStorage.setItem("token", response.data.accessToken);
            if (response.data.userTypes === "CUSTOMER")
                window.location.href='/customer'
            else if (response.data.userTypes === "ENGINEER")
                window.location.href='/engineer'
            else if (response.data.userTypes === "ADMIN")
                window.location.href='/admin'
            else
                window.location.href="/"


        }).catch((error) => {
            console.log(error);
        })

    }



    const toggleSignup=() => {
        setShowSignup(!showSignup);
    }

    const handleSelect = (e) => {
        setUserType(e);
    }
    return(
        <div className="bg-info vh-100 d-flex justify-content-center align-items-center">
            <div className="card p-3 rounded-4 shadow-ls" style={{widht:20 +'rem'}}>
                <h4 className="text -center text-info">{showSignup ? "Sign Up":"Log In" }</h4>
                <form onSubmit={showSignup ? signupFn : loginFn}>
                    <div className="input-group">
                        <input type="text" className='form-control m-1' placeholder="User Id" value={userId} onChange={updateSignupData} id="userid" />
                    </div>
                        {
                            showSignup &&
                            <>
                            <div className="input-group">
                                <input type="email" className="form-control m-1" placeholder="Email"/>
                            </div>
                            <div className="d-flex justify-content-between m-1">
                            <span className="my-1">User type</span>
                            <DropdownButton
                                    align="end"
                                    title={userType}
                                    id="userType"
                                    varient="light"
                                    onSelect={handleSelect}
                                >
                                    <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                    <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>

                                </DropdownButton>
                            </div>
                            <div className="input-group">
                                <input type="text" className="form-control m-1" placeholder="User Name"/>
                            </div>
                            </>
                        }
                    <div className="input-group">
                        <input type="password" className="form-control m-1" placeholder="password" id="password" value = {password} onChange={updateSignupData} />
                    </div>
                    <div className="input-group">
                        <input type="submit" className="btn btn-info fw-bolder" value={showSignup ? "Sign Up" : "Log In"}/>
                    </div>
                    <div className="m-1 tect-center text-primary" onClick={toggleSignup}>
                    {showSignup ? "Already have an account ? Log In" : "Don.t have an account ? Sign Up"}
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default Login;

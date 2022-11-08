import {useNavigate, useState} from 'react-router-dom';
import Not from '../static/Not.svg';

function NotFound(){
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }
    return(
        <div className='bg-light vh-100 d-flax justufy-content-center align-items-center text-center' >
        <div>
            <h1>Not Found !</h1>
            <p>Hmm... the page you are looking does not exist</p>
            <img src={Not} alt ="not found"/>
            </div>
            <button className='btn btn-info text-white' onClick={goBack}> Go Back </button>
        </div>
    )
}

export default NotFound;
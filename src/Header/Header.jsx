import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleSignIn = () => {
        navigate('/signin');

    }

    const handleSignOut = () => {
        localStorage.removeItem('username');

        setUsername('');

        navigate('/signin');
    }

    const handleTitleClick = () => {
        // 로그인 상태에 따라 다른 경로로 이동
        if (username) {
            navigate('/todo'); // 로그인 상태일 경우 /todo로 이동
        } else {
            navigate('/'); // 비로그인 상태일 경우 /로 이동
        }
    };


    return (
        <header className="header">
            <span className="title" onClick={handleTitleClick} style={{cursor: 'pointer'}}>
                TaskTracker
            </span>

            {username ? (
                <>
                    {/*<span className="user-name">{username}님</span>*/}
                    <button className="auth-button" onClick={handleSignOut}>Logout</button>
                </>
            ) : (
                <button className="auth-button" onClick={handleSignIn}>Login</button>
            )}
        </header>
    )
}

export default Header;

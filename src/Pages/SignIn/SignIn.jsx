import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import './SignIn.css';  // CSS 파일 import

const SignIn = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const [error, setError] = useState("");

    const handleSignUp = () => {
        navigate('/signup');
    }

    const handleLogin = async () => {

        setError(""); // 에러 메시지 초기화

        try{
            const response = await axios.get(`http://localhost:3333/api/login/${id}/${pwd}`);
            if (response.data.ok) {
                console.log("로그인 성공",response.data);
                navigate('/todo');
                localStorage.setItem("username", response.data.user.name);
                window.location.reload()
            } else {
                console.log("로그인 실패",response.data);
                setError("아이디 또는 비밀번호가 올바르지 않습니다.");
            }
        } catch (error) {
            console.log(error);
            setError("입력 칸을 모두 입력해주세요.");
        }
    }

    return (
        <div className="signin-container">
            <div className="signin-form">
                <h2>Login</h2>

                {error && <div className="signin-error">{error}</div>}

                <div className="signin-input-group">
                    <div>ID</div>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className="signin-input-group">
                    <div>PASSWORD</div>
                    <input
                        type="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                    />
                </div>
                <button className="signin-button" onClick={handleLogin}>Sign In</button>
                <button className="signin-signup-button" onClick={handleSignUp}>Create Account</button>
            </div>
        </div>
    );
}

export default SignIn;

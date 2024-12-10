import React, {useEffect, useState} from 'react';
import './SignUp.css'

import {useNavigate} from "react-router-dom";
import axios from "axios";


const SignUp = () => {

    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [pwdCheck, setPwdCheck] = useState('');
    const [idCheck, setIdCheck] = useState('');

    const [error, setError] = useState('');

    useEffect(() => {
        // 두 입력 필드 모두 값이 있는 경우에만 비교
        if (pwd && pwd2) {
            if (pwd === pwd2) {
                setPwdCheck('일치합니다');
            } else {
                setPwdCheck('불일치합니다');
            }
        } else {
            // 값이 없을 경우 pwdCheck 초기화
            setPwdCheck('');
        }
    }, [pwd, pwd2]);


    const handleSignIn = async () => {

        setError(''); // 에러 메시지 초기화

        try {
            const res = await axios.get(`http://localhost:3333/api/signup/${id}/${pwd}/${name}/${age}`);
            if (res.data.ok) {
                console.log("성공", res.data);
                navigate('/signin');
            } else {
                console.log("실패", res.data);
                setError('아이디가 중복되었습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.log(error);
            setError('입력 칸을 모두 입력해주세요.');
        }
    }

    const checkId = async () => {
        try {
            const res = await axios.get(`http://localhost:3333/api/signup/idCheck/${id}`);
            if (res.data.ok) {
                setIdCheck("사용 가능한 아이디입니다.");
                console.log("성공", res.data);
            } else {
                setIdCheck("이미 사용 중인 아이디입니다.");
                console.log("실패", res.data);
            }
        } catch (error) {
            console.error('오류:', error);
            setIdCheck("ID를 입력해주세요");
        }
    }

    return (
        <div className="signup-container">
            <h2>Register</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="signup-form">
                <div>
                    <div>ID</div>

                    <input onChange={(e) => setId(e.target.value)}/>
                    <button onClick={checkId}>CHECK ID</button>
                    <div>{idCheck}</div>
                </div>
                <div>
                    <div>PASSWORD</div>
                    <input onChange={(e) => setPwd(e.target.value)}/>
                </div>
                <div>
                    <div>CHECK PASSWORD</div>
                    <input onChange={(e) => setPwd2(e.target.value)}/>
                    <div>{pwdCheck}</div>
                </div>
                <div>
                    <div>NAME</div>
                    <input onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <div>AGE</div>
                    <input onChange={(e) => setAge(e.target.value)}/>
                </div>
            </div>

            <button onClick={handleSignIn}>Sign Up</button>

        </div>
    );
}

export default SignUp;

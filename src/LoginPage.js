import { useState } from "react";
import MemberApi from "./api/MemberApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';



const LoginPage=()=>{
  const navigate = useNavigate();
  
  // 처음에 userID, userPwd의 값을 ''으로 잡는다 그러면 처음 접속하는 사람들도 userId의 값이 생김
  window.localStorage.setItem('userId', '');
  window.localStorage.setItem('userPwd', '');


    const[inputId, setInputId] = useState("");
    const[inputPwd, setInputPwd] = useState("");
    const[pwdType, setPwdType] = useState({
        type : 'password',
        visible : false
    });

    const onChangeId=(e)=>{setInputId(e.target.value);};
    const onChangePwd=(e)=>{setInputPwd(e.target.value);};

    const handlePwdType=(e)=>{
        setPwdType(()=>{
            if(!pwdType.visible){
                return{type : 'text', visible : true};
            }
            return{type : 'password', visible : false};
            
        })
    }

    const onClickLogin=async()=>{
        try{
            const res = await MemberApi.login(inputId, inputPwd);
            if(inputId===null){
                alert("아이디를 입력하여 주십시오");
            }else if(!inputPwd){
                alert("비밀번호를 입력하여 주십시오")
            }else if(res.data.statusCode === 200){
                window.localStorage.setItem("userId", inputId);
                window.localStorage.setItem("userPwd",inputPwd);
                window.localStorage.setItem("isLogin", 'true');
                navigate('/boardList')
            } 
        } catch(e){
            console.log(e);
            if(e.response.data.status === 500){
                alert("아이디 또는 비밀번호를 찾을 수 없습니다.")
            }else{
                console.log(e);
            }
        }
    };
    return(
        <LoginBlock>
        <div className="login-box">
            <div className="login-title">아이리스 연구소 게시판 로그인</div>
            <ul>

            <li className="id-box">
            <div className="input-id">아이디</div>
            <input style={{marginLeft : 30}} className="input" type="text" value={inputId} onChange={onChangeId}/></li>
            <li className="pwd-box">
            <div className="input-pwd">비밀번호</div>
            <input className="input" type={pwdType.type} value={inputPwd} onChange={onChangePwd}/>
            <span onClick={handlePwdType}>
                {pwdType.visible ? <span><FontAwesomeIcon icon={faEye}/></span> 
                : <span><FontAwesomeIcon icon={faEyeSlash}/></span>}
            </span>
            <Button className="login-btn" onClick={onClickLogin}>로그인</Button>
            </li>
            </ul>


        </div>
        </LoginBlock>
    );
}
export default LoginPage;

const LoginBlock=styled.div`
    .login-box{
        border: 3px solid #B2B2B2;
        border-radius: 10px;
        top: 50%;
        width: 500px;
        height: 200px;
        margin-top: 200px;
        margin-left: auto;
        margin-right: auto;
        padding: 25px;
        /* text-align: center; */
    }
    .login-title{
        font-size: 1.3rem;
        text-align: center;
        margin-bottom: 25px;
    }
    ul{
        list-style: none;
    }
    li{
        line-height: 30px;
        align-items: center;
        justify-content: center;
        display: flex;
        float: left;
        margin: 5px 0px;
    }
    input{
        margin-left: 15px;
        border: 2px solid #B2B2B2;
        border-radius: 10px;
    }
    .login-btn{
        margin-left: 10px;
    }
    

    
`;

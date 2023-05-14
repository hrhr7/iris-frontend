import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';


const Header=()=>{
    const userId = window.localStorage.getItem("userId");

    /** 로그아웃 */
    const onClickLogout = () =>{
        window.localStorage.setItem("userId", '');
        window.localStorage.setItem("userPwd",'');
        window.localStorage.setItem("isLogin", "false")
        window.location.replace("/");
    }

    return(
        <HeaderBlock>
        <div className='header-container'>
        <div className="header-id-box">
            <span className='header-id'>아이리스 연구소 게시판</span>
        </div>
        <div className="header-title-box">
            <span className='header-title'>안녕하세요.
            <Link to = "/myPage">{userId}</Link> 님
            </span>
            <Button className='logout-btn' onClick={onClickLogout}>로그아웃</Button>
        </div>
        </div>
        
        </HeaderBlock>
    );
}
export default Header;

const HeaderBlock=styled.div`

    /* position: fixed; */
    .header-container{
        display: flex;
        justify-content: space-between;
        height: 50px;
        margin: 5px;
        /* position: fixed; */
    }
    .header-id-box{
        align-items: center;
        justify-content: center;
        display: flex;
        font-size: 1.5rem;
        font-weight: bold;
        border: 4px solid #D3D5FD;
        border-radius: 5px;
    }
    .header-id{
        margin: 10px 100px;
    }
    .header-title-box{
        border-radius: 5px;
        width: 420px;
        align-items: center;
        justify-content: center;
        display: flex;
        background-color: #D3D5FD;
    }
    .header-title{
        margin: 0 20px;

    }
    .logout-btn{
        margin-left: 10px;
    }
    :link{
        text-decoration: none;
        color: black;
    }
    .logout-btn{
        height: 25px;
      align-items: center;
      /* display: flex; */
      justify-content: center;
      width: 90px;
      padding-top: 1px;
    }
`;
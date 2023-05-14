import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import LoginPage from './LoginPage';
import { useState } from "react";
import { useEffect } from 'react';
import MemberApi from './api/MemberApi';

const MyPage=()=>{
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const userId = window.localStorage.getItem("userId");
  console.log("회원의 아이디" + userId);

  const [myData, setMyData] = useState('');


  const [inputName, setInputName] = useState("");
  const [inputCall, setInputCall] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputDpt, setInputDpt] = useState("");
  const [selectJob, setSelectJob] = useState("");
  const [selectPosition, setSelectPosition] = useState("");
  const [selectClass, setSelectClass] = useState("");
  const [inputRemark, setinputRemark] = useState("");


  const onChangeName=(e)=>{setInputName(e.target.value)};
  const onChangeCall=(e)=>{setInputCall(e.target.value)};
  const onChangePhone=(e)=>{setInputPhone(e.target.value)};
  const onChangeDpt=(e)=>{setInputDpt(e.target.value)};
  const onChangeJob=(e)=>{setSelectJob(e.target.value)};
  const onChangePosition=(e)=>{setSelectPosition(e.target.value)};
  const onChangeClass=(e)=>{setSelectClass(e.target.value)};
  const onChangeRemark=(e)=>{setinputRemark(e.target.value)};

  const id = "milk"
    // 저장된 마이페이지 가져오는 useEffect
  useEffect(() => {
    const memberInfo = async () => {
      try {
        const res = await MemberApi.find(userId);
        if(res.data.statusCode === 200){
          setMyData(res.data.results); 
        }
      } catch (e) {
        console.log(e);
      }
    };
    memberInfo();
  }, []);


    const onClickSave = async()=>{
        try{
            const res = await MemberApi.updateMypage(userId,inputName,inputCall, inputPhone, inputDpt,selectJob,selectPosition,selectClass,inputRemark);
            if(res.data.statusCode === 200){
                alert(res.data.message);
                navigate('/boardList')
            } 
        } catch(e){
            console.log(e);
            if(e.response.data.statusCode === 400){
                alert("제목과 내용을 입력해주세요")
            }else{
                console.log(e);
            }
        }
    }
      // 비로그인 상태일 때 접근하면 로그인 페이지로 넘기기
  let isLogin = window.localStorage.getItem('isLogin');
  if(isLogin !== 'true') {
      return(
          <LoginPage/>
      );
  }
  

    return(
        <MypageBlock>
        <div className="mypage-container">
            <div className="mypage-top">마이 페이지</div>
            <div className="mypage-title-container" style={{height:40}}>
                <span style={{margin : 10 , fontWeight:'bold'}}>&middot;개인정보 수정</span>
                <span>*표시 필수 입력 항목</span>
            </div>
            <div className="mypage-chart">
            <Table bordered>
      <tbody>
        <tr>
        <th>아이디</th>
        <td>{userId}{myData.name}</td>
        <th>* 이름</th>
        <td><input type='text' value={inputName} onChange={onChangeName}/></td>
        </tr>
        <tr>
        <th>일반전화</th>
        <td><input type='text' value={inputCall} onChange={onChangeCall}/></td>
        <th>휴대전화</th>
        <td><input type='text' value={inputPhone} onChange={onChangePhone}/></td>
        </tr>
        <tr>
        <th>부서명</th>
        <td><input type='text' value={inputDpt} onChange={onChangeDpt}/></td>
        <th>직무</th>
        <td>
            <select value={selectJob} onChange={onChangeJob}>
                <option>기획</option>
                <option>관리</option>
                <option>영업</option>
                <option>생산</option>
                <option>개발</option>
                <option>기술</option>
                <option>경영</option>
            </select>
        </td>
        </tr>
        <tr>
        <th>직위</th>
        <td><select value={selectPosition} onChange={onChangePosition}>
                <option>부장</option>
                <option>사원</option>
                
            </select></td>
        <th>직책</th>
        <td><select value={selectClass} onChange={onChangeClass}>
                <option>본부장</option>
                <option>팀원</option>
                
            </select></td>
        </tr>
        <tr>
        <th>비고</th>
        <td colSpan="3" ><input type='text' value={inputRemark} onChange={onChangeRemark}/></td>
        </tr>
      </tbody>
    </Table>
    <div className='mypage-btn'>
        <Button className='save-btn' onClick={onClickSave}>저장</Button>
        <Button className='cancel-btn' onClick={()=>{navigate('/boardList')}}>취소</Button>
    </div>
            </div>
        </div>
        </MypageBlock>
    );
};
export default MyPage;

const MypageBlock = styled.div`
    .mypage-top{
        margin-top: 15px;
        background-color: #D3D5FD;
        height: 40px;
        align-items : center;
        display: flex;
        padding-left: 15px;
    }
    th{
        background-color: #EAEAEA;
        padding-left: 20px;
    }
    .mypage-title-container{
       align-items : center;
      display: flex;
      padding-left: 15px;

    }
    .save-btn{
        margin-right: 10px;
        width: 70px;
      height: 35px;
    }
    .cancel-btn{
        width: 70px;
      height: 35px;

    }
    .mypage-btn{
        text-align: center;
        padding: 10px;
    }
    input{
      border: 1px solid #B2B2B2;
      width: 230px;
    }
`;

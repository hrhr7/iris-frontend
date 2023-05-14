import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import BoardApi from './api/BoardApi';
import Button from 'react-bootstrap/Button';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';




const WriteBorad=()=>{
  const userId = window.localStorage.getItem("userId");

  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkBox, setCheckBox] = useState([]); 

  const [inputCategory, setInputCategory] = useState("");
  const [inputPeriod, setInputPeriod] = useState("");

  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");

  const onChangeCategory=(e)=>{setInputCategory(e.target.value);}
  const onChangeBoardTitle=(e)=>{setInputTitle(e.target.value);}
  const onChangeBoardContent=(e)=>{setInputContent(e.target.value);}
  
  console.log(inputCategory);
  console.log("캘린더값:"+inputPeriod);
  console.log(startDate);


  console.log(inputTitle);
  console.log(inputContent);

  const checkOne = (e) => {
    
  };
  const onClickSave=async()=>{
    try{
        const res = await BoardApi.writeBoard(inputCategory, startDate,endDate, inputTitle, inputContent,userId);
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
};
  
    return(
        <WriteBlock>
        <div className="br-container">
            <div className="br-top">◆ 게시판 &#62; 등록</div>
            <div className="br-title-container">
                <span style={{margin : 10 , fontWeight:'bold'}}>&middot; 글 신규 등록</span>
                <span>*표시 필수 입력 항목</span>
            </div>
            <div className="br-chart">
            <Table bordered>
      <tbody>
        <tr>
        <th>* 구분</th>
        <td>
            <select style={{width : 150}} value={inputCategory} onChange={onChangeCategory}>
                <option>공지</option>
                <option>자유</option>
                <option>질문</option>
            </select>
        </td>
        <th>게시 기간</th>
        <td style={{display : 'flex'}}>
          <input type='checkBox' name='' onChange={(e)=>checkOne(e)}/>
          <label>무제한</label>
          <div className='calendar'>
          <DatePicker 
          locale={ko}
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}/>
            <span>~</span>
          <DatePicker 
            dateFormat="yyyy-MM-dd"
            selected={endDate} 
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}/>
          </div>

          </td>
        </tr>
        <tr>
        <th>* 제목</th>
        <td colSpan="3"><input className='title-input' type='text' value={inputTitle} onChange={onChangeBoardTitle}/></td>
        </tr>
        <tr>
        <th>* 내용</th>
        <td colSpan="3">
        <input
  className="content-input"
  type="text"
  value={inputContent} onChange={onChangeBoardContent}
/>
            </td>
        </tr>
      </tbody>
    </Table>
    <div className='writePage-btn'>
        <Button className='save-btn' onClick={onClickSave}>저장</Button>
        <Button className='cancel-btn' onClick={()=>{navigate('/boardList')}}>취소</Button>
    </div>
            </div>
        </div>
        </WriteBlock>
    );
}
export default WriteBorad;

const WriteBlock = styled.div`
    
    .br-top{
      margin-top: 15px;
      background-color: #D3D5FD;
      height: 40px;
      align-items : center;
      display: flex;
      padding-left: 15px;
    }
    .br-title-container{
      align-items : center;
      display: flex;
      padding-left: 10px;
    }
    th{
        background-color: #EAEAEA;
        padding-left: 20px;
    }
    .title-input{
      width:90vw;
    }
    .content-input{
      width:90vw;
      height: 30vh;
    }
    input{
      border: 1px solid #B2B2B2;
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
    .writePage-btn{
      text-align: center;
      padding: 10px;
    }
    .calendar{
      display: flex;
      margin-left: 10px;
      /* text-align: center; */
    }
  
`;
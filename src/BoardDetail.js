import Table from 'react-bootstrap/Table';
import { useNavigate,useParams } from 'react-router-dom';
import styled from "styled-components";
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import BoardApi from './api/BoardApi';


const BoardDetail=()=>{
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("userId");
  const { index } = useParams();
  const [boardDetail, setBoardDetail] = useState('');

  useEffect(() => {
    const boardData = async()=> {
      try {
        const res = await BoardApi.boardDetail(index);
        if(res.data.statusCode === 200){
          setBoardDetail(res.data.results);
          console.log(res.data);
          console.log(res.data.message);
        } else {
          alert("페이지 이동이 안됩니다.")
        }
      } catch(e){
        console.log(e);
      }
      // setLoading(false);
    };
    boardData();
  }, []);

  const onClickDelete=async()=>{
    try{
      const res = await BoardApi.deleteBoard(index);
      if(res.data.statusCode === 200){
        alert("게시글을 삭제하시겠습니까?")
        // navigate(0);
        navigate('/boardList');
      }
    } catch(e){
      if(e.response.data.status === 500){
        alert("게시글이 존재하지 않습니다.");
      } else{
        console.log(e);
      }
    }
  };


    return(
        <DetailBlock>
        <div className="br-container">
            <div className="br-top">◆ 게시판 &#62; 정보</div>
            <div className="br-title-container" style={{height:40}}>
                <span style={{margin : 10 , fontWeight:'bold'}}>&middot; 게시판 글 조회</span>
            </div>
            <div className="br-chart">
            <Table bordered>
      <tbody>
        <tr>
        <th>구분</th>
        <td>{boardDetail.category}</td>
        <th>공지 기간</th>
        <td>{boardDetail.startDate}~{boardDetail.endDate}</td>
        </tr>
        <tr>
        <th>작성자</th>
        <td>{boardDetail.name}</td>
        <th>작성 일시</th>
        <td>{boardDetail.createTime}</td>
        </tr>
        <tr>
        <th>제목</th>
        <td colSpan="3">{boardDetail.title}</td>
        </tr>
        <tr>
        <th className='bd-content'>내용</th>
        <td colSpan="3">{boardDetail.content}</td>
        </tr>
      </tbody>
    </Table>

    <div className='detail-btn'>
      {/* 로그인 회원과 작성자가 동일할 때 수정, 삭제 버튼 표시 */}
    {userId === boardDetail.id ? 
      (<><Button className='update-btn' onClick={()=>{navigate('/update')}}>수정</Button>
      <Button className='delete-btn' onClick={onClickDelete}>삭제</Button>
      <Button className='list-btn' onClick={()=>{navigate('/boardList')}}>목록</Button>
      </>)
      :
      <Button className='list-btn' onClick={()=>{navigate('/boardList')}}>목록</Button>
    }
    </div>
            </div>
        </div>
        </DetailBlock>
    );
};
export default BoardDetail;

const DetailBlock=styled.div`
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
      text-align: center;
    }
    .update-btn, .list-btn{
      width: 70px;
      height: 35px;
    }
    .delete-btn{
      margin: 0 10px;
        width: 70px;
      height: 35px;
    }
    .detail-btn{
      text-align: center;

    }
    .bd-content{
      height: 400px;
    }
`;
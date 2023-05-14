import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
// import { Pagination } from 'react-bootstrap';
import BoardApi from './api/BoardApi';
import { Pagination } from 'antd';




const BoradList=()=>{
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  //  리액트 페이지네이션 변수 
  const [boardList, setBoardList] = useState([]); //db 에서 정보 받아오기(배열에  담기)
  const [pageSize, setPageSize] = useState(10); // 한페이지에 몇개씩 있을건지
  const [totalCount, setTotalCount] = useState(0); // 총 데이터 숫자
  const [currentPage, setCurrentPage] = useState(1); // 현재 몇번째 페이지인지

    /** 공지 목록을 가져오는 useEffect */
    useEffect(() => {
      const noticeData = async()=> {
        setLoading(true);
        try {
          const res = await BoardApi.boardList(currentPage, pageSize);
          if(res.data.statusCode === 200){
            setBoardList([...boardList, ...res.data.results.boardDTOList]);
            console.log(res.data.results);
            // 페이징 시작
            setTotalCount(res.data.results.totalResults); 
            // db에서 잘라준 size 별로 잘랐을때 나온 페이지 수
            setCurrentPage(res.data.results.page);
          }else{
            alert("리스트 조회가 안됩니다.")
        } 
      }catch (e) {
          console.log(e);
        }
        setLoading(false);
      };
      noticeData();
    }, [currentPage]); // currentpage 값이 바뀌면 렌더링 되도록 

    return(
        <ListBlock>
          <div className='bdList-container'>
          <div className="bdList-top"> ◆ 게시판 &#62; 목록</div>
          <div className="bdList-title-container" style={{height:40}}>
                <span style={{margin : 10 , fontWeight:'bold'}}>&middot; 게시판 조회</span>
            </div>
          <div className='search-box'>
            <span style={{padding : 10}}>&#62; 검색어</span>
            <select>
              <option>제목</option>
              <option>등록자</option>
            </select>
            <input type='text' className='search-input'/>
            <Button className='search-btn'>조회</Button>
          </div>

          <Button className='write-btn' onClick={()=>{navigate('/write')}}>등록</Button>
        <Table bordered hover>
      <thead>
        <tr>
          <th style={{width : 200}}>번호</th>
          <th style={{width : 200}}>구분</th>
          <th style={{width : 1000}}>제목</th>
          <th style={{width : 200}}>등록자</th>
          <th>등록 일시</th>
        </tr>
      </thead>
      <tbody>
        {boardList.map(({index,category,title,name,createTime})=>(
          <tr key={index}>
          <td>{index}</td>
          <td>{category}</td>
          {/* <td><StyledLink to={`/detail/${index}`}>{title}</StyledLink></td> */}
          <td><StyledLink to={`/detail/${index}`}>{title}</StyledLink></td>

          <td>{name}</td>
          <td>{createTime}</td>
        </tr>
        ))}
      </tbody>
    </Table>
    <Pagination className="d-flex justify-content-center"
             total={totalCount}  //총 데이터 갯수
              current={currentPage} 
              pageSize={pageSize}
              onChange={(page) => {setCurrentPage(page); setBoardList([]);}} //숫자 누르면 해당 페이지로 이동
              />


    </div>
        </ListBlock>

    );
}
export default BoradList;

const ListBlock = styled.div`
.bdList-top{
        margin-top: 15px;
        background-color: #D3D5FD;
        height: 40px;
        align-items : center;
        display: flex;
        padding-left: 15px;
    }
    .bdList-title-container{
      align-items : center;
      display: flex;
      padding-left: 10px;

    }
    .search-box{
      height: 40px;
      align-items : center;
      display: flex;
      background-color:#EAEAEA ;
      margin: 0 10px;
      border: 1px solid #B2B2B2;
      /* font-size: 0.7rem; */
    }
    .search-input{
      margin: 0 10px;
      width: 330px;
      height: 25px;
    }
    .search-btn{
      height: 25px;
      align-items: center;
      display: flex;
      justify-content: center;
      width: 70px;
    }
    .write-btn{
      height: 25px;
      align-items: center;
      display: flex;
      justify-content: center;
      width: 70px;
      float: right;
      margin: 10px;
    }
    th{
      background-color: #EAEAEA;
      text-align: center;
    }
    td{
      text-align: center;
    }
`;
const StyledLink= styled(Link)`
  text-decoration : none;
  color: inherit;
  &:hover{
    color: #92A9BD;
  }

`;
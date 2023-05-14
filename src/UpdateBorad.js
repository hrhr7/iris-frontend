import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const UpdateBoard=()=>{
  const navigate = useNavigate();

    return(
        <>
         <div className="br-container">
            <div className="br-top">게시판 등록</div>
            <div className="br-title-container">
                <span>글 신규 등록</span>
                <span>*표시 필수 입력 항목</span>
            </div>
            <div className="br-chart">
            <Table bordered>
      <tbody>
        <tr>
        <th>* 구분</th>
        <td>
            <select>
                <option>공지</option>
                <option>자유</option>
                <option>질문</option>
            </select>
        </td>
        <th>게시 기간</th>
        <td><input></input></td>
        </tr>
        <tr>
        <th>* 제목</th>
        <td colSpan="3"><input></input></td>
        </tr>
        <tr>
        <th>* 내용</th>
        <td colSpan="3">
        <textarea
  className="review-content-fix-area"
//   value={text}
  type="text-area"
//   onChange={fixReviewBtn}
/>
            </td>
        </tr>
      </tbody>
    </Table>
    <div className='mypage-btn'>
        <button>저장</button>
        <button onClick={()=>{navigate('/')}}>취소</button>
    </div>
            </div>
        </div>
        </>
    );
};
export default UpdateBoard;

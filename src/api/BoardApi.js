import axios from "axios";
const HEADER = {'Content-Type' : 'application/json'}
const DOMAIN = "http://localhost:8000";

const BoardApi = {

    // 게시판 글 조회
    boardList : async function(currentPage ,setPageSize){
    return await axios.get(DOMAIN+ `/board/list?page=${(currentPage - 1)}&size=${setPageSize}&sort=index,desc`, HEADER)
    },
    // 게시 상세 글 
    boardDetail : async function(index){
    return await axios.get(DOMAIN+ "/board/detail/"+index, HEADER)
    },
    // 게시판 작성 
    writeBoard : async function(inputCategory, startDate,endDate, inputTitle, inputContent,userId){
        const params = {
            category : inputCategory,
            startDate :startDate,
            endDate :endDate,
            title : inputTitle,
            content : inputContent,
            memberId : userId
        }
        console.log(params);
        // debugger;
    return await axios.post(DOMAIN+ "/board/write", params, HEADER)
    },
    updateBoard : async function(inputTitle, inputContent){
        const params = {
            title : inputTitle,
            content : inputContent
        }
    return await axios.get(DOMAIN+ "/board/write", params, HEADER)
    },
    deleteBoard : async function(index){
        console.log("인덱스"+index);
        debugger;
        return await axios.delete(DOMAIN+ "/board/delete/"+index, HEADER)
    },

};
export default BoardApi;
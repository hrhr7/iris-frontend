import axios from "axios";
const HEADER = {'Content-Type' : 'application/json'}
const DOMAIN = "http://localhost:8000";

const MemberApi = {
    find : async function(userId){
        const params = {
            id : userId,
        }
    return await axios.get(DOMAIN+ "/member/findId", params, HEADER)
    },

    login : async function(inputId, inputPwd){
        const params = {
            id : inputId,
            pwd : inputPwd
        }
    return await axios.post(DOMAIN+ "/member/login", params, HEADER)
    },

    updateMypage : async function(userId,inputName,inputCall, inputPhone, inputDpt,selectJob,selectPosition,selectClass,inputRemark){
        const params = {
            id : userId,
            name : inputName,
            landLine : inputCall,
            phone :inputPhone,
            department : inputDpt,
            job : selectJob,
            position : selectPosition,
            jobClass :selectClass,
            remark :inputRemark
        }
    return await axios.post(DOMAIN+ "/member/update", params, HEADER)
    },
};
export default MemberApi;
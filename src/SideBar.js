import styled from 'styled-components';

const SideBar=()=>{
    return(
        <Side>
            사이드바 입니다.
        </Side>
    );
};
export default SideBar;

const Side=styled.div`
    display: flex;
    border-right: 1px solid #e0e0e0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 100vh;

`;
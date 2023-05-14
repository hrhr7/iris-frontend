import BoradList from "./BoradList";
import Headers from "./Header";
import LoginPage from "./LoginPage";
import styled from 'styled-components';
import TopBar from "./Topbar";


const Home=()=>{
    return(
        <HomeBlock>
        {/* <LoginPage/> */}
        <div className="content">
        <div className="main">
            <TopBar/>
            {/* <BoradList/> */}
        </div>
        </div>
        </HomeBlock>
    );
}
export default Home;

const HomeBlock=styled.div`
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    margin: 5px;

    .content{
        display: flex;
        height: 100vh;
        /* flex: 1; */
    }
    .main{
    /* display: flex; */
    flex-flow: column wrap;
    /* overflow: auto; */
    /* flex: 5; */
}

`
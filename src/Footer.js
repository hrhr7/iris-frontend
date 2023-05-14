import styled from "styled-components";

const Footer=()=>{
    return(
        <FooterBlock>
        <footer>
            <span>COPYRIGHT 2023 IRISINFOTECH ALL RIGHTS RESERVED</span>
        </footer>
        </FooterBlock>

    )
};

export default Footer;

const FooterBlock = styled.div`
    background-color:#EAEAEA ;
    height: 40px;
    justify-content : center;
    align-items : center;
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
`;
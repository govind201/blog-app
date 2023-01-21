import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
// width: 1366px;
width: 100%;
height: 100px;
background: #E9E9E9;
`
const Title = styled.h1`
  margin: 0;
`;


const Header = () => {
    return (
        <HeaderContainer>
            <Title>Eqaim Blog</Title>
        </HeaderContainer>
    );
};

export default Header;

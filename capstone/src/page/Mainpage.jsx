import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const Custombutton = styled(Button)`
    border-radius : 10px;
    border : none;
    margin-top : 40px;
    background-Color : #FFD09B;
    display : flex;
    position:absolute;
    justify-content : space-between;
    color:black;
    box-shadow :0 4px 8px rgba(0,0,0,0.2);
    
    &:hover {
        background-color: #FFD060;
        color :black;
    }
`;

function MainPage() {
    return (
        <div style={{background : '#FFF7D1', height:'100vh'}}>
        <Container>
            <Col>
            <Row>
                <div style={{textAlign : 'center', marginTop : '50px', fontSize : '30px', fontWeight:'lighter'}}>원하는 장소를 입력해주세요</div>
                <Form>
                    <Form.Group className='place-1' controlId='place01'>
                        <Form.Control type='text' placeholder='장소1을 입력해주세요' 
                            style={{borderRadius : '15px', border : 'none', backgroundColor : '#FFECC8', marginTop : '60px', height : '40px'}}/>
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group className='place-2' controlId='place02'>
                        <Form.Control type='text' placeholder='장소2를 입력해주세요' 
                            style={{borderRadius : '15px', border : 'none', backgroundColor : '#FFECC8', marginTop : '60px', height : '40px'}}/>
                    </Form.Group>
                </Form>
            </Row>
            <Row>
                <Custombutton type='button' value="input" style={{width:'40%'}}>
                    장소 추가하기
                </Custombutton>
                <Custombutton type='button' value="submit" style={{width:'40%', right:0}}>
                    장소 검색하기
                </Custombutton>
            </Row>
            </Col>
        </Container>
        </div>   
    );
}

export default MainPage;
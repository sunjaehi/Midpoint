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
    padding: 0px;
    background-Color : #FFD09B;
    color:black;
    //width:100%;
    box-shadow :0 4px 8px rgba(0,0,0,0.2);
    
    &:hover {
        background-color: #FFD060;
        color :black;
    }
`;

function MainPage() {
    return (
        <div style={{background : '#FFF7D1', height:'100vh'}}>
            <Container style={{padding: '0px', width: '100%'}}>
                <Col style={{width:'100%'}}>
            {/* <Row style={{justifyContent:'center'}}> */}
                    <div style={{textAlign : 'center', fontSize : '30px', fontWeight:'lighter'}}>원하는 장소를 입력해주세요</div>
                        <Form>
                            <Form.Group className='place-1' controlId='place01'>
                            <Form.Control type='text' placeholder='장소1을 입력해주세요' 
                                style={{borderRadius : '15px', border : 'none', backgroundColor : '#FFECC8', marginTop : '60px', height : '40px', width:'100%'}}/>
                            </Form.Group>
                        </Form>
                        <Form>
                            <Form.Group className='place-2' controlId='place02'>
                            <Form.Control type='text' placeholder='장소2를 입력해주세요' 
                                style={{borderRadius : '15px', border : 'none', backgroundColor : '#FFECC8', marginTop : '60px', height : '40px', width:'100%'}}/>
                            </Form.Group>
                        </Form>
            {/* </Row> */}
                        <Row style={{marginTop:'30px', justifyContent: 'space-between'}}>
                            <Custombutton type='button' value="input" style={{width:'40%', height:'20px', padding:'0'}}>
                                장소 추가하기
                            </Custombutton>
                            <Custombutton type='button' value="submit" style={{width:'40%', float:'right', padding:'0'}}>
                                장소 검색하기
                            </Custombutton>
                        </Row>
                    </Col>
                </Container>
            </div>   
    );
}

export default MainPage;
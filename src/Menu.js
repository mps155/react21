import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './Menu.css'

const Menu = () => {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handlePlay = () => {
        if (nickname) {
            navigate('/jogo', { state: { nickname } });
        } else {
            alert('Por favor, insira um apelido!');
        }
    };

    return (
        <div>
            <h1>Bem-vindo ao Jogo!</h1>
            <div className='content'>
                <div className='form'>
                    <Form.Label htmlFor="nickname">Nickname</Form.Label>
                    <Form.Control
                        type="text"
                        id="nickname"
                        aria-describedby="setNickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <Button onClick={handlePlay}>Jogar</Button>
            </div>
        </div>
    );
};

export default Menu;
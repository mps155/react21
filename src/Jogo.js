import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './Jogo.css'

const Jogo = () => {
    const { state } = useLocation();
    const nickname = state?.nickname || 'Anônimo';
    const [drawCardId, setDrawCardId] = useState(null);
    const [playerCardCount, setPlayerCardCount] = useState(0);
    const [playerCardList, setPlayerCardList] = useState([]);
    const [computerCardCount, setComputerCardCount] = useState(0);
    const [computerCardList, setComputerCardList] = useState([]);
    const [playerTurn, setPlayerTurn] = useState(true);

    useEffect(() => {
        if (drawCardId) {
            pickACard(true, 2);
            pickACard(false, 2);
        }
    }, [drawCardId]);

    const startGame = () => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) setDrawCardId(data.deck_id);
            })
            .catch((error) => console.log(error));
    };

    const pickACard = (isPlayer, count) => {
        fetch(`https://deckofcardsapi.com/api/deck/${drawCardId}/draw/?count=${count}`)
            .then((response) => response.json())
            .then((data) => {
                if (isPlayer) {
                    setPlayerCardList((prev) => [
                        ...prev,
                        ...data.cards.map((card) => card.code),
                    ]);
                    let value = playerCardCount + data.cards.reduce((total, card) => {
                        return total + takeValue(card.code);
                    }, 0);

                    setPlayerCardCount(value);
                    if (value == 21) console.log('perdeu');
                    else if (value > 21) console.log('perdeu');
                } else {
                    setComputerCardList((prev) => [
                        ...prev,
                        ...data.cards.map((card) => card.code),
                    ]);
                    setComputerCardCount((prev) => prev + data.cards.reduce((total, card) => total + takeValue(card.code), 0));
                }
            })
            .catch((error) => console.log(error));
    };

    const takeValue = (str) => {
        if (str[0] === '0') {
            return 10;
        }
        if (!isNaN(str[0])) {
            return parseInt(str[0]);
        }
        if (str[0] === 'A') {
            return 1;
        }
        if (isNaN(str[0]) && str[0] !== 'A') {
            return 10;
        }
        return 10;
    };

    const restartGame = () => {
        finishGame();
        startGame();
    };

    const stand = () => {
        activeComputerPlay();
    };

    const activeComputerPlay = () => {
        setPlayerTurn(false);
    }

    const finishGame = () => {
        setDrawCardId(null);
        setPlayerCardCount(0);
        setPlayerCardList([]);
        setComputerCardCount(0);
        setComputerCardList([]);
        setPlayerTurn(true);
    };

    const getUrl = (code) => {
        return `https://deckofcardsapi.com/static/img/${code}.png`
    }

    return (
        <div className='content'>
            <div className='header'>
                <h1>Olá, {nickname}!</h1>
                <Button variant="primary" size="sm" onClick={restartGame}>Restart</Button>
                <Button variant="primary" size="sm" onClick={finishGame}>Finish</Button>
            </div>
            <div className='game'>
                {drawCardId === null && <Button variant="primary" onClick={startGame}>Iniciar jogo</Button>}
                <div className='gameButtons'>
                    {drawCardId !== null && playerTurn && <Button variant="primary" onClick={() => pickACard(true, 1)}>Pick a card</Button>}
                    {drawCardId !== null && playerTurn && <Button variant="primary" onClick={stand}>Stand</Button>}
                </div>

                <div className='total'>Computer: {!playerTurn && computerCardCount}</div>
                <div className='cards'>{computerCardList.map((card) => (
                    <img className='card' src={getUrl(card)}></img>
                ))}</div>

                <div className='total'>You: {playerCardCount}</div>
                <div className='cards'>{playerCardList.map((card) => (
                    <img className='card' src={getUrl(card)}></img>
                ))}</div>
            </div>
        </div>
    );
};

export default Jogo;
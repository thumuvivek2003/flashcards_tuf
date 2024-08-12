import React, { useState, useEffect } from 'react';
import './Flashcard.css'; // Ensure you have a CSS file for the Flashcard styles

const Flashcard = ({ flashcard }) => {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        // Reset to the front side when flashcard changes
        setFlipped(false);
    }, [flashcard]);

    return (
        <div
            className={`flip-card ${flipped ? 'flip-card-flip' : ''}`}
            onClick={() => setFlipped(!flipped)}
            style={{marginTop:"25px"}}
        >
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <p className="title">QUESTION</p>
                    <p>{flashcard.question}</p>
                </div>
                <div className="flip-card-back">
                    <p className="title">ANSWER</p>
                    <p>{flashcard.answer}</p>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;

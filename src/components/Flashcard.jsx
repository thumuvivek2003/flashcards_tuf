import React, { useState, useEffect } from 'react';
import './Flashcard.css'; // Ensure you have a CSS file for the Flashcard styles

const Flashcard = ({ flashcard }) => {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        // Reset to the front side when flashcard changes
        setFlipped(false);
    }, [flashcard]);

    return (
        <div className={`flashcard ${flipped ? 'flashcard-flip' : ''}`} onClick={() => setFlipped(!flipped)}>
            <div className="flashcard-inner">
                <div className="flashcard-front">
                    {flashcard.question}
                </div>
                <div className="flashcard-back">
                    <div className='backText'>
                        {flashcard.answer}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;

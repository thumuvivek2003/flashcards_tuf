import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';

const FlashcardList = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch flashcards from the backend
        axios.get('https://vivekthumu.me/personal/tuf/index.php')
            .then(response => {
                setFlashcards(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching flashcards:', error);
                setError('Failed to load flashcards.');
                setLoading(false);
            });
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flashcard-container">
            {flashcards.length > 0 ? (
                <>
                    <Flashcard flashcard={flashcards[currentIndex]} />
                    <div className="navigation-buttons">
                        <button onClick={handlePrevious}>Previous</button>
                        <button onClick={handleNext}>Next</button>
                    </div>
                </>
            ) : (
                <div>No flashcards available</div>
            )}
        </div>
    );
};

export default FlashcardList;

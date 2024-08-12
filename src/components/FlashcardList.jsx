import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import './FlashcardList.css'; // Ensure you have a CSS file for the styles

const FlashcardList = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loaderProgress, setLoaderProgress] = useState(0);

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

    useEffect(() => {
        // Update loader progress based on current index
        const updateLoader = () => {
            const progress = ((currentIndex + 1) / flashcards.length) * 100;
            setLoaderProgress(progress);
        };
        updateLoader();
    }, [currentIndex, flashcards.length]);

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
            <div className="FlashListloader-container">
                <div className="FlashListloader" style={{ width: `${loaderProgress}%` }}></div>
            </div>
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
            <h1>Client Side</h1>
        </div>
    );
};

export default FlashcardList;

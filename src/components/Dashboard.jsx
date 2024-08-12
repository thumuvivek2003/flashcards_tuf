import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Ensure you have a CSS file for styling

const Dashboard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingAction, setLoadingAction] = useState(null); // Track the action being performed
    const [error, setError] = useState(null);
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
    const [editFlashcard, setEditFlashcard] = useState(null);
    const [editForm, setEditForm] = useState({ question: '', answer: '' });

    useEffect(() => {
        setLoading(true);
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

    const handleAddFlashcard = () => {
        setLoadingAction('adding');
        axios.post('https://vivekthumu.me/personal/tuf/index.php', newFlashcard)
            .then(response => {
                console.log(response.data);
                setFlashcards([...flashcards, response.data]);
                setNewFlashcard({ question: '', answer: '' });
                setLoadingAction(null);
            })
            .catch(error => {
                console.error('Error adding flashcard:', error);
                setLoadingAction(null);
            });
    };

    const handleEditFlashcard = (id) => {
        setLoadingAction('updating');
        axios.put(`https://vivekthumu.me/personal/tuf/index.php?id=${id}`, editForm)
            .then(response => {
                const updatedFlashcards = flashcards.map(card =>
                    card.id === id ? response.data : card
                );
                setFlashcards(updatedFlashcards);
                setEditFlashcard(null);
                setEditForm({ question: '', answer: '' });
                setLoadingAction(null);
            })
            .catch(error => {
                console.error('Error editing flashcard:', error);
                setLoadingAction(null);
            });
    };

    const handleDeleteFlashcard = (id) => {
        setLoadingAction('deleting');
        axios.delete(`https://vivekthumu.me/personal/tuf/index.php?id=${id}`)
            .then(() => {
                setFlashcards(flashcards.filter(card => card.id !== id));
                setLoadingAction(null);
            })
            .catch(error => {
                console.error('Error deleting flashcard:', error);
                setLoadingAction(null);
            });
    };

    const handleEditClick = (card) => {
        setEditFlashcard(card);
        setEditForm({ question: card.question, answer: card.answer });
    };

    if (loading || loadingAction) {
        return (
            <div className="loader">
                <div className="spinner"></div>
                <p>{loadingAction ? `Processing ${loadingAction}...` : 'Loading from striver...'}</p>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="dashboard">
            <div className="flashcards-list">
                <h3>Flashcards List</h3>
                <ul>
                    {flashcards.map(card => (
                        <li key={card.id}>
                            <div>
                                <strong>Q:</strong> {card.question} <br />
                                <strong>A:</strong> {card.answer}
                            </div>
                            <div style={{ display: 'flex' }}>
                                <button
                                    style={{ backgroundColor: '#1F316F', marginRight: '3px' }}
                                    onClick={() => handleEditClick(card)}
                                >
                                    Edit
                                </button>
                                <button
                                    style={{ backgroundColor: '#FF4E88' }}
                                    onClick={() => handleDeleteFlashcard(card.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="form-container">
                <h3>{editFlashcard ? 'Edit Flashcard' : 'Add New Flashcard'}</h3>
                <input
                    type="text"
                    placeholder="Question"
                    value={editFlashcard ? editForm.question : newFlashcard.question}
                    onChange={(e) => editFlashcard ? setEditForm({ ...editForm, question: e.target.value }) : setNewFlashcard({ ...newFlashcard, question: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={editFlashcard ? editForm.answer : newFlashcard.answer}
                    onChange={(e) => editFlashcard ? setEditForm({ ...editForm, answer: e.target.value }) : setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
                />
                <button
                    onClick={() => editFlashcard ? handleEditFlashcard(editFlashcard.id) : handleAddFlashcard()}
                >
                    {editFlashcard ? 'Update Flashcard' : 'Add Flashcard'}
                </button>
            </div>
        </div>
    );
};

export default Dashboard;

import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const username = localStorage.getItem('USER');

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.heading}>Welcome, {username ? username : 'User'}!</h1>
            </header>
            <main style={styles.main}>
                <p style={styles.text}>
                    This is a boilerplate project featuring Django and React with essential authentication functionalities.
                </p>
                <div style={styles.buttonContainer}>
                    <Link to="/login" style={styles.button}>
                        Login
                    </Link>
                    <Link to="/signup" style={styles.button}>
                        Sign Up
                    </Link>
                    <Link to="/dashboard" style={styles.button}>
                        Dashboard
                    </Link>
                </div>
            </main>
        </div>
    );
};

// Updated CSS styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#eef2f7', // Softer background color
        color: '#333',
        textAlign: 'center',
    },
    header: {
        marginBottom: '2rem',
    },
    heading: {
        fontSize: '3rem',
        marginBottom: '1rem',
        color: '#1a1a1a', // Darker heading color
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        fontSize: '1.2rem',
        marginBottom: '2rem',
        color: '#555',
        maxWidth: '600px',
        lineHeight: '1.6', // Improved readability
    },
    buttonContainer: {
        display: 'flex',
        gap: '1.5rem', // Wider spacing between buttons
    },
    button: {
        padding: '0.8rem 2rem', // Larger buttons
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '5px',
        textDecoration: 'none',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add subtle shadow
        transition: 'background-color 0.3s, transform 0.2s',
    },
    buttonHover: {
        backgroundColor: '#0056b3', // Darker blue on hover
        transform: 'translateY(-2px)', // Subtle lift effect on hover
    },
};

export default Home;

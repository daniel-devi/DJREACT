import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to ReactDJ!</h1>
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
            </div>
        </div>
    );
};

// Inline CSS styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '1rem',
        color: '#333',
    },
    text: {
        fontSize: '1.2rem',
        marginBottom: '2rem',
        color: '#555',
        maxWidth: '600px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '1rem',
    },
    button: {
        padding: '0.8rem 1.5rem',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '5px',
        textDecoration: 'none',
        transition: 'background-color 0.3s',
    },
};

export default Home;

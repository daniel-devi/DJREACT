import React from 'react';

const Home: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to ReactDJ!</h1>
            <p style={styles.text}>
                This is a boilerplate project featuring Django and React with essential authentication functionalities.
            </p>
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
};

export default Home;

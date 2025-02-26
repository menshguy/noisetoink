import { FaInfoCircle } from 'react-icons/fa';

const TutorialPrompt = ({ message }: { message: string }) => {

    const styles = {
        color: 'black',
        background: "#b6d9e8",
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        padding: '15px 10px',
        margin: '10px 0px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    }

    return (
        <div style={styles}>
            <FaInfoCircle size={24} color="#2c5282" />
            {message}
        </div>
    )
}

export default TutorialPrompt;
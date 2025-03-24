import { Link } from 'react-router-dom';
import { capitalize, getInitials } from '../../utils/helprs';
import './profielStyle.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

// eslint-disable-next-line react/prop-types
export default function ProfileInfo({ username }) {
    const {logout} = useContext(AuthContext);

    return (
        <div className="profil-container">
        <div className="name-account">{getInitials(username)}</div>
        <div className="username">
            <h4>{capitalize(username)}</h4>
            {/* Use Link from react-router-dom instead of <a> */}
            <Link to="/login" onClick={() => {logout()}}>Logout</Link>
        </div>
        </div>
    );
}

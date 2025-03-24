import ProfileInfo from '../Card/ProfileInfo';
import './navStyle.css';
import { useContext, useEffect, useState } from 'react';
import  { getProfile } from '../../utils/axiosInstance';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [name, setName] = useState("");
  const {token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUserName = async () => {
  //     try {
  //       const response = await axiosInstance.get("/api/user");
  //       setName(response.data); 
  //     } catch (error) {
  //       console.error("Error fetching notes:", error);
  //     }
  //   };

  //   fetchUserName();
  // })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(token);
        console.log(response.data);
        setName(response.data.data);
      } catch(err) {
        console.log(err);
        logout();
        navigate("/login");
      }
    };

    if(token) fetchProfile();
  }, [token])

  return (
    <nav>
      <div className="first-container">
        <h3>Notes</h3>

        {
          location.pathname !== '/login' && 
          location.pathname !== '/signup' && 
          <ProfileInfo username={name} /> 
        }
      </div>
    </nav>
  );
}

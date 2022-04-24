import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Header.css';

function Header(): JSX.Element {
  const navigate = useNavigate();

  const clickOnTitle = () => {
    navigate('/home');
  };

  return (
    <div className='Header'>
      <h3 className='title' onClick={clickOnTitle}>VACATIONS WEBSITE</h3>
      <Navbar />
    </div>
  );
}

export default Header;

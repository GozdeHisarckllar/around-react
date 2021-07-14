import vectorLogo from '../images/vector-title-logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__vector-logo" src={vectorLogo} alt="logo titled 'Around the U.S.'"/>
    </header>
  );
}

export default Header;
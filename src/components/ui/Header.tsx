import { Link } from 'react-router-dom';
import SearchOrder from '../../features/order/SearchOrder';

function Header() {
  return (
    <header>
      <Link to="/">Fast react pizza</Link>
      <SearchOrder />
      <p>Tanvir</p>
    </header>
  );
}

export default Header;

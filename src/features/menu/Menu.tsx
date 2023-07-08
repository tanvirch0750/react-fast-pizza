/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import { IPizza } from '../../types/globalTypes';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData() as IPizza[];

  return (
    <ul>
      {menu.map((pizza: IPizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader(): Promise<IPizza[]> {
  const menu = await getMenu();
  return menu;
}

export default Menu;

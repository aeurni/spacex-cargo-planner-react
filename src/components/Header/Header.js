import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import toast from 'react-simple-toasts';

import { useSelector, useDispatch } from 'react-redux';
import { fetchShipments } from '../../features/shipments/shipmentsSlice';

import './Header.scss';
import logo from '../../assets/logo.svg';

const Header = ({
  onShipmentsFilter,
  onInputClear,
  onToggleSidebar,
  searchQuery,
}) => {
  const clearInputClassNames = `Header__clear-input ${
    searchQuery ? 'Header__clear-input--visible' : ''
  }`;
  const history = useHistory();
  const dispatch = useDispatch();
  const { shipments } = useSelector((state) => state.shipments);

  const hamburgerMenu = useRef();

  const toggleSidebar = () => {
    hamburgerMenu.current.classList.toggle('Header__hamburger-menu--active');
    onToggleSidebar();
  };

  const handleShipmentsLoad = () => {
    dispatch(fetchShipments());
    history.push('/');
  };

  const handleShipmentsSave = () => {
    localStorage.setItem('shipments', JSON.stringify(shipments));
    toast('Saved');
  };

  return (
    <header className="Header">
      <Link to="/">
        <img className="Header__logo" src={logo} alt="logo" />
      </Link>

      <div className="Header__search-bar">
        <input
          className="Header__input"
          name="search"
          value={searchQuery}
          onChange={onShipmentsFilter}
        />
        <i className={clearInputClassNames} onClick={onInputClear}>
          ×
        </i>
      </div>

      <div className="Header__buttons">
        <button className="Header__button btn" onClick={handleShipmentsLoad}>
          Load
        </button>
        <button className="Header__button btn" onClick={handleShipmentsSave}>
          Save
        </button>
      </div>

      <div
        className="Header__hamburger-menu"
        onClick={toggleSidebar}
        ref={hamburgerMenu}
      >
        <div></div>
      </div>
    </header>
  );
};

export default Header;

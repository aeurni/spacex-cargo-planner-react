import React from 'react';
import { NavLink } from 'react-router-dom';

import './ShipmentsList.scss';

import { useSelector, useDispatch } from 'react-redux';
import { findShipment } from '../../features/shipments/shipmentsSlice';

const ShipmentsList = ({ onHighlight }) => {
  const { shipments } = useSelector((state) => state.shipments);

  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(findShipment(id));
  };

  const renderShipmentsList = shipments.map((item) => (
    <li className="ShipmentsList__item" key={item.id}>
      <NavLink
        to={`/${item.id}`}
        onClick={() => handleClick(item.id)}
        activeClassName="ShipmentsList__item--active"
      >
        {onHighlight(item.name)}
      </NavLink>
    </li>
  ));

  return (
    <ul className="ShipmentsList">
      {renderShipmentsList}
      {!shipments.length && <li>Nothing found!</li>}
    </ul>
  );
};

export default ShipmentsList;

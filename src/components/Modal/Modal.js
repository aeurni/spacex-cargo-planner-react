import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchShipments } from '../../features/shipments/shipmentsSlice';

import './Modal.scss';

const Modal = ({ message, onShipmentsLoad, onCancel }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleShipmentsLoad = () => {
    dispatch(fetchShipments());
    history.push('/');
  };

  return (
    <div className="Modal__backdrop" onClick={onCancel}>
      <div className="Modal__container">
        <h2 className="Modal__header">{message}</h2>
        <div className="Modal__footer">
          <button className="Modal__button btn" onClick={handleShipmentsLoad}>
            Load
          </button>
          <button className="Modal__button btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateShipmentBoxes,
  findShipment,
} from '../../features/shipments/shipmentsSlice';

import Home from '../Home/Home';
import './ShipmentInfo.scss';

const ShipmentInfo = () => {
  const [inputIsValid, setInputIsValid] = useState(true);
  const [cargoBays, setCargoBays] = useState(0);

  const dispatch = useDispatch();

  let { id } = useParams();

  const { status, selectedShipment } = useSelector((state) => state.shipments);

  useEffect(() => {
    dispatch(findShipment(id));

    document.title = `Cargo planner - ${selectedShipment.name}`;
  }, [dispatch, id, selectedShipment.name]);

  useEffect(() => {
    if (selectedShipment.boxes) {
      const boxes = selectedShipment.boxes.split(',').map(Number);
      handleCargoBaysSize(boxes);
    } else {
      setCargoBays(0);
    }
  }, [selectedShipment.boxes]);

  const handleChange = (event) => {
    const value = event.target.value;
    const boxes = value.split(',').map(Number);

    handleCargoBaysSize(boxes);

    dispatch(updateShipmentBoxes({ id, boxes: value }));
  };

  const handleCargoBaysSize = (boxes) => {
    const pattern = new RegExp(/^\s*?\d+(\.\d{1,2})?\s*$/);
    const unitsPerBay = 10;

    let isValid = true;
    let totalUnits = 0;

    boxes.forEach((box) => {
      isValid = isValid && pattern.test(box);
      if (isValid) {
        totalUnits += box;
      }
    });

    setInputIsValid(isValid);
    setCargoBays(Math.ceil(totalUnits / unitsPerBay));
  };

  let classNames = `ShipmentInfo__input ${
    !inputIsValid ? 'ShipmentInfo__input--invalid' : ''
  }`;

  if (status === 'rejected') {
    return <Home />;
  }

  return (
    <main className="ShipmentInfo">
      <h1 className="ShipmentInfo__Header">{selectedShipment.name}</h1>
      <a
        className="ShipmentInfo__email"
        href={`mailto:${selectedShipment.email}`}
      >
        {selectedShipment.email}
      </a>

      <p className="ShipmentInfo__Bays">
        Number of required cargo bays {cargoBays}
      </p>

      <p>Cargo boxes</p>
      <input
        className={classNames}
        name="boxes"
        value={selectedShipment.boxes || ''}
        onChange={handleChange}
      />
    </main>
  );
};

export default ShipmentInfo;

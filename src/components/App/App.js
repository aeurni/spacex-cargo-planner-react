import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { highlightText } from '../../helper';

import { useSelector, useDispatch } from 'react-redux';
import {
  getLocalShipments,
  filterShipmentsByName,
} from '../../features/shipments/shipmentsSlice';

import './App.scss';

import Header from '../Header/Header';
import Home from '../Home/Home';
import Modal from '../Modal/Modal';

import Layout from '../Layout/Layout';
import Sidebar from '../Sidebar/Sidebar';
import Preloader from '../Preloader/Preloader';

import ShipmentsList from '../ShipmentsList/ShipmentsList';
import ShipmentInfo from '../ShipmentInfo/ShipmentInfo';

const App = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [sidebarIsOpened, setSidebarIsOpened] = useState(false);

  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { shipments, status } = useSelector((state) => state.shipments);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!shipments.length) {
      setMessage(
        'There is no available locally saved shipments. Would you like to load sample data?'
      );
      setModalIsVisible(true);
    }
  }, [dispatch]);

  const handleShipmentsFilter = (event) => {
    const query = event.target.value;

    if (query !== '') {
      dispatch(filterShipmentsByName(query));
    } else {
      dispatch(getLocalShipments());
    }
    setSearchQuery(query);
  };

  const handleHighlight = (text) => {
    if (searchQuery !== '') {
      return highlightText(text, searchQuery);
    }

    return text;
  };

  const closeModalHandler = () => {
    setModalIsVisible(false);
  };

  const handleInputClear = () => {
    setSearchQuery('');
    dispatch(getLocalShipments());
  };

  const handleToggleSidebar = () => {
    setSidebarIsOpened(!sidebarIsOpened);
  };

  return (
    <Router>
      <div
        className={`main-wrapper ${
          sidebarIsOpened ? 'main-wrapper--extended' : ''
        }`}
      >
        <Header
          onShipmentsFilter={handleShipmentsFilter}
          onInputClear={handleInputClear}
          onToggleSidebar={handleToggleSidebar}
          searchQuery={searchQuery}
        />
        <Layout>
          <Sidebar>
            <ShipmentsList onHighlight={handleHighlight} />
          </Sidebar>
          <Switch>
            <Route path="/:id">
              <ShipmentInfo />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>

        {modalIsVisible && message ? (
          <Modal message={message} onCancel={closeModalHandler} />
        ) : null}
        {status === 'loading' && <Preloader />}
      </div>
    </Router>
  );
};

export default App;

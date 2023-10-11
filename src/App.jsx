import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Link,
  Switch,
} from 'react-router-dom';

import { FilterServices } from './components/ServiceList/FilterServices';
import { AddServiceModal, EditServiceModal } from './components/Modal/Modal';
import { ServiceList } from './components/ServiceList/ServiceList';
import { LoadingSpinner } from './components/ServiceList/LoadingSpinner';
import { ErrorPopup } from './components/ServiceList/ErrorPopup';

import { getServicesAsync } from './reducers/serviceList';

import './styles/app.css';

export const App = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector(
    (state) => state.serviceList,
  );

  const [filtered, setFiltered] = useState('');

  const filterByString = (string, services) => {
    return string
      ? services.filter((service) =>
          service.name.toLowerCase().includes(string.toLowerCase()),
        )
      : null;
  };

  const onFilter = (string) => {
    const filteredServices = filterByString(string, services);
    setFiltered(filteredServices);
  };

  useEffect(() => {
    dispatch(getServicesAsync());
  }, [dispatch]);

  return (
    <Router>
      <Route exact path={['/']}>
        {/*HOMEPAGE добавил из-за нюанса на GitHub Pages, такое вот костыльное решение*/}
        <Redirect to={process.env.REACT_APP_HOMEPAGE} />
      </Route>
      {loading ? (
        <LoadingSpinner radius="20" width="5" color="rgb(210, 70, 75)" />
      ) : error ? (
        <ErrorPopup message={error} />
      ) : (
        <div className="services-app">
          <Link
            to={`${process.env.REACT_APP_HOMEPAGE}/add`}
            className="add-service_link"
          >
            <button className="add-service_btn">Add new service</button>
          </Link>
          <FilterServices onFilter={onFilter} />
          <ServiceList services={filtered || services} />
          <Switch>
            <Route
              path={`${process.env.REACT_APP_HOMEPAGE}/add`}
              component={AddServiceModal}
            ></Route>
            <Route
              path={`${process.env.REACT_APP_HOMEPAGE}/:id`}
              component={EditServiceModal}
            ></Route>
          </Switch>
        </div>
      )}
    </Router>
  );
};

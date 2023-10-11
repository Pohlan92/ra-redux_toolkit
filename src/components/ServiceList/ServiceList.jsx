import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeServiceAsync } from '../../reducers/serviceList';

export const ServiceList = ({ services }) => {
  return (
    <ul className="service-list">
      {services.map((service, i) => (
        <ServiceItem {...service} key={i} />
      ))}
    </ul>
  );
};

const ServiceItem = ({ name, price, id }) => {
  const dispatch = useDispatch();

  const onRemove = () => {
    dispatch(removeServiceAsync(id));
  };

  return (
    <li className="service-item">
      <div className="service-item_info">
        <div className="service-item_name">{name}</div>
        <div className="service-item_price">{price} ₽</div>
      </div>
      <div className="service-item_controls">
        <Link to={`${process.env.REACT_APP_HOMEPAGE}/${id}`}>
          <Button label="Edit" />
        </Link>
        <Button onClick={onRemove} label="Remove" />
      </div>
    </li>
  );
};

const Button = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="service-item_btn">
      {label}
    </button>
  );
};

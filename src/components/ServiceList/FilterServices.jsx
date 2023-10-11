import { useState } from 'react';

export const FilterServices = ({ onFilter }) => {
  const [value, setValue] = useState('');

  const onChange = ({ target: { value } }) => {
    setValue(value);
    onFilter(value);
  };

  return (
    <div className="filter-services">
      <label className="filter-services_label">
        <span className="filter-services_text">Search</span>
        <input
          type="text"
          className="filter-services_input"
          onChange={onChange}
          value={value}
        />
      </label>
    </div>
  );
};

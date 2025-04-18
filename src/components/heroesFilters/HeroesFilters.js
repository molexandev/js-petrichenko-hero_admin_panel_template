// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import {
   filtersFetching,
   filtersFetched,
   filtersFetchingError,
   activeFilterChanged,
} from '../../actions';

const HeroesFilters = () => {
   const dispatch = useDispatch();
   const filters = useSelector((state) => state.filters);
   const activeFilter = useSelector((state) => state.activeFilter);
   const { request } = useHttp();

   const handleFilterClick = (name) => {
      dispatch(activeFilterChanged(name));
   };

   useEffect(() => {
      dispatch(filtersFetching());
      request('http://localhost:3001/filters')
         .then((data) => dispatch(filtersFetched(data)))
         .catch(() => dispatch(filtersFetchingError()));
   }, []);

   return (
      <div className="btn-group">
         {filters.map(({ name, label, className }) => (
            <button
               key={name}
               className={`btn ${className} ${
                  activeFilter === name ? 'active' : ''
               }`}
               onClick={() => handleFilterClick(name)}
            >
               {label}
            </button>
         ))}
      </div>
   );
};

export default HeroesFilters;

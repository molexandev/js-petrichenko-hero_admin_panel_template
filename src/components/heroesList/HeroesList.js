import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
   heroesFetching,
   heroesFetched,
   heroesFetchingError,
   heroDeleted,
} from '../../actions';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';
import './HeroesList.scss';

const HeroesList = () => {
   const { heroes, heroesLoadingStatus } = useSelector((state) => state);
   const dispatch = useDispatch();
   const { request } = useHttp();

   useEffect(() => {
      dispatch(heroesFetching());
      request('http://localhost:3001/heroes')
         .then((data) => dispatch(heroesFetched(data)))
         .catch(() => dispatch(heroesFetchingError()));

      // eslint-disable-next-line
   }, []);

   if (heroesLoadingStatus === 'loading') {
      return <Spinner />;
   } else if (heroesLoadingStatus === 'error') {
      return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
   }

   const onDelete = (id) => {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
         .then(() => dispatch(heroDeleted(id)))
         .catch(() => dispatch(heroesFetchingError()));
   };

   const renderHeroesList = (arr) => {
      if (arr.length === 0) {
         return <h5 className="text-center mt-5">Героев пока нет</h5>;
      }

      return (
         <TransitionGroup component="ul">
            {arr.map(({ id, ...props }) => (
               <CSSTransition key={id} timeout={500} classNames="hero">
                  <HeroesListItem id={id} {...props} onDelete={onDelete} />
               </CSSTransition>
            ))}
         </TransitionGroup>
      );
   };
   const elements = renderHeroesList(heroes);
   return <ul>{elements}</ul>;
};

export default HeroesList;

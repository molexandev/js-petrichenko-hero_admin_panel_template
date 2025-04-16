// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { heroesFetchingError, heroAdded } from '../../actions';
import { v4 as uuidv4 } from 'uuid';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const HeroesAddForm = () => {
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [element, setElement] = useState('');

   const dispatch = useDispatch();
   const { request } = useHttp();

   const onSubmitHandler = (e) => {
      e.preventDefault();

      const newHero = {
         id: uuidv4(),
         name,
         description,
         element,
      };

      request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(newHero))
         .then(() => dispatch(heroAdded(newHero)))
         .catch(() => dispatch(heroesFetchingError()));

      setName('');
      setDescription('');
      setElement('');
   };

   return (
      <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
         <div className="mb-3">
            <label htmlFor="name" className="form-label fs-4">
               Имя нового героя
            </label>
            <input
               value={name}
               onChange={(e) => setName(e.target.value)}
               required
               type="text"
               name="name"
               className="form-control"
               id="name"
               placeholder="Как меня зовут?"
            />
         </div>

         <div className="mb-3">
            <label htmlFor="text" className="form-label fs-4">
               Описание
            </label>
            <textarea
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               required
               name="description"
               className="form-control"
               id="text"
               placeholder="Что я умею?"
               style={{ height: '130px' }}
            />
         </div>

         <div className="mb-3">
            <label htmlFor="element" className="form-label">
               Выбрать элемент героя
            </label>
            <select
               value={element}
               onChange={(e) => setElement(e.target.value)}
               required
               className="form-select"
               id="element"
               name="element"
            >
               <option>Я владею элементом...</option>
               <option value="fire">Огонь</option>
               <option value="water">Вода</option>
               <option value="wind">Ветер</option>
               <option value="earth">Земля</option>
            </select>
         </div>

         <button type="submit" className="btn btn-primary">
            Создать
         </button>
      </form>
   );
};

export default HeroesAddForm;

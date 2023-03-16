import FilterCheckbox from '../UI/FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search'>
      <div className='search__inputs'>
        <label className='search__field'>
          <div className='search__icon' />
          <input className='search__form' placeholder='Фильм' />
          <button className='search__button' type='button' />
        </label>
        <FilterCheckbox />
      </div>
    </section>
  );
}

export default SearchForm;

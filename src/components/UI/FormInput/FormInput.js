import './FormInput.css';

function FormInput({ title, type, placeholder, id, value, handleChange }) {
  return (
    <label className='input'>
      <span className='input__title'>{title}</span>
      <input
        id={id}
        className='input__field'
        type={type}
        placeholder={placeholder}
        required
        minLength='6'
        value={value}
        onChange={handleChange}
      />
      <span className='input__error'></span>
    </label>
  );
}

export default FormInput;

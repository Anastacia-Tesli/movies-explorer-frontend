import './FormInput.css';

function FormInput({
  title,
  name,
  type,
  pattern,
  placeholder,
  id,
  value,
  handleChange,
  error,
  formError,
}) {
  return (
    <label className='input'>
      <span className='input__title'>{title}</span>
      <input
        className='input__field'
        id={id}
        name={name}
        type={type}
        pattern={pattern}
        placeholder={placeholder}
        required
        minLength='3'
        value={value}
        onChange={handleChange}
      />
      <span className='input__error input__error_type_active'>{formError}</span>
      <span className='input__error input__error_type_active'>{error}</span>
    </label>
  );
}

export default FormInput;

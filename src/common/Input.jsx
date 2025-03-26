import "./Input.css";

function Input({
  type = "text",
  id,
  register,
  label,
  labelRequired = true,
  ...rest
}) {
  return (
    <div className="form-control">
      {labelRequired && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <input
        {...rest}
        {...register}
        type={type}
        id={id}
        className="form-input"
      />
    </div>
  );
}

export default Input;

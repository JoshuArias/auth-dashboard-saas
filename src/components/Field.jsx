function Field({ autoComplete, id, label, onChange, placeholder, type = 'text', value }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <input
        autoComplete={autoComplete}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  )
}

export default Field

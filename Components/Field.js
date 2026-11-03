const Field = ({ form, name, label, as: Tag = "input", ...props }) => (
    <div>
        <div className="field">
            <Tag
                id={name}
                name={name}
                placeholder=" "
                value={form.values[name] ?? ""}
                onChange={form.handleChange}
                aria-invalid={Boolean(form.errors[name])}
                aria-describedby={form.errors[name] ? `${name}-error` : undefined}
                {...props}
            />
            <label htmlFor={name}>{label}</label>
        </div>
        {form.errors[name] && <span id={`${name}-error`} className="fieldError" role="alert">{form.errors[name]}</span>}
    </div>
)

export default Field

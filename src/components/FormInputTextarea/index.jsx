export default function FormInputTextarea({ label="Label", name="label", value="",rows=4, onChange ,props}) {
    return (
        <div>
            <label className="sr-only" htmlFor="title">{label}</label>
            <textarea
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border p-3 text-sm"
                placeholder={label}
                id={name}
                name={name}
                {...props}
                rows={rows}
            />
        </div>
    )
}
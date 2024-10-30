export default function FormInput({ label="Label", type="text", name="label", value="", onChange ,props}) {
    return (
        <div>
            <label className="sr-only" htmlFor="title">{label}</label>
            <input
                value={value}
                {...props}
                onChange={onChange}
                className="w-full rounded-lg border p-3 text-sm"
                placeholder={label}
                type={type}
                id={name}
                name={name}
            />
        </div>
    )
}
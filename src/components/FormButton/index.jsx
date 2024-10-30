export default function FormButton({ type="submit",title, name="label", value="", onClick ,props}) {
    return (
        <div className="mt-4">
        <button 
            onClick={onClick}
            type={type}
            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
        >
            {title}
        </button>
    </div>
    )
}
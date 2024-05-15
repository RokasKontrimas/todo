const TextInputLabeled = ({ labelName, id, name, type, register = () => {}, error = '', validationRules = '', setValue}) => {
    return (
        <div>
            <label htmlFor={id}>{labelName}</label>
            <input
                id={id}
                name={name}
                type={type}
                {...register(name, validationRules)}
                onChange={(e) => {
                    setValue && setValue(name, e.target.value, {shouldValidate: true})
                }}
            />
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </div>
    );
};

export default TextInputLabeled;

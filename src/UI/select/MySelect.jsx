

const MySelect = ({options, defaultValue, value, onChange}) => {

    return(
        <select 
            value={value}
            onChange={(event) => onChange(event.target.value)}>
            <option 
                disabled 
                value=''>
                {defaultValue}
            </option>
            
            {options.map(option => 
            <option value={option.value} key={option.name}>
                {option.name}
            </option>)
            }
        </select>
    )
}

export default MySelect;
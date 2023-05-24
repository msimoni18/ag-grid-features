export default function MenuItem({ id, label, value, defaultChecked }) {
  const handleClick = (event) => {
    console.log(event.target);
    console.log(event.target.value);
  };

  return (
    <div>
      <input
        type="checkbox"
        id={`${value}-${id}`}
        name={value}
        value={value}
        defaultChecked={defaultChecked}
        onClick={handleClick}
      />
      <label htmlFor={value}>{label}</label>
      <br />
    </div>
  );
}

function Input(props: any) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      className="border-solid border-2 border-black w-80 h-11 pl-4 mt-3 rounded-lg"
    />
  );
}

export default Input;

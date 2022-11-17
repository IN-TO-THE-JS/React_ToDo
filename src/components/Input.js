const Input = ({ setText, text }) => {
  return (
    <input
      value={text}
      onChange={(e) => {
        setText(e.currentTarget.value);
      }}
    />
  );
};

export default Input;

const { useState, useEffect } = React;

export const ColorPicker = () => {
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    document.getElementById("color-picker-container").style.backgroundColor =
      color;
    document.getElementById("color-input").value = color;
    document.body.style.backgroundColor = color;
  }, [color]);

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  return (
    <div id="color-picker-container">
      <input
        id="color-input"
        type="color"
        value={color}
        onChange={handleColor}
      />
    </div>
  );
};

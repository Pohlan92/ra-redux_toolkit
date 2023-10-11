export const LoadingSpinner = ({ radius, width, color }) => {
  // radius и width работают совсем не так, как мне нужно было, но оставлю так
  const length = radius * 2.5;

  return (
    <svg className="loading-spinner" viewBox={`0 0 ${length} ${length}`}>
      <circle
        className="path"
        cx={length / 2}
        cy={length / 2}
        r={radius}
        fill="none"
        strokeWidth={width}
        stroke={color}
      ></circle>
    </svg>
  );
};

export const highlightText = (text, query) => {
  const parts = text.split(new RegExp(`(${query})`, 'ig'));

  return (
    <>
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === query.toLowerCase()
              ? { backgroundColor: '#ffbe00' }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </>
  );
};

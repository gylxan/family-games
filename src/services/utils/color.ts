export const generateColor = (): string =>
  '#000000'.replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });

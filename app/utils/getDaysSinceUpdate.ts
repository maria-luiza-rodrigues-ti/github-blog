export function getDaysSinceUpdate(date: string) {
  const today = new Date();
  const issueDate = new Date(date);

  const diffTime = today.getTime() - issueDate.getTime();

  const diferenceDays = Math.floor(diffTime / (1000 * 3600 * 24));

  if (diferenceDays === 1) {
    return `Há ${diferenceDays} dia`;
  } else if (diferenceDays === 0) {
    return `Hoje`;
  } else {
    return `Há ${diferenceDays} dias`;
  }
}

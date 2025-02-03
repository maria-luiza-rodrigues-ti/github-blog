export function getDaysSinceUpdate(date: string) {
  const today = new Date();
  const issueDate = new Date(date);

  const diffTime = today.getTime() - issueDate.getTime();

  const diferenceDays = diffTime / (1000 * 3600 * 24);

  return Math.floor(diferenceDays);
}

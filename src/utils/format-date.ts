export const formatDate = (dateString: string) => {
  let date: Date;

  if (dateString.includes('T')) {
    date = new Date(dateString);
  } else {
    const [year, month, day] = dateString.split('-').map(Number);
    date = new Date(Date.UTC(year, month - 1, day));
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

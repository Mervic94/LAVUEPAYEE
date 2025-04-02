
export const getYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 100 }, (_, i) => currentYear - i);
};

export const getMonths = () => [
  { value: "1", label: "Janvier" },
  { value: "2", label: "Février" },
  { value: "3", label: "Mars" },
  { value: "4", label: "Avril" },
  { value: "5", label: "Mai" },
  { value: "6", label: "Juin" },
  { value: "7", label: "Juillet" },
  { value: "8", label: "Août" },
  { value: "9", label: "Septembre" },
  { value: "10", label: "Octobre" },
  { value: "11", label: "Novembre" },
  { value: "12", label: "Décembre" },
];

export const getDays = () => Array.from({ length: 31 }, (_, i) => i + 1);

export const formatDateOfBirth = (year: string, month: string, day: string) => {
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

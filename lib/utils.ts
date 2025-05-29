import { Month } from "@/types/month";

export const getMonthName = (month: number) =>
  new Date(0, month).toLocaleString("fr-FR", { month: "long" });

export const getYearMonths = (): Month[] => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const months = [];

  for (let i = 0; i <= currentMonth; i++) {
    const date = new Date(currentYear, i, 1);

    months.push({
      month: date.getMonth(),
      year: date.getFullYear(),
      name: getMonthName(date.getMonth()),
      isCurrent: i === currentMonth,
      hasSaved: false,
    });
  }
  return months;
};

export const saveIncome = (income: number): void => {
  localStorage.setItem("income", income.toString());
};

export const getIncome = (): number => {
  return Number(localStorage.getItem("income") ?? 0);
};

export const saveRate = (rate: number): void => {
  localStorage.setItem("rate", rate.toString());
};

export const getRate = (defaultRate: number): number => {
  return Number(localStorage.getItem("rate") ?? defaultRate);
};

export const getTarget = (): number => {
  return Number(localStorage.getItem("target") ?? 0);
};

export const saveTarget = (target: number): void => {
  localStorage.setItem("target", target.toString());
};

export const getSavedMonths = (): Month[] => {
  const savedMonths = localStorage.getItem("saved-months");

  if (!savedMonths) return [];

  return JSON.parse(savedMonths);
};

export const saveMonths = (months: Month[]): void => {
  localStorage.setItem("saved-months", JSON.stringify(months));
};

export const toMoney = (value: string | number): string => {
  return Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(Number(value));
};

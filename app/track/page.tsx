"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { LuPen } from "react-icons/lu";

import {
  getMonthName,
  getSavedMonths,
  getTarget,
  getYearMonths,
  saveMonths,
  toMoney,
} from "@/lib/utils";
import { Month } from "@/types/month";

export default function Page() {
  const [savedMonths, setSavedMonths] = useState(getSavedMonths());

  const months = useMemo(() => {
    const yearMonths = getYearMonths();

    return yearMonths.map((month, index) => ({
      ...month,
      isCurrent: index === yearMonths.length - 1,
      hasSaved: savedMonths.some(
        (savedMonth) => savedMonth.month === month.month && savedMonth.year === month.year,
      ),
    }));
  }, [savedMonths]);

  const target = getTarget();

  const totalSaved = savedMonths.length * target;

  const handleMonthClick = (month: Month) => {
    const existingMonth = savedMonths.find(
      (savedMonth) => savedMonth.month === month.month && savedMonth.year === month.year,
    );

    let newSavedMonths = savedMonths;

    if (existingMonth) {
      newSavedMonths = savedMonths.filter(
        (saved) => saved.month !== month.month || saved.year !== month.year,
      );
    } else {
      newSavedMonths = [...savedMonths, month];
    }

    saveMonths(newSavedMonths);
    setSavedMonths(newSavedMonths);
  };

  const currentMonthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    currentMonthRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main className="space-y-8">
      <h1 className="text-xl font-bold">Suivez votre épargne</h1>

      <div className="flex gap-4 overflow-x-auto">
        {months.map(({ month, year, hasSaved, isCurrent }) => (
          <div key={`${month}-${year}`}>
            <div
              ref={isCurrent ? currentMonthRef : undefined}
              className={`flex h-52 w-32 cursor-pointer flex-col items-center justify-center rounded border text-center shadow ${hasSaved ? "border-blue-500 bg-blue-100" : ""}`}
              onClick={() => handleMonthClick({ month, year })}
            >
              <input
                type="checkbox"
                className={`checkbox ${hasSaved ? "checkbox-primary" : ""}`}
                checked={hasSaved}
              />

              <h2 className="mt-4 font-bold">{toMoney(target)}</h2>
              <p className="font-light">{getMonthName(month)}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="rounded bg-slate-100 p-4 shadow">
        Vous avez épargné <strong>{toMoney(totalSaved)}</strong> sur l&apos;année.
      </p>

      <Link href="/" className="btn">
        <LuPen className="h-4 w-4" />
        Modifier mon objectif
      </Link>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getIncome, getRate, saveIncome, saveRate, saveTarget, toMoney } from "@/lib/utils";

export default function Home() {
  const router = useRouter();
  const [income, setIncome] = useState(getIncome());
  const [rate, setRate] = useState(getRate(20));

  const target = Number((income * (rate / 100)).toFixed(2));

  return (
    <main className="space-y-8">
      <h1 className="text-xl font-bold">Définissez votre objectif d&apos;épargne</h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="income">Combien gagnez-vous par mois?</label>
        <input
          id="income"
          className="input-bordered input w-full"
          onChange={(e) => setIncome(Number(e.target.value))}
          defaultValue={income}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="rate">Quel pourcentage de vos revenus voulez-vous épargner?</label>
        <input
          type="range"
          min="0"
          max="100"
          className="range range-primary range-xs w-full"
          onChange={(e) => setRate(Number(e.target.value))}
          defaultValue={rate}
        />
        <div className="flex items-center gap-2">
          <p>{rate}%</p>
          {rate < 20 && <div className="badge badge-soft badge-warning">Bas</div>}
          {rate >= 20 && rate <= 40 && <div className="badge badge-soft badge-success">Bon</div>}
          {rate > 40 && <div className="badge badge-soft badge-success">Elevé</div>}
        </div>
      </div>

      <div className="rounded border p-4 shadow">
        <p>
          Votre objectif d&apos;épargne est de <strong>{toMoney(target)}</strong> / mois.
        </p>
      </div>

      <button
        className="btn btn-primary float-right"
        onClick={() => {
          saveIncome(income);
          saveRate(rate);
          saveTarget(target);
          router.push("/track");
        }}
        disabled={!income || !rate}
      >
        Suivre mon épargne
      </button>
    </main>
  );
}

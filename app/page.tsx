"use client";

import { euros } from "@/lib/utils";
import Link from "next/link";
import { LuArrowRight, LuPen, LuPlus } from "react-icons/lu";

export default function Home() {
  const income = 4200;
  const rate = 20;

  const currentSecurityAmount = 3290;
  const totalSecurityAmount = 6 * income * 0.7;

  return (
    <main className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Mes informations</h2>

        <div className="flex gap-4">
          <div className="bg-base-200 flex-1 rounded p-4">
            <h2 className="text-neutral-500">Revenus mensuels</h2>
            <p className="text-2xl font-bold">{euros(income)}</p>
          </div>

          <div className="bg-base-200 flex-1 rounded p-4">
            <h2 className="text-neutral-500">Taux d&apos;épargne</h2>
            <p className="text-2xl font-bold">{rate}%</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn btn-neutral btn-sm btn-outline">
            Modifier <LuPen size={16} />
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Mes objectifs</h2>

        <div className="bg-base-200 space-y-4 rounded p-4">
          <h2 className="text-neutral-500">Matelas de sécurité</h2>

          <div className="flex items-center gap-4">
            <div>
              <p className="text-xl font-bold">{euros(currentSecurityAmount)}</p>
              <p className="text-sm text-neutral-500">Montant actuel</p>
            </div>
            <LuArrowRight />
            <div>
              <p className="text-xl font-bold">{euros(totalSecurityAmount)}</p>
              <p className="text-sm text-neutral-500">Objectif</p>
            </div>
          </div>

          <progress
            className="progress"
            value={currentSecurityAmount}
            max={totalSecurityAmount}
          ></progress>

          <div className="flex items-center justify-end">
            <Link href="/emergency-fund" className="btn btn-neutral btn-sm">
              En savoir plus <LuArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Mes comptes</h2>

        <div className="bg-base-200 space-y-2 rounded p-4">
          <p className="text-neutral-500">Livret A</p>

          <p className="text-xl font-bold">{euros(currentSecurityAmount)}</p>

          <button className="btn btn-neutral btn-xs btn-outline">
            Modifier le montant <LuPen size={12} />
          </button>
        </div>

        <div className="bg-base-200 space-y-2 rounded p-4">
          <p className="text-neutral-500">Vous souhaitez ajouter un compte?</p>
          <button className="btn btn-neutral btn-sm btn-outline">
            Ajouter un compte <LuPlus size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}

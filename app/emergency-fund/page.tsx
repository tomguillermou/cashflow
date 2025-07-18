import { Accordion, AccordionContent, AccordionTitle } from "@/components/ui/accordion";
import { euros } from "@/lib/utils";
import { LuArrowRight } from "react-icons/lu";

export default function Page() {
  return (
    <main className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-bold">Mon matelas de sécurité</h2>

        <div className="card bg-base-200">
          <div className="card-body space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xl font-bold">{euros(3200)}</p>
                <p className="text-sm text-neutral-500">Montant actuel</p>
              </div>
              <LuArrowRight />
              <div>
                <p className="text-xl font-bold">{euros(18000)}</p>
                <p className="text-sm text-neutral-500">Objectif</p>
              </div>
            </div>

            <progress className="progress progress-primary" value={3200} max={18000}></progress>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold">Questions fréquentes</h2>

        <Accordion name="faq">
          <AccordionTitle>Qu&apos;est-ce qu&apos;un matelas de sécurité ?</AccordionTitle>
          <AccordionContent>
            Un matelas de sécurité est une somme d&apos;argent mise de côté pour faire face aux
            imprévus : perte d&apos;emploi, grosse dépense urgente, souci de santé, etc. Il
            t&apos;évite de devoir emprunter ou vendre tes investissements dans la précipitation.
          </AccordionContent>
        </Accordion>
        <Accordion name="faq">
          <AccordionTitle>Combien dois-je mettre de côté ?</AccordionTitle>
          <AccordionContent>
            En général, entre 3 et 6 mois de dépenses mensuelles. Le montant dépend de ta situation
            personnelle : plus elle est instable (freelance, peu d&apos;aides, charges fixes
            élevées), plus le matelas doit être important.
          </AccordionContent>
        </Accordion>
        <Accordion name="faq">
          <AccordionTitle>Où dois-je placer cet argent ?</AccordionTitle>
          <AccordionContent>
            Sur un support liquide, sécurisé et accessible :
            <ul>
              <li>- Livret A</li>
              <li>- LDDS (Livret de Développement Durable et Solidaire)</li>
              <li>- Compte épargne classique</li>
            </ul>
            Évite les placements à risque (actions, crypto) ou bloqués (assurance-vie).
          </AccordionContent>
        </Accordion>
        <Accordion name="faq">
          <AccordionTitle>
            Puis-je utiliser mon matelas pour des vacances ou un achat plaisir ?
          </AccordionTitle>
          <AccordionContent>
            Non. Ce fonds est réservé aux urgences réelles : perte de revenus, accident, panne
            imprévue, etc. Il est là pour t&apos;éviter de te mettre en difficulté financière, pas
            pour financer ton style de vie.
          </AccordionContent>
        </Accordion>
        <Accordion name="faq">
          <AccordionTitle>Dois-je épargner pour ça avant d&apos;investir ?</AccordionTitle>
          <AccordionContent>
            Oui, c&apos;est la priorité n°1. Tant que tu n&apos;as pas de matelas de sécurité, tu es
            exposé au risque de devoir vendre tes investissements dans de mauvaises conditions si un
            imprévu survient.
          </AccordionContent>
        </Accordion>
      </section>
    </main>
  );
}

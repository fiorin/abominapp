import { notFound } from "next/navigation";
import Image from "next/image";
import { Progress } from "@heroui/progress";
import abominations from "../../../public/db/abominations.json";

export async function generateStaticParams() {
  return abominations.map((a) => ({ slug: a.slug }));
}

export default function AbominationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const abomination = abominations.find((a) => a.slug === params.slug);

  if (!abomination) return notFound();

  const imageSrc = `/images/abominations/${abomination.slug}.png`;

  return (
    <section className="max-w-3xl mx-auto py-10 px-4">
      <Image
        src={imageSrc}
        alt={abomination.name}
        width={300}
        height={400}
        className="rounded-xl mx-auto"
      />
      <h1 className="text-4xl font-bold text-center mt-6">
        {abomination.name}
      </h1>
      <p className="mt-4 text-lg text-center text-default-600">
        {abomination.description}
      </p>

      <div className="mt-6 text-center space-y-2">
        <span className="text-lg font-semibold">Danger Level</span>
        <Progress
          value={(abomination.danger || 1) * 20}
          className="w-full max-w-md mx-auto"
          color="danger"
          label={`${abomination.danger}/5`}
          showValueLabel
        />
      </div>
    </section>
  );
}

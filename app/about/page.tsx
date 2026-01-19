"use client";

import Image from "next/image";

type Member = {
  id: string;
  name: string;
  role: string;
  photoSrc: string;
  story: string;
};

const members: Member[] = [
  {
    id: "m1",
    name: "Emil Hartikainen",
    role: "Violin",
    photoSrc: "/Diidyboody_emil.jpg",
    story: "Paste Emil’s story here — performances, style, and highlights.",
  },
  {
    id: "m2",
    name: "Andrew Ng Wen Hao",
    role: "Violin",
    photoSrc: "/Andrew_tate.jpg",
    story: "Paste Andrew’s story here — training, collaborations, and tours.",
  },
  {
    id: "m3",
    name: "Vadim Grumeza",
    role: "Viola",
    photoSrc: "/Vadim_guzman.jpg",
    story: "Paste Vadim’s story here — signature sound and concert history.",
  },
  {
    id: "m4",
    name: "Tommi Wesslund",
    role: "Cello",
    photoSrc: "/Tommi_cello.jpg",
    story: "Paste Tommi’s story here — performances and artistic vision.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      {members.map((member, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section
            key={member.id}
            className="relative flex min-h-screen items-center justify-center px-6 py-12 text-white"
            style={{
              backgroundImage: "url('/1K5A4016.jpg')",
              backgroundSize: "160%",
              backgroundPosition: "center 5%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div
              className={`relative flex w-full flex-col gap-10 lg:flex-row lg:items-center lg:justify-between ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              <div className="max-w-3xl space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{member.role}</p>
                <h2 className="text-3xl font-semibold">{member.name}</h2>
                <p className="text-white/70 leading-relaxed">{member.story}</p>
              </div>
              <div className="relative h-[35rem] w-full max-w-xl overflow-hidden">
                <Image
                  src={member.photoSrc}
                  alt={`${member.name} portrait`}
                  fill
                  sizes="(min-width: 1024px) 480px, 90vw"
                  className="object-contain"
                  priority={idx === 0}
                />
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}

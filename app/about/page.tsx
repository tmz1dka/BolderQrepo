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
    story:
      "Emil Hartikainen was born in 2003 and began his studies at the Espoo Music Institute under Grazyna Zeranska-Gebert and has since 2016 been at the Sibelius Academy studying with Réka Szilvay, as well as at the Menuhin Academy in Switzerland and the Royal College of Music. He has attended many masterclasses and been successful in international competitions in Finland, Estonia, Russia, Belgium and the United States. Hartikainen has played in a number of orchestras both in Finland and abroad, including the Finnish Radio Symphony Orchestra, Amsterdam's Royal Concertgebouw Orchestra, and the orchestra of the Finnish National Opera. Hartikainen has also appeared at international festivals in Finland, Russia, Belgium and Italy. He is also a regular player of chamber music. Hartikainen is founder of, and first violin with, the Bålder Quartet, which is part of the Kuhmo Chamber Music's Quartet Academy. He plays a Ferdinandus Gagliano violin from 1767 owned by the OP Art Foundation.",
  },
  {
    id: "m2",
    name: "Andrew Ng Wen Hao",
    role: "Violin",
    photoSrc: "/Andrew_tate.jpg",
    story:
      "Malaysian-born violinist Andrew Ng Wen Hao is one of South-East Asia’s up and coming young talents of his generation. Recent seasons have seen him performing in festivals and concerts around the world; Festival Bled in Slovenia, the Verbier Festival, Switzerland and the New Virtuosi International Violin Masterclass on tour in Italy, to name a few. Eager to expand his knowledge and skill, Andrew has taken masterclasses from many distinguished instructors, including David Takeno, Ani Schnarch and Masaaki Suzuki. Besides that, he enjoys close collaboration with chamber music ensembles, the Julliard Quartet, Belcea Quartet, and the Red Priest Baroque Group, all who have given Andrew coaching and mentoring. After graduating from the Yong Siew Toh Conservatory of Music in Singapore, Andrew Ng is currently doing his Master’s degree in Sibelius Academy under the tutelage of former Finnish Radio Symphony Orchestra concertmaster Päivyt Meller. Since 2022, Andrew has held a position in the esteemed Helsinki Philharmonic Orchestra.",
  },
  {
    id: "m3",
    name: "Vadim Grumeza",
    role: "Violin",
    photoSrc: "/Vadim_guzman.jpg",
    story:
      "Vadim Grumeza was born in 1993 and started playing the violin from a very early age in his city of birth Chisinau, in Moldova, where his teacher was Nicolae Buinovski. He continued his studies at the Turku Arts Academy as a pupil of Juha-Pekka Vikman. Grumeza has given concerts in Moldova, France, Germany, the USA, Georgia, Belarus, Norway, Poland and Turkey. In Romania he won prizes at the Remember Enescu Violin Competition in 2011 and the Paul Constantinescu Competition in 2012. Vadim has appeared as soloist with a number of Finnish orchestras, including the Hämeenlinna City Orchestra and Turku's Å-Ensemble. In the concert season 2018–19 Grumeza joined the Jazz at Lincoln Center Orchestra in The Jungle, composed by Wynton Marsalis.",
  },
  {
    id: "m4",
    name: "Tommi Wesslund",
    role: "Cello",
    photoSrc: "/Tommi_cello.jpg",
    story:
      "Tommi Wesslund was born in 1992 and started learning the cello in 1997 at the Porvoo District Music Institute. His teachers were Riikka Järvinen and Pekka Untamala. In 2002 he began at the East Helsinki Music Institute where he studied with Allar Kaasik and Taina Palas. Wesslund began his vocational studies at the Metropolia University of Applied Sciences in Helsinki in 2012 as a pupil of Sami Mäkelä and Tapani Heikinheimo. He graduated as a music teacher in 2017. Since then he has been studying his Master's in cello performance at the Sibelius Academy, with his primary teachers consisting of Roi Ruottinen and subsequently Tuomas Ylinen. Wesslund has engaged in further studies with Marko Ylönen, Ola Karlsson and Andreas Brantelid. As an active touring orchestral musician, Wesslund has been playing with many Finnish orchestras such as the Helsinki Philharmonic Orchestra, The Finnish Chamber Orchestra and Lohja City Orchestra. He has also been substituting as the leader of the cello section with the Lappeenranta City Orchestra, Kymi Sinfonietta and Helsinki Sinfonietta. He has also attended the apprenticeship program with the Finnish Radio Symphony Orchestra during the years 2021-2022. Wesslund has also performed as a soloist with various orchestras in Russia, Helsinki and northern Finland.",
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

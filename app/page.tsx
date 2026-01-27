import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

const featured = products.filter((p) =>
  ["vivaldi-follia", "kancheli-tango"].includes(p.id),
);
// Set your album cover image (place the file in /public and update the path)
const albumCover = "/BQPaletteEditA.jpg";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Section 1: Tickets */}
      <section className="relative flex min-h-screen items-center justify-center bg-[url('/1K5A4016.jpg')] bg-cover bg-[center_35%] text-white">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex flex-col items-center gap-6 px-6 text-center">

          <Image
            src="/Dissonant-White.png"
            alt="Bålder Quartet"
            width={900}
            height={400}
            className="h-auto w-[360px]"
            priority
          />
          <p className="max-w-2xl text-lg text-white/75">
            Experience the quartet live. Upcoming dates and tickets await.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/events"
              className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
            >
              Get Tickets
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
            >
              Buy Scores
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: YouTube video (no autoplay) */}
      <section className="flex min-h-screen items-center justify-center bg-[url('/backgroundempty.png')] bg-[length:160%] bg-[center_5%] bg-no-repeat px-6 py-12 text-white">
        <div className="w-full">
          <div className="relative mx-auto aspect-video max-w-5xl overflow-hidden">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/puMBpccmGBA" // https://youtu.be/puMBpccmGBA?si=ohFNToV9ZqshfdIo
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Section 3: Album + YouTube channel */}
      <section
        className="relative flex min-h-screen items-center justify-center px-6 py-12 text-white"
        style={{
          backgroundImage: `url(${albumCover})`,
          backgroundSize: "160%",
          backgroundPosition: "center 5%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#0f1016",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Album</p>
            <h2 className="text-3xl font-semibold">Latest Album</h2>
            <p className="max-w-2xl text-white/70">
              Paste album cover link here. Describe the release and invite listeners to explore.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/album"
                className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
              >
                Album Page
              </Link>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
              >
                YouTube Channel
              </a>
            </div>
          </div>
          <div className="relative h-72 w-full max-w-xl overflow-hidden border border-dashed border-white/20 bg-white/5">
            <div className="absolute inset-0 grid place-items-center text-center text-xs uppercase tracking-[0.2em] text-white/50">
              Paste album cover image link here
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Streaming links + Shop */}
      <section
        className="relative flex min-h-screen items-center justify-center px-6 py-12 text-white"
        style={{
          backgroundImage: "url('/BQPaletteEditB.jpg')",
          backgroundSize: "100%",
          backgroundPosition: "center 33%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-semibold">Listen & Shop</h2>
          <p className="max-w-2xl text-white/75">
            Pick your platform or grab the score directly.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/streaming"
              className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
            >
              Streaming Links
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
            >
              Buy Scores
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Shop preview */}
      <section
        className="relative flex min-h-screen items-center justify-center px-6 py-12 text-white"
        style={{
          backgroundImage: "url('/BQPaletteEditC.jpg')",
          backgroundSize: "100%",
          backgroundPosition: "center 35%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex w-full flex-col gap-6">
          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            {featured.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden border border-white/15 bg-white/5 p-4"
                style={{ minHeight: "45vh" }}
              >
                <div className="relative h-[75%] overflow-hidden border border-dashed border-white/15 bg-white/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex min-h-[20%] flex-col justify-end gap-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-amber-200">€{item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
            >
              Visit Shop
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: Quartet story */}
      <section
        className="relative flex min-h-screen items-center justify-center px-6 py-12 text-white"
        style={{
          backgroundImage: "url('/BQPaletteEditC.jpg')",
          backgroundSize: "160%",
          backgroundPosition: "center 5%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4 lg:max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">About</p>
            <h2 className="text-3xl font-semibold">The Bålder Quartet</h2>
            <p className="text-white/70 leading-relaxed">
              Bålder Quartet (Finnish: Bålder-kvartetti) was formed earlier in 2018 in Helsinki, Finland. The ensemble won the 2018 “Florida Keys” International Chamber Music Competition and made its debut at Carnegie Hall later that same year. In April 2019, they were invited to perform at the prestigious “Mozarthaus” in Vienna, Austria. The Bålder Quartet is a part of the Kuhmo Chamber Music's String Quartet Academy, working under the mentorship of Vladimir Mendelssohn as well as renowned quartets such as the Quatuor Danel, Enescu Quartet, and META4. In 2023, they became a part of Holland’s String Quartet Academy, supported and guided under the patronage of its artistic leader Marc Danel and the academy's guest teachers. The ensemble's activities are generously supported by the Finnish Culture Foundation, and in 2022 they have undertaken two international tours.
            </p>
          </div>
          <div className="relative h-80 w-full max-w-xl overflow-hidden border border-dashed border-white/20 bg-white/5">
            <div className="absolute inset-0 grid place-items-center text-center text-xs uppercase tracking-[0.2em] text-white/50">
              Paste quartet photo link here
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

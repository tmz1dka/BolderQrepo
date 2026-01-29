import Link from "next/link";
import Image from "next/image";

// Set your album cover image (place the file in /public and update the path)
const albumCover = "/Website.jpg";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Section 1: Tickets */}
      <section
        className="relative flex min-h-[80vh] md:min-h-screen items-center justify-center bg-[url('/home-page-section1.jpg')] bg-cover bg-center bg-no-repeat text-white px-4 py-10 sm:px-6 md:py-16"
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex flex-col items-center gap-6 px-4 text-center sm:px-6">

          <Image
            src="/Dissonant-White.png"
            alt="Bålder Quartet"
            width={900}
            height={400}
            className="h-auto w-[360px]"
            priority
          />
          <p className="max-w-2xl text-base sm:text-lg text-white/75">
            Concert. Reimagined.It’s Showtime!.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              href="https://www.lippu.fi/artist/balder-quartet/"
              className="w-full sm:w-auto rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-400 text-center"
            >
              Get Tickets
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: YouTube video (no autoplay) */}
      <section className="relative flex min-h-[80vh] md:min-h-screen items-center justify-center bg-[url('/backgroundempty.png')] bg-cover bg-center bg-no-repeat px-4 py-10 sm:px-6 md:py-16 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative w-full">
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

      {/* Section 3: The Bålder Show */}
      <section
        className="relative flex min-h-[80vh] md:min-h-screen items-center justify-center px-4 py-10 sm:px-6 md:py-16 text-white"
        style={{
          backgroundImage: `url(${albumCover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#0f1016",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex flex-col items-center gap-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">The Bålder Show</p>
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            Explosive. Immersive. Unforgettable.
          </h2>
          <p className="max-w-2xl text-white/75 text-base md:text-lg">
            Step into our world of fierce lyricism, Nordic light, and tango fire. Every concert is
            crafted to pull you in from the first note.
          </p>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <Link
              href="https://www.lippu.fi/artist/balder-quartet/"
              className="w-full sm:w-auto rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-400 text-center"
            >
              Get Tickets
            </Link>
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

      {/* Section 5: Album highlight */}
      <section
        className="relative flex min-h-screen items-center justify-center px-6 py-12 text-white"
        style={{
          backgroundImage: "url('/section5.jpg')",
          backgroundSize: "100%",
          backgroundPosition: "center 5%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex flex-col items-center gap-4 text-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Album</p>
            <h2 className="text-3xl font-semibold">Latest Album</h2>
            <p className="max-w-2xl text-white/70">
              Paste album cover link here. Describe the release and invite listeners to explore.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
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
          
        </div>
      </section>

      {/* Section 6: Our Story */}
      <section
        className="relative flex min-h-screen items-center justify-center px-6 py-12 text-white"
        style={{
          backgroundImage: "url('/our-story.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          backgroundRepeat: "repeat-y",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative flex w-full flex-col items-center gap-8 text-center lg:items-center lg:text-center">
          <div className="space-y-4 lg:max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Our Story</p>
            <h2 className="text-3xl font-semibold">The Bålder Quartet</h2>
            <div className="space-y-4 text-white/75 leading-relaxed">
              <p>
                As a string quartet, we often find ourselves immersed in the classical music world. It
                is a strange, wondrous world, steeped in interesting traditions that are full of depth
                and meaning. Our daily lives are shaped by rehearsals, listening to each other, arguing
                about phrasing, and trying to make some sense of music that has outlived us all. Over
                the years, we’ve studied, travelled, performed, and functioned as four individuals all
                travelling the same path. If you’re looking for the formal version of this story, that
                information exists elsewhere, neatly organised and responsibly factual.
              </p>
              <p>
                Here's the simple version of our story instead. Bålder Quartet started when a young
                Emil Hartikainen approached Vadim Grumeza during a rehearsal break in Helsinki,
                expressing the desire to form a quartet and to perform music that would connect
                people. Impressed by the size of Emil's afro and convinced by the båldness of his
                convictions, Vadim agreed.
              </p>
              <p>
                Through hard work and perseverance, we slowly found our members. Our ever-reliable
                cellist Tommi Wesslund came aboard in 2017, and in 2018, talented Malaysian violinist
                Andrew Ng joined as well. Together, we hung out at festivals and music camps, drinking
                wine, playing pranks on each other, and sneaking out late at night to do skinny
                dipping. Through patient guidance from Enescu Quartet violist Vladimir Mendelssohn and
                Marc Danel from Quatuor Danel, we steadily learned how to play together. With our
                coaches, we did some real serious string quartet work, like fixing intonation and
                stuff!
              </p>
              <p>
                Time passes quickly, and how on earth exactly we are not so sure, but here we are now.
                We rehearse, take our work seriously, and laugh often — sometimes at the music, and
                sometimes at ourselves. Despite all the obstacles: Emil is always in London; Andrew is
                constantly swept up in work, what keeps us going is trust. The kind that allows for
                honesty, risk-taking, and the occasional disagreement that only brings us closer.
              </p>
              <p>
                It all started as a dream, to connect people through the power of music. Music has the
                ability to open doors to many powerful emotions, and together we aim to bring these
                emotions to the stage. Whether we follow tradition closely or bend it, our goal remains
                the same: to create concerts that make people feel alive, and be in the present.
              </p>
              <p>
                Now we are living our dream. To be honest, we are still learning and still growing.
                Listening to each other, trusting the process, and for now, that feels like exactly
                enough.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

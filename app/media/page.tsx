"use client";

const placeholderPhotos = [
  { id: "photo-1", src: "PASTE_PHOTO_LINK_1", caption: "Paste photo link above" },
  { id: "photo-2", src: "PASTE_PHOTO_LINK_2", caption: "Paste photo link above" },
  { id: "photo-3", src: "PASTE_PHOTO_LINK_3", caption: "Paste photo link above" },
];

const placeholderVideos = [
  { id: "video-1", embed: "PASTE_VIDEO_EMBED_OR_LINK_1", title: "Paste video link above" },
  { id: "video-2", embed: "PASTE_VIDEO_EMBED_OR_LINK_2", title: "Paste video link above" },
];

export default function MediaPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Media</p>
        <h1 className="text-4xl font-semibold text-white">Photos & Videos</h1>
        <p className="max-w-2xl text-white/70">
          Drop your latest press shots and concert captures below. Replace the placeholders with
          actual URLs when you&apos;re ready.
        </p>
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Photos</h2>
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">
            Paste photo link in the code
          </span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="absolute inset-0 grid place-items-center text-center text-xs uppercase tracking-[0.2em] text-white/50">
                Paste photo link here
              </div>
              {/* Replace src with your image URL */}
              <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/5" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-sm text-white/80 backdrop-blur-sm">
                {photo.caption}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Videos</h2>
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">
            Paste video link in the code
          </span>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {placeholderVideos.map((video) => (
            <div
              key={video.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black/50">
                <div className="absolute inset-0 grid place-items-center text-center text-xs uppercase tracking-[0.2em] text-white/50">
                  Paste video embed or link here
                </div>
                {/* Replace with your iframe or video player */}
              </div>
              <p className="mt-3 text-sm font-semibold text-white/80">{video.title}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

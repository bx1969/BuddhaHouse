export default function SomaticVideo() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6" id="somatic-ambient-video">
      <div className="relative aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden bg-spa-charcoal border border-spa-gold/20 shadow-xl group">
        {/* HTML5 Video Element */}
        <video
          src="/global__000054e2ea70026d_0000015f_2_000054e2ea70026d_0000000000000001__5ad62f75bfb647f7_0000020cfd5018bc_00065346b3b45aff.webm"
          className="w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          id="relaxation-webm-player-top"
        />

        {/* Subtle overlay for cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </section>
  );
}

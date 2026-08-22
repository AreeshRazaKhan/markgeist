const SitePaused = () => {
  return (
    <main className="bg-bg flex min-h-screen w-full flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="text-mute mb-4 font-mono text-xs tracking-[0.3em] uppercase">
        Temporarily Offline
      </p>
      <h1 className="font-display text-ink text-3xl sm:text-4xl">
        This site is paused for now
      </h1>
      <p className="text-mute mt-4 max-w-md text-sm sm:text-base">
        We&apos;re not taking visitors at the moment. Please check back soon.
      </p>
    </main>
  )
}

export default SitePaused

import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {'404 — episode not found'}
      </p>
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <Link
        href="/"
        className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest"
      >
        Return to base →
      </Link>
    </div>
  )
}

export default NotFound

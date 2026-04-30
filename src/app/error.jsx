'use client'

import { useEffect } from 'react'
import PropTypes from 'prop-types'

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error('[RootError]:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-destructive">
        {'audio cut out'}
      </p>
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <button
        type="button"
        onClick={reset}
        className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest"
      >
        Retry →
      </button>
    </div>
  )
}

Error.propTypes = {
  error: PropTypes.instanceOf(globalThis.Error).isRequired,
  reset: PropTypes.func.isRequired
}

export default Error

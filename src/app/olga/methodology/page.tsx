'use client'

export default function Methodology() {
  return (
    <iframe
      src="/olga/coaching-twin.html"
      title="How Olga’s twin learns"
      // Focus the presentation so its keyboard controls work without an extra click.
      onLoad={(e) => e.currentTarget.focus()}
      style={{ display: 'block', width: '100%', height: 'var(--fold, calc(100vh - 61px))', border: 0 }}
    />
  )
}

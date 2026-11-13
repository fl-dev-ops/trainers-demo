'use client'

export default function Methodology() {
  return (
    <iframe
      src="/tony-latimer/coaching-twin.html"
      title="How Tony’s twin learns"
      // Focus the presentation so its keyboard controls work without an extra click.
      onLoad={(e) => e.currentTarget.focus()}
      style={{ display: 'block', width: '100%', height: 'var(--fold, calc(100vh - 61px))', border: 0 }}
    />
  )
}

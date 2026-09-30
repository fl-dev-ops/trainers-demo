import { redirect } from 'next/navigation'

/** Mirrors the Vite catch-all route: any unknown path redirects home. */
export default function NotFound() {
  redirect('/')
}

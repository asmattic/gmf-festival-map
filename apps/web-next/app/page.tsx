import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>GMF Festival Map</h1>
      <p>
        Open the <Link href="/map">interactive map</Link>.
      </p>
    </main>
  );
}

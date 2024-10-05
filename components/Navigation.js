import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="sticky-nav">
      <div className="nav-content">
        <Link href="/">
          <a className="logo">Ootza</a>
        </Link>
        <div className="nav-links">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/top-advice">
            <a>Top Advice</a>
          </Link>
          <Link href="/latest-advice">
            <a>Latest Advice</a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .sticky-nav {
          position: sticky;
          top: 0;
          z-index: 10;
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 100%;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
          padding: 1rem;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 1rem;
        }
        .nav-links a {
          color: #333;
          text-decoration: none;
        }
        @media (max-width: 768px) {
          .nav-content {
            flex-direction: column;
            align-items: center;
          }
          .nav-links {
            margin-top: 1rem;
          }
        }
      `}</style>
    </nav>
  );
}
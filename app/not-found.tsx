/**
 * Root-level catch-all for unmatched routes.
 * Since all routes are under [locale], this should not be reached.
 * The middleware will handle redirection to /en or /ko.
 */
export default function RootNotFound() {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center px-4">
            <h1 className="text-6xl font-bold text-[#495F2B] mb-4">404</h1>
            <p className="text-2xl text-[#111B12] mb-8">Page not found</p>
            <p className="text-lg text-[#627F38] mb-8">
              The page you're looking for doesn't exist.
            </p>
            <a
              href="/en"
              className="inline-block px-6 py-3 bg-[#495F2B] text-white rounded-lg hover:bg-[#495F2B]/90 transition-colors">
              Back to home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-900 dark:bg-zinc-950 border-t border-zinc-800 dark:border-zinc-700 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Copyright and email */}
          <div className="text-center md:text-left">
            <p className="text-zinc-400 dark:text-zinc-500 text-base mb-3">
              Copyright © 2026 Ott Allik
            </p>
            <a
              href="mailto:ottallik.oa@gmail.com"
              className="text-zinc-300 dark:text-zinc-300 hover:text-white dark:hover:text-white text-lg transition-colors font-medium flex items-center gap-2 justify-center md:justify-start"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              ottallik.oa@gmail.com
            </a>
          </div>

          {/* Middle - Social links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/ott-allik-45a48a319/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 dark:text-zinc-300 hover:text-white dark:hover:text-white transition-colors hover:scale-110 transform"
              aria-label="LinkedIn profile"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
          </div>

          {/* Right side - Face image */}
          <div className="flex items-center justify-center">
            <img
              src="/face.png"
              alt="Ott Allik"
              className="w-14 h-14 rounded-full object-cover border-2 border-zinc-700 dark:border-zinc-600"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

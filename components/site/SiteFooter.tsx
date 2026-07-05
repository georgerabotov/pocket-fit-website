import Link from "next/link";

const APP_STORE = "https://apps.apple.com/gb/app/pocket-squats/id6748518785";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.pocketsquats&hl=en_GB";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 px-5 py-14">
      <div className="mx-auto grid w-full max-w-5xl gap-10 sm:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="text-lg font-extrabold tracking-tight text-stone-900">
            Pocket Fit
          </p>
          <p className="mt-2 max-w-xs text-sm text-stone-500">
            Train smarter with a workout plan that adapts to your life.
          </p>
          <div className="mt-4 flex gap-3">
            <a href={APP_STORE} className="text-sm font-semibold text-violet-700 hover:underline">
              App Store
            </a>
            <a href={PLAY_STORE} className="text-sm font-semibold text-violet-700 hover:underline">
              Google Play
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Pages
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/" className="text-stone-600 hover:text-stone-900">Home</Link></li>
            <li><Link href="/blog" className="text-stone-600 hover:text-stone-900">Blog</Link></li>
            <li><Link href="/pricing" className="text-stone-600 hover:text-stone-900">Pricing</Link></li>
            <li><Link href="/faq" className="text-stone-600 hover:text-stone-900">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Legal
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/legal/privacy-policy" className="text-stone-600 hover:text-stone-900">Privacy Policy</Link></li>
            <li><Link href="/legal/terms" className="text-stone-600 hover:text-stone-900">Terms and Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Support
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="mailto:general@pocket-fit.app" className="text-stone-600 hover:text-stone-900">
                general@pocket-fit.app
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-5xl border-t border-stone-200 pt-6 text-xs text-stone-400">
        © {new Date().getFullYear()} Pocket Fit. All rights reserved.
      </div>
    </footer>
  );
}

import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Fledge</h2>
            <p className="text-sm">Your ultimate travel companion for booking flights, hotels, and vacation packages.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/flights" className="hover:text-secondary">Flights</Link></li>
              <li><Link href="/hotels" className="hover:text-secondary">Hotels</Link></li>
              <li><Link href="/packages" className="hover:text-secondary">Vacation Packages</Link></li>
              <li><Link href="/about" className="hover:text-secondary">About Us</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-secondary">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-secondary">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-secondary">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-secondary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest travel deals and updates.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-r-md hover:bg-secondary/90 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/10 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Fledge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
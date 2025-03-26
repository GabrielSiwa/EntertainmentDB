import Link from "next/link"
import { Film, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-muted py-8 bg-slate-200 border-t-2"   >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Film className="h-6 w-6 text-primary"/>
                  <span className="ml-2 text-lg font-bold">Internet Movies Rental</span>
                </div>
                <p className="text-muted-foreground">Your one-stop destination for all your movie rental needs.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/movies" className="text-muted-foreground hover:text-primary">
                      Movies
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-muted-foreground hover:text-primary">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-muted-foreground hover:text-primary">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-muted-foreground">123 Movie Street, Calgary, AB</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-muted-foreground">(403) 123-4567</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-muted-foreground">contact@imr.com</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Internet Movies Rental. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )
}

export default Footer
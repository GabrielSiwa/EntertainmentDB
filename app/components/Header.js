'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movie" },
    { name: "Sign Up", path: "/signup" },
    { name: "Login", path: "/login" },
]

const Header = () => {
    const pathname = usePathname();
  return (
    <div>
        <ul className="bg-slate-200 flex gap-5 p-10 border-b-2">
            {navItems.map((item,index) => (
                <li key={index}>
                    <Link href={item.path} className={pathname ===item.path ? "text-blue-500 font-bold " :  ""}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Header
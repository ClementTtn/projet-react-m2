import Link from 'next/link'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import './globals.css'

const Layout = ({ children }) => {
    return (
        <html>
        <head>
            <title>GitHub Inspector V2</title>
        </head>
        <body className="p-2">
            <header>
                <Link href="/" className="text-2xl font-bold text-black-alpha-90 no-underline">GitHub Explorer</Link>
            </header>
            <main>{children}</main>
            <footer></footer>
        </body>
        </html>
    )
}

export default Layout

import Link from 'next/link';

const Layout = ({ children }) => {
    return (
        <html>
        <head>
            <title>GitHub Inspector V2</title>
        </head>
        <body>
            <header>
                <Link href="/" className="text-3xl font-bold">GitHub Explorer</Link>
            </header>
            <main>{children}</main>
            <footer></footer>
        </body>
        </html>
    )
}

export default Layout

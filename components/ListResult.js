import SearchBar from "./SearchBar"
import Link from 'next/link'

const ListResult = async ({ searchParams }) => {
    const { search } = await searchParams
    const { typeSource } = await searchParams
    let results = []
    let userResults = []
    let repoResults = []

    try {
        if (search) {
            let apiUrl = ''
            if (typeSource === 'users') {
                apiUrl = 'https://api.github.com/search/users?q=' + search
            } else if (typeSource === 'repositories') {
                apiUrl = 'https://api.github.com/search/repositories?q=' + search
            } else {
                const userResponse = await fetch('https://api.github.com/search/users?q=' + search, {
                    headers: {
                        'Authorization': `${process.env.GITHUB_TOKEN}`
                    }
                })
                const repoResponse = await fetch('https://api.github.com/search/repositories?q=' + search, {
                    headers: {
                        'Authorization': `${process.env.GITHUB_TOKEN}`
                    }
                })
                const userData = await userResponse.json()
                const repoData = await repoResponse.json()
                userResults = userData.items
                repoResults = repoData.items
            }

            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `${process.env.GITHUB_TOKEN}`
                }
            })
            const data = await response.json()
            results = data.items
        }
    } catch (error) {}

    return (
        <div>
            <SearchBar />
            {typeSource !== undefined && (
                <div>
                    <h1>Résultats de la recherche</h1>
                    {typeSource === 'users' ? (
                        <ul>
                            {results.map((result) => (
                                <li key={result.id}>
                                    <Link href={`/users/${result.login}`}>
                                        {result.login}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : typeSource === 'repositories' ? (
                        <ul>
                            {results.map((result) => (
                                <li key={result.id}>
                                    <Link href={`/repositories/${result.full_name}`}>
                                        {result.full_name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>
                            <h2>Utilisateurs</h2>
                            <ul>
                                {userResults.map((user) => (
                                    <li key={user.id}>
                                        <Link href={`/users/${user.login}`}>
                                            {user.login}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <h2>Dépôts</h2>
                            <ul>
                                {repoResults.map((repo) => (
                                    <li key={repo.id}>
                                        <Link href={`/repositories/${repo.full_name}`}>
                                            {repo.full_name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ListResult

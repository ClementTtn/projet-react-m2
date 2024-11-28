const RepositoryPage = async ({ params }) => {
    const { owner, name } = params

    const fetchRepository = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
        headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
        }
    })
    const repository = await fetchRepository.json()

    const fetchCommits = await fetch(`https://api.github.com/repos/${owner}/${name}/commits`, {
        headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
        }
    })
    const commits = await fetchCommits.json()

    if (!repository) {
        return <div>Chargement...</div>
    }

    return (
        <div>
            <h1>Repository: {repository.name}</h1>
            <p>Description: {repository.description || 'Pas de description'}</p>
            <p>Langage principal: {repository.language || 'Non spécifié'}</p>
            <p>Nombre d'étoiles: {repository.stargazers_count}</p>
            <p>Nombre de forks: {repository.forks_count}</p>
            <p>Dernière mise à jour: {new Date(repository.updated_at).toLocaleDateString()}</p>
            <a href={repository.html_url} target="_blank" rel="noopener noreferrer">Voir sur GitHub</a>

            <h2>Commits</h2>
            <ul>
                {commits.map(commit => (
                    <li key={commit.sha}>
                        <p><strong>{commit.commit.message}</strong> par {commit.commit.author.name}</p>
                        <p>Date: {new Date(commit.commit.author.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RepositoryPage

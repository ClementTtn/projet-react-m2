import { formatDistanceToNow } from 'date-fns'
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
    console.log(commits)

    if (!repository) {
        return <div>Chargement...</div>
    }

    return (
        <div className="mt-4">
            <p className="text-2xl font-bold">{repository.name}</p>
            <p>{repository.description || 'Pas de description'}</p>
            <p className="text-1xl font-bold mt-6">Commits</p>
            <ul>
                {commits.map(commit => (
                    <li key={commit.sha}>
                        <a href={commit.html_url} target="_blank">
                            <p>{commit.commit.author.name} | {formatDistanceToNow(commit.commit.author.date, {addSuffix: true})} | {commit.commit.message}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RepositoryPage

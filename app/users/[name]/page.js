import Link from 'next/link'

const UserProfile = async ({ params }) => {
    const { name } = params

    const fetchUser = await fetch(`https://api.github.com/users/${name}`, {
        headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
        }
    })
    const user = await fetchUser.json()

    const fetchRepository = await fetch(`https://api.github.com/users/${name}/repos`, {
        headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
        }
    })
    const repos = await fetchRepository.json()
    
    if (!user) {
        return <div>Chargement...</div>
    }

    return (
        <div>
            <img src={user.avatar_url} alt={`${user.login}`} width={100} height={100} />
            <p>{user.name}</p>
            <p>{user.login}</p>
            <p>{user.bio}</p>
            <p>{user.location}</p>
            <p>Joined about {user.created_at}</p>

            <h2>Repositories</h2>
            <ul>
                {repos.map(repo => (
                    <li key={repo.id}>
                        <Link href={`/repositories/${name}/${repo.name}`}>
                            <p>{repo.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserProfile
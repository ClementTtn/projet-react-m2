import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import {Avatar} from "primereact/avatar"

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
        <div className="mt-4">
            <div className="flex gap-4">
                <Avatar image={user.avatar_url} size="xlarge" shape="circle" />
                <div>
                    <p>{user.name}</p>
                    <p className="text-500 text-sm">{user.login}</p>
                </div>
            </div>
            <p>{user.bio}</p>
            <p>{user.location}</p>
            <p>Joined about {formatDistanceToNow(user.created_at, {addSuffix: true})}</p>

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
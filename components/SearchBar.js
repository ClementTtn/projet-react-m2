"use client"

import { useRouter } from 'next/navigation'

const SearchBar = () => {
    const router = useRouter()
    const onSubmit = (event) => {
        event.preventDefault()
        const form = new FormData(event.target)
        router.push(`?search=${encodeURIComponent(form.get('search') ?? '')}&typeSource=${encodeURIComponent(form.get('typeSource') ?? '')}`)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" id="search" name="search" />
                <button type="submit">
                    Search
                </button>
                <button type="button" onClick={() => { router.push('/') }}>
                    Reset
                </button>
                <div>
                    <input
                        type="radio"
                        id="all"
                        name="typeSource"
                        value="all"
                        defaultChecked
                    />
                    <label>All</label>
                    <input
                        type="radio"
                        id="repositories"
                        name="typeSource"
                        value="repositories"
                    />
                    <label>Repositories</label>
                    <input
                        type="radio"
                        id="users"
                        name="typeSource"
                        value="users"
                    />
                    <label>Users</label>
                </div>
            </form>
        </div>
    )
}

export default SearchBar
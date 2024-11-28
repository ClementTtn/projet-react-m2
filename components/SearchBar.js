"use client"

import { useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { InputText } from "primereact/inputtext"

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
                <InputText type="text" id="search" name="search" className="p-inputtext-sm" />
                <Button label="Search" size="small" type="submit" className="mx-2" />
                <Button label="Reset" size="small" severity="secondary" type="button" onClick={() => { router.push('/') }} />
                <div className="mt-2">
                    <input
                        type="radio"
                        id="all"
                        name="typeSource"
                        value="all"
                        defaultChecked
                    />
                    <label className="mx-1">All</label>
                    <input
                        type="radio"
                        id="repositories"
                        name="typeSource"
                        value="repositories"
                    />
                    <label className="mx-1">Repositories</label>
                    <input
                        type="radio"
                        id="users"
                        name="typeSource"
                        value="users"
                    />
                    <label className="mx-1">Users</label>
                </div>
            </form>
        </div>
    )
}

export default SearchBar
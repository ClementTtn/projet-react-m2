import React from 'react'
import ListResult from "@/components/ListResult"

const Home = async ({ searchParams }) => {
  return (
      <div className="mt-2">
          <ListResult searchParams={ searchParams } />
      </div>
  )
}

export default Home

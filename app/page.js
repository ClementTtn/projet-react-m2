import React from 'react'
import ListResult from "@/components/ListResult"

const Home = async ({ searchParams }) => {
  return (
      <div>
          <ListResult searchParams={ searchParams } />
      </div>
  )
}

export default Home

import Footer from 'components/footer'
import Header from 'components/header'
import React from 'react'

const HomeLayout = ({ children }) => {
  return (
    <div className='relative bg-primary'>
    <Header />
    {children}
    <Footer />
    </div>
  )
}

export default HomeLayout
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div>
      <div>
        <h2>Welcome</h2>
        <form>

        </form>
        <div>
          <p>Already have an account?</p>
          <Link to='/signin'></Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
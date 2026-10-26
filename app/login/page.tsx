import React from 'react'

const page = () => {
  return (
    <form className='flex flex-col justify-center items-center'>
      <div>
        <label htmlFor="email"> Email:</label>
        <input type="text" id="email" name="email" />
      </div>
        <div>
        <label htmlFor="password"> Password:</label>
        <input type="text" id="password" name="password" />
      </div>
      <button type="submit">Log in</button>
    </form>
  )
}

export default page

import React from 'react'

const Reply = () => {
  return (
    <div className='w-[100%] flex flex-col'>
      <div className='w-[100%] flex justify-between items-center h-[40px] '>
         <img className='w-[40px] h-[40px] border-1px rounded-full' src="" alt="" />
         <div className='w-[410px] flex justify-between items-center h-[100%] '>
          <div className='w-[320px] flex flex-col justify-center items-start h-[100%] '>
          <h1 className='dark:text-gray-400 text-gray-800  text-[16px]'>Onyeka Gerald Ujowundu</h1>
          <h1 className='w-[100%] text-gray-500 -mt-1 md:-mt-2 tracking-tight dark:text-gray-300 text-[12px] '>I love to code and play games</h1>
            
          </div>
          <div className='w-[60px] h-[100%] flex justify-center'>
          <h1 className='text-gray-400 tracking-wide text-[15px]'>now</h1>
          <h1 className='text-gray-400 flex justify-center text-[15px] items-end tracking-wide  -ml-2  w-[40px] h-[18px]'>...</h1>
          </div>
         </div>
      </div>
      <div className='w-[410px] rounded-md md:ml-[66px] flex text-[14px] dark:text-gray-300  mt-1 p-2 text-gray-500  border-1px'>
      Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien. Nam consectetuer. Sed aliquam, nunc eget euismod ullamcorper, lectus nunc ullamcorper orci, fermentum bibendum enim nibh eget ipsum. Nulla lacinia porttitor diam. Sed diam ligula, vulputate at, ornare non, posuere vel, arcu. Curabitur venenatis, nisl in bibendum commodo, sapien justo cursus urna, eget elementum purus nulla et sapien. In ac felis quis tortor malesuada pretium. Maecenas ultricies, lacus ut convallis dapibus, libero neque scelerisque odio, id facilisis ligula eros at quam. Etiam vestibulum metus eget tellus. Phasellus suscipit, sapien aliquam aliquet convallis, libero pede aliquam nisi, vitae feugiat risus neque eu lectus.
      </div>
    </div>
  )
}

export default Reply
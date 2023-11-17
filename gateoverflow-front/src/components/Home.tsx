import React from 'react'
import {FcGenealogy} from 'react-icons/fc'
import {BiMath} from 'react-icons/bi';
import {BsCodeSlash} from 'react-icons/bs';
import {MdOutlineSettingsSystemDaydream} from 'react-icons/md';
import {TbLogicAnd,TbManualGearbox} from 'react-icons/tb'
import {AiOutlineApartment,AiFillSetting} from 'react-icons/ai'
const Home = () => {
  return (
    <div className='my-10 xs:my-5'>
      <div className='flex flex-col items-center px-6 mx-auto lg:py-0'>
        <div className='w-[800px] '>
          {/* title for subject */}
          <div className='text-4xl font-medium font-sans text-gray-500 text-center'>
            GateOverFlow Subject
          </div>

          {/* subjects */}
          <div className='p-2 grid grid-cols-2 gap-5 mt-5'>
            <div className='bg-[#36393F] p-5 rounded-md text-white flex items-center hover:bg-purple-700 duration-500'>
              <div className='text-4xl'><FcGenealogy/></div>
              <div className='text-center ml-5'>General Aptitude</div>
            </div>
            <div className='bg-[#36393F] p-5 rounded-md text-white flex items-center hover:bg-purple-700 duration-500'>
              <div className='text-4xl'><BiMath/></div>
              <div className='text-center ml-5'>Engineering Mathematics</div>
            </div>
            <div className='bg-[#36393F] p-5 rounded-md text-white flex items-center hover:bg-purple-700 duration-500'>
              <div className='text-4xl'><TbLogicAnd/></div>
              <div className='text-center ml-5'>Digital Logic</div>
            </div>
            <div className='bg-[#36393F] p-5 rounded-md text-white flex items-center hover:bg-purple-700 duration-500'>
              <div className='text-4xl'><BsCodeSlash/></div>
              <div className='text-center ml-5'>Programming and DS</div>
            </div>
            <div className='bg-[#36393F] p-5 rounded-md text-white flex items-center hover:bg-purple-700 duration-500'>
              <div className='text-4xl'><TbManualGearbox/></div>
              <div className='text-center ml-5'>Algorithms</div>
            </div>
            <div className='bg-[#36393F] p-5 rounded-md text-white flex items-center hover:bg-purple-700 duration-500'>
              <div className='text-4xl'><AiOutlineApartment/></div>
              <div className='text-center ml-5'>Theory of Computation</div>
            </div>
            <div className='bg-[#36393F] p-5 rounded-md text-white flex items-center hover:bg-purple-700 duration-500'>
              <div className='text-4xl'><AiFillSetting/></div>
              <div className='text-center ml-5'>Compiler Design</div>
            </div>
            <div className='bg-[#36393F] p-5 rounded-md text-white flex items-center hover:bg-purple-700 duration-500'>
              <div className='text-4xl'><MdOutlineSettingsSystemDaydream/></div>
              <div className='text-center ml-5'>Operating System</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
import React from 'react';
import { RiInstagramLine, RiLinkedinLine, RiTwitterLine } from 'react-icons/ri';
import SubHeader from 'components/typography/sub_header';
import PrimaryButton from 'components/button/primary';

const OurTeam = () => {
  const members = [
    {
      name: 'Mikey Chocho',
      image: '/assets/svgs/default-user-square.svg',
      position: 'CEO',
      linkedin: '',
      twitter: '',
      instagram: '',
    },
    {
      name: 'Emmanuel Michael',
      image: '/assets/svgs/default-user-square.svg',
      position: 'Frontend Developer',
      linkedin: '',
      twitter: '',
      instagram: '',
    },
    {
      name: 'John Chocho',
      image: '/assets/svgs/default-user-square.svg',
      position: 'Backend Developer',
      linkedin: '',
      twitter: '',
      instagram: '',
    },
    {
      name: 'Doe John',
      image: '/assets/svgs/default-user-square.svg',
      position: 'CEO',
      linkedin: '',
      twitter: '',
      instagram: '',
    },
    {
      name: 'Sylph Anne',
      image: '/assets/svgs/default-user-square.svg',
      position: 'Frontend Developer',
      linkedin: '',
      twitter: '',
      instagram: '',
    },
    {
      name: 'Antonia Daniel',
      image: '/assets/svgs/default-user-square.svg',
      position: 'Backend Developer',
      linkedin: '',
      twitter: '',
      instagram: '',
    },
  ]

  return (
    <div className='flex flex-col items-start gap-[2rem] w-full py-[2rem] '>
      <SubHeader>Our Team</SubHeader>
      <p className='text-[1.15rem] text-gray-500 font-[600] text-start'>Our team of dedicated professionals brings a wealth of knowledge, creativity, and passion to every project!</p>
      
      <div className='grid grid-cols-1 xmd:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-[2rem] w-full h-max mt-[1rem] '>
        {members.map((member, index) => (
          <div 
            key={index}
            className='group flex flex-col items-center gap-[1rem] w-full pt-[3rem] pb-[1.5rem] rounded-[12px] shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] ease-250'
          >
            <img 
              src={member.image}
              alt='Member'
              className='w-[6rem] min-w-[6rem] h-[6rem] rounded-[16rem] object-cover'
            />
            <div>
              <h3 className='text-[1rem] text-black'>{member.name}</h3>
              <p className='text-[0.75rem] text-gray-500 underline'>{member.position}</p>
            </div>
            <div className='flex gap-[1rem] opacity-0 group-hover:opacity-[1]'>
              <a href={member.linkedin} target='_blank' className=' hover:text-gray-800 scale-[1.05]' rel='noreferrer'>
                <RiLinkedinLine className='text-gray-600 translate-y-[1rem] group-hover:translate-y-0 ease-250 ' />
              </a>
              <a href={member.twitter} target='_blank' className=' hover:text-gray-800 scale-[1.05]' rel='noreferrer'>
                <RiTwitterLine className='text-gray-600 translate-y-[1rem] group-hover:translate-y-0 ease-300 ' />
              </a>
              <a href={member.instagram} target='_blank' className=' hover:text-gray-800 scale-[1.05]' rel='noreferrer'>
                <RiInstagramLine className='text-gray-600 translate-y-[1rem] group-hover:translate-y-0 ease-350 ' />
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center w-full'>
        <PrimaryButton onClick={() => { window.location.href = '/events'; }}>Show all</PrimaryButton>
      </div>
    </div>
  )
}

export default OurTeam
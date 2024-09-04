import HomeLayout from 'components/layout';
import PrimaryLink from 'components/link/primary';

const PageNotFound = () => {
  return (
    <HomeLayout>
      <section className="flex items-center justify-cenetr w-full h-full bg-primary py-[6rem]">
        <div className="w-full h-full">
          <div className="flex flex-col gap-[1rem] text-center">
            <div 
              className="h-[25rem] bg-center bg-no-repeat "
              style={{
                backgroundImage: 'url(/assets/gifs/caveman_404.gif)',
              }}
            >
              <h1 className="text-center font-dance text-[6rem] font-[800] mt-[-4rem] ">404</h1>        
            </div>
            
            <div className="flex flex-col items-center text-center gap-[1rem] w-max mx-auto ">
              <h3 className="text-secondary text-[1.25rem] ">Looks like you&apos;re lost</h3>
              
              <p className='text-gray-400 text-[0.75rem]'>You must have taking a wrong turn somewhere!</p>
              
              <PrimaryLink to="/">Back to Home</PrimaryLink>
            </div>
          </div>
        </div>
      </section>
    </HomeLayout>
  )
}

export default PageNotFound
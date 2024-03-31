// import menu from '../assets/menu.png'
import search from '../assets/search.svg'
import heart  from '../assets/heart.svg'
// import location  from '../assets/location.png'
import user  from '../assets/user.svg'

const Navbar = () => {
    return (
        <nav className='px-10 py-2 '>
            <div className=' flex items-center justify-between  '>
                <div>
                    <h1 className=' text-logo font-bold text-xl'>BookUsNow</h1>

                </div>
                <div className='flex gap-x-2 items-center sm:hidden'>
                    <img className=' w-6 h-6' src={search} alt='' />
                    <img className=' w-6 h-6 text-black' src={heart} alt='' />
                    <img className=' w-6 h-6' src={user} alt='' />
                </div>
                <div className=' gap-2  md:flex hidden'>
                    <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2   justify-center text-sm  text-white rounded-sm px-6 gap-4  bg-black focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                        Categories
                    </button>
                    <div className="">
                        <input type="text" className=" py-2 w-50 pr-8 pl-5 rounded z-0 outline-none  border border-black " placeholder="DJL Phantom" />
                        <div className=" top-4 right-3">
                            <i className="fa fa-search text-black z-20 hover:text-gray-500" />
                        </div>
                    </div>
                </div>
                <div className=' md:flex gap-x-5 items-center hidden '>
                    <div>
                        <p>favourites</p>
                    </div>
                    <button className=' px-4 py-2 border border-gray-400 rounded-sm mr-4'>Sign In</button>
                </div>
            </div>
            <div className=' flex md:flex-row flex-col pt-3  justify-between '>
                <div>
                    <p> Mumbai, India </p>
                </div>
                <ul className='flex no-scrollbar overflow-x-scroll  pt-3 md:pt-0   gap-x-5 justify-start'>
                    <li>Live Shows</li>
                    <li>Stream</li>
                    <li>Movies</li>
                    <li>Plays</li>
                    <li>Events</li>
                    <li>Sports</li>
                    <li>Activities</li>
                </ul>
                <div className=' w-[10%]'>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

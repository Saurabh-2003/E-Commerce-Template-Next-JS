import { Facebook, Instagram, Phone, Twitter } from 'lucide-react'
const NavBarTop = () => {
  return (
    <div className='max-md:hidden px-4 py-3 flex items-center justify-between bg-zinc-900 text-sm text-white'>
        <div className='flex gap-2 w-40 items-center'>
            <Phone size={16}/>
            <span className='text-sm font-medium'>+91-8986756675</span>
        </div>
        <p>First time here ? Try our special box now.</p>
        <div className='flex gap-2 w-40 justify-end'>
            <Twitter size={20}/>
            <Instagram size={20} />
            <Facebook size={20} />
        </div>
    </div>
  )
}

export default NavBarTop

import { LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from './auth/authServices';

function Corosel() {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (
        <div>
            {user ? (
                <div className='flex items-center gap-2'>
                    <User size={28} className='border-0 h-8 w-8 rounded-full' />
                    <p>
                        {user?.user_metadata.displayName ||
                            user?.user_metadata.full_name ||
                            user?.email}
                    </p>
                    <LogOut size={28} className='cursor-pointer' onClick={() => {
                        handleLogout();
                        navigate('/auth');
                    }} />
                </div>
            ) :
                (
                    <button className="bg-[#756348] border-2 border-[#D6B98C]/25 h-11 w-20 rounded-lg text-sm text-[#ffffff] hover:text-[#D6B98C] transition-all duration-300"
                        onClick={() => {
                            navigate('/auth');
                        }}
                    >
                        Login
                    </button>
                )
            }

        </div>
    )
}

export default Corosel

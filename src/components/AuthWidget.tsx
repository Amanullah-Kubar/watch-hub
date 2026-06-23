// AuthWidget.tsx (renamed from Corosel.tsx)
import { useNavigate } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react';

function AuthWidget() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      <SignedOut>
        <button
          onClick={() => navigate('/auth')}
          className="h-11 rounded-full border border-[#D6B98C]/30 bg-[linear-gradient(145deg,#2A211A,#16120F)] px-5 text-sm font-medium text-[#F8F5F0] transition-all duration-300 hover:border-[#D6B98C]/60 hover:text-[#D6B98C]"
        >
          Login
        </button>
      </SignedOut>

      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox:
                'w-10 h-10 rounded-full ring-2 ring-[#D6B98C]/30 ring-offset-2 ring-offset-[#15120F]',
              userButtonPopoverCard:
                'bg-[#1A1714] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.55)]',
              userButtonPopoverActionButton: 'text-[#F8F5F0] hover:bg-white/5',
              userButtonPopoverActionButtonText: 'text-[#F8F5F0]',
              userButtonPopoverActionButtonIcon: 'text-[#D6B98C]',
              userButtonPopoverFooter: 'hidden',
              userPreviewMainIdentifier: 'text-[#F8F5F0]',
              userPreviewSecondaryIdentifier: 'text-[#F8F5F0]/60',
            },
          }}
        />
      </SignedIn>
    </div>
  );
}

export default AuthWidget;
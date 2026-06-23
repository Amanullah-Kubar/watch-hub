import { SignIn } from "@clerk/clerk-react";

function ClerkAuthPage() {
  return (
    <div className="flex h-screen items-center justify-center align-middle bg-black">
      <SignIn />
    </div>
  )
}

export default ClerkAuthPage

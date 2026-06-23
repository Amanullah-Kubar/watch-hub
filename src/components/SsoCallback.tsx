// SsoCallback.tsx
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

function SsoCallback() {
    return <AuthenticateWithRedirectCallback />;
}

export default SsoCallback;
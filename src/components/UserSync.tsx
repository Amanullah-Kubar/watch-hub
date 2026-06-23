import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { saveProfile } from "./auth/authServices";

export default function UserSync() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    saveProfile(
      user.id,
      user.primaryEmailAddress?.emailAddress ?? "",
      (user.unsafeMetadata?.phone as string) ?? "",
      user.fullName ?? ""
    ).catch(console.error);
  }, [user, isLoaded]);

  return null;
}
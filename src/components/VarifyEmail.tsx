import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import { saveProfile } from "./auth/authServices";

export default function VerifyEmail() {
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const { signUp, setActive } = useSignUp();

  const verifyEmail = async () => {
    if (!signUp) return;

    try {
      const result =
        await signUp.attemptEmailAddressVerification({
          code,
        });

      if (result.status === "complete") {
        await setActive?.({
          session: result.createdSessionId,
        });
        console.log({
          userId: result.createdUserId,
          email: signUp.emailAddress,
          phone: signUp.unsafeMetadata?.phoneNumber,
          fullName: signUp.unsafeMetadata?.fullName,
        });
        await saveProfile(
          result.createdUserId!,
          signUp.emailAddress!,
          (signUp.unsafeMetadata?.phoneNum as string) ?? "",
          (signUp.unsafeMetadata?.fullName as string) ?? ""
        );


        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-[#131212] p-8">
        <h1 className="text-2xl text-white mb-6">
          Verify Email
        </h1>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="w-full rounded-xl bg-[#1a1a1a] p-3 text-white"
        />

        <button
          onClick={verifyEmail}
          className="mt-4 w-full rounded-xl bg-[#D6B98C] p-3 text-black"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
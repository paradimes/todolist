import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

export default function LoginButtonAuth0() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      className="h-fit hover:bg-blue-500 transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300"
      onClick={() => loginWithRedirect()}
    >
      Sign in
    </Button>
  );
}

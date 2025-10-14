import { signOut, useSession } from "@/lib/authClient";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { Spinner } from "../ui/spinner";

export default function UserButton() {
    const { data: session, isPending } = useSession();

    if (isPending) return <Spinner />

    return (
        <>
            {session ? (
                <Avatar className="w-10 h-10 ">
                    <AvatarImage src={session.user.image || ""} alt={session.user.name} />
                    <AvatarFallback>
                        {session.user.name ? session.user.name[0].toUpperCase() : "?"}
                    </AvatarFallback>
                </Avatar>
            ) : (
                <Link to="/login">
                    <Button className="cursor-pointer px-6 py-2 text-sm font-semibold rounded-md hover:scale-[95%] transition-transform">
                        Log In
                    </Button>
                </Link>
            )}
        </>
    );
}

import { Link } from "@tanstack/react-router";

export default ({ isLogo = true, isText = true }: { isLogo?: boolean, isText?: boolean }) => {
    return (
        <Link to="/" className="flex items-center gap-3 text-2xl font-extrabold hover:opacity-90 transition-opacity duration-200">
            {isLogo && <img className="w-10 h-10" src="/logo.svg" alt="KAUBuddy Logo" />}
            {isText && <span>KAUBuddy</span>}
        </Link>
    );
};

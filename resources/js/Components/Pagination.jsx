import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <div className="mt-6">
            <nav
                className="isolate flex -space-x-px rounded-md shadow-sm justify-center items-center"
                aria-label="Pagination"
            >
                {links.map((link) => (
                    <Link
                        preserveScroll
                        className={"inline-block py-2 px-3 rounded-lg text-xs " + (link.active ? "!bg-gray-950 " : "") + (!link.url ? "!text-gray-500 cursor-not-allowed " : "hover:text-gray-950 ")}
                        key={link.label}
                        href={link.url || ""}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    >
                    </Link>
                ))}
            </nav>
        </div>
    );
}
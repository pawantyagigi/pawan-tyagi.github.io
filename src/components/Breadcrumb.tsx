import Link from "next/link";
import { useRouter } from "next/router";

interface BreadcrumbProps {
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ className }) => {
  const router = useRouter();

  // Strip hash + query so SSR HTML matches the client (hashes cause hydration errors)
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const pathSegments = cleanPath.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = decodeURIComponent(segment).replace(/-/g, " ");

    const slugMapping: Record<string, string> = {
      blogs: "blogs",
      categories: "categories",
      contact: "contact",
      about: "about",
      portfolio: "portfolio",
      privacy: "privacy",
    };

    return {
      path,
      label: slugMapping[segment.toLowerCase()] || label,
    };
  });

  return (
    <div className={`breadcrumb ${className || ""}`}>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb-item-list">
            <li className="breadcrumb-item">
              <Link href="/" aria-label="Home">
                home
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li
                  key={crumb.path}
                  className={`breadcrumb-item${isLast ? " active" : ""}`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {isLast ? (
                    crumb.label
                  ) : (
                    <Link href={crumb.path} aria-label={crumb.label}>
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;

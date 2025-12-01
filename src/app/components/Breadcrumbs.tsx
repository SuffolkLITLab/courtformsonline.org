import Link from 'next/link';
import styles from '../css/Breadcrumbs.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  large?: boolean;
}

const Breadcrumbs = ({ items, large = false }: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={
        styles.Breadcrumbs + (large ? ' ' + styles.BreadcrumbsLarge : '')
      }
    >
      <ol
        className={
          styles.BreadcrumbList +
          (large ? ' ' + styles.BreadcrumbListLarge : '')
        }
      >
        {items.map((item, index) => (
          <li
            key={index}
            className={
              styles.BreadcrumbItem +
              (large ? ' ' + styles.BreadcrumbItemLarge : '')
            }
          >
            {index > 0 && (
              <span
                className={
                  styles.Separator + (large ? ' ' + styles.SeparatorLarge : '')
                }
                aria-hidden="true"
              >
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className={
                  styles.BreadcrumbLink +
                  (large ? ' ' + styles.BreadcrumbLinkLarge : '')
                }
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  styles.BreadcrumbCurrent +
                  (large ? ' ' + styles.BreadcrumbCurrentLarge : '')
                }
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

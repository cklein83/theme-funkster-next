
export default function pageLink({ children, cssClass, pageLink}) {
    return <a className={cssClass} href={pageLink.href} data-nav-section={pageLink.section}>{children}</a>
}
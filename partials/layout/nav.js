import * as api from '../../lib/api'
import { Link as ScrollLink} from 'react-scroll'
import Link from 'next/link'

import LanguageSelector from '../../components/lang-selector'


export async function getMenu(preview, locale) {
    const fields = `
    id
    name
    parent {
      ... on MenuItem {
        id
      }
    }  
    `
    const data = (await api.getDataList(preview, "menuItem", fields, locale, "index_ASC")) ?? []
    return data
}
    

export default function Nav({ data, modules, locale, sectionated = true }) {
    return (
        <>
            <nav id="main-nav" className="navbar navbar-dark navbar-expand-md fixed-top bg-header">
                <div className="container-fluid bg-header">
                    <Link className="navbar-brand external" href="/#home">
                        <img src={data.site.brandIcon.url} className="brand-icon" width="36" height="36" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="toggle">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                            {data.menu.filter(menuItem => menuItem.id === "home" || menuItem.id === "about" || modules[menuItem.id]).map(menuItem =>       
                            /*
                            // HREF needs to be set!!!
                            <NavItem id={menuItem.id} href={"#" + menuItem.id} text={menuItem.name} ref={createRef()}  /> 
                            */
                            <li key={menuItem.id} className="nav-item">
                                {sectionated ?
                                <ScrollLink to={menuItem.id} className={"nav-link"} spy={true} offset={-55}>
                                    {menuItem.name}
                                </ScrollLink>
                                :
                                <Link href={ "/#" + menuItem.id }>
                                    <a className="nav-link external">{menuItem.name}</a>
                                </Link>
                                }
                            </li>                    
                            )}
                        </ul>

                        {modules.multilang ?<LanguageSelector locale={locale} /> : <></>}

                    </div>
                </div>
            </nav>
      </>         
    );
}

/**
 * https://typeofnan.dev/an-easy-way-to-build-a-tree-with-object-references/
 */
function menuTree(menu) {
    const idMapping = menu.reduce((acc, el, i) => {
        acc[el.id] = i;
        return acc;
    }, {});

    let root = [];
    menu.forEach(el => {
        // Handle the root element
        if (el.parent === null || idMapping[el.parent.id] === "undefined") {
            root.push(el);
        } else {
            //console.log(el?.id + " got parent " + el.parent.id)
            // Use our mapping to locate the parent element in our data array
            const parentEl = menu[idMapping[el.parent.id]];
            // Add our current el to its parent's `children` array
            parentEl.children = [...(parentEl.children || []), el];
        }
    });
    return root
}

function isActive(menuItem, modules) {   
    if (menuItem.children) {
        return menuItem.children.find(subMenuItem =>
            isActive(subMenuItem, modules)
        )
    } else {
        return modules[menuItem.id]
    }
}

function RenderTree({ menuItems, modules, locale, sectionated, recurse = false }) {
    return menuItems.map(menuItem => {
        if (menuItem.id === "home" || menuItem.id === "about" || isActive(menuItem, modules)) {
            if (menuItem.children) {
                return (
                <li key={menuItem.id} className={!recurse ? "nav-item dropdown" : "dropdown-submenu"}>
                    <Link href="#">
                        <a className={!recurse ? "nav-link dropdown-toggle" : "dropdown-item dropdown-toggle"}
                        data-bs-toggle="dropdown" 
                        aria-expanded="false">
                            {menuItem.name}
                        </a>
                    </Link>                
                    <ul className="dropdown-menu">           
                        <RenderTree menuItems={menuItem.children} modules={modules} locale={locale} sectionated={sectionated} recurse={true} />
                    </ul>
                </li>
                )             
            } else {
                return (
                    <li key={menuItem.id} className="nav-item">
                        {sectionated ?
                        <ScrollLink key={menuItem.id} to={menuItem.id} className={!recurse ? "nav-link" : "dropdown-item"} spy={true} offset={-25}>
                            {menuItem.name}
                        </ScrollLink>
                        :
                        <Link href={ "/#" + menuItem.id } passHref={true}>
                            <a className={!recurse ? "nav-link" : "dropdown-item"}>{menuItem.name}</a>
                        </Link>
                        }                              
                    </li>                                      
                )
            }
        } else {
            return (<></>)
        }
    })
}

export function MultiNav({ data, modules, locale, sectionated = true }) {

    let menu = JSON.parse(JSON.stringify(data.menu)); // IMPORTANT: because of the reference-character of the menuTree() method this is absolutely necessary

    return (
        <>
            <nav id="main-nav" className="navbar navbar-dark navbar-expand-sm fixed-top bg-header">

                <div className="container-fluid bg-header">
                    <Link className="navbar-brand external" href="/#home">
                        <img src={data.site.brandIcon.url} className="brand-icon" width="36" height="36" />
                    </Link>                    

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="toggle">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="nav navbar-nav ms-auto mb-2 mb-md-0">
                            <RenderTree menuItems={menuTree(menu)} modules={modules} locale={locale} sectionated={sectionated} />
                        </ul>
                    </div>

                    {modules.multilang ?<LanguageSelector locale={locale} /> : <></>}
                    
                </div>
            </nav>
      </>         
    );
}





var menu = [
  { id: 'home', name: 'Heim', parent: null },
  { id: 'about', name: 'Über', parent: null },
  { id: 'features', name: 'Features', parent: null },
  { id: 'gallery', name: 'Gallerie', parent: { id: 'media' } },
  { id: 'maps', name: 'Anfahrt', parent: null },
  { id: 'contact', name: 'Kontakt', parent: null },
  { id: 'skills', name: 'Leistungen', parent: null },
  { id: 'counter', name: 'Zähler', parent: null },
  { id: 'team', name: 'Team', parent: null },
  { id: 'faq', name: 'FAQ', parent: null },
  { id: 'login', name: 'Anmelden', parent: null },
  { id: 'slider', name: 'Slider', parent: { id: 'media' } },
  { id: 'pricing', name: 'Preise', parent: null },
  { id: 'forms', name: 'Formulare', parent: null },
  { id: 'countdown', name: 'Countdown', parent: null },
  { id: 'timeline', name: 'Zeitverlauf', parent: null },
  { id: 'filters', name: 'Filter', parent: null },
  { id: 'quotes', name: 'Zitate', parent: null },
  { id: 'feedback', name: 'Rezensionen', parent: null },
  { id: 'video', name: 'Videos', parent: { id: 'media' } },
  { id: 'autotype', name: 'Schreibmaschine', parent: null },
  { id: 'multinav', name: 'Multinav', parent: null },
  { id: 'consent', name: 'Cookie-Consent', parent: null },
  { id: 'blog', name: 'Blog', parent: null },
  { id: 'search', name: 'Suche', parent: null },
  { id: 'analytics', name: 'Statistik', parent: null },
  { id: 'logo', name: 'Logo', parent: { id: 'media' } },
  { id: 'textsupply', name: 'Texte', parent: null },
  { id: 'media', name: 'Medien', parent: null }
]

/*
var menu = [
  { id: 'home', name: 'Heim', parent: null },
  { id: 'about', name: 'Über', parent: null },
  { id: 'features', name: 'Features', parent: null },
  { id: 'gallery', name: 'Gallerie', parent: { id: 'media' } },
  { id: 'slider', name: 'Slider', parent: { id: 'media' } },
  { id: 'video', name: 'Videos', parent: { id: 'media' } },
  { id: 'logo', name: 'Logo', parent: { id: 'media' } },
  { id: 'textsupply', name: 'Texte', parent: null },
  { id: 'media', name: 'Medien', parent: null }
]
*/




    const idMapping = menu.reduce((acc, el, i) => {
        acc[el.id] = i;
        return acc;
    }, {});

    let root = [];
    menu.forEach(el => {
        // Handle the root element
        if (el.parent === null || !idMapping[el.parent.id]) {
            root.push(el);
        } else {
            // Use our mapping to locate the parent element in our data array
            const parentEl = menu[idMapping[el.parent.id]];
            // Add our current el to its parent's `children` array
            parentEl.children = [...(parentEl.children || []), el];
        }
    });

    console.log(root)


    function RenderTree(menuTree) {

		    let ret = menuTree.map(menuItem => {
		        if (menuItem.children) {
		            let recRet = RenderTree(menuItem.children);
		            return `
		            <li class="nav-item">
		                <a class="nav-lik dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
		                    ${menuItem.name}
		                </a>                
		                <ul class="dropdown-menu">
		                    <li class="nav-item dropdown">
		                        <a class="nav-link dropdown-item" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
		                            <ul class="dropdown-menu"> ${recRet}               
		                            </ul>
		                        </a>
		                    </li>
		                </ul>
		            </li>`;
		            
		        } else {

		            return `
		            <li class="x">
		                <a class="x">${menuItem.name}</a>
		            </li>  
		            `         
		        }
		    })

		    return ret
		}

		RenderTree(root)
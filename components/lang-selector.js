import Link from 'next/link'
import { useRouter } from 'next/router';

const LanguageSelector = ({ locale = "de-DE" }) => {
    const router = useRouter()

    function rewriteLangPath(path, lang) {
        console.log("P: " + path)
        let repl = lang == "de" ? "" : "en"
        return path.replace(/(\/(de|en))|\//, "/" + repl + "/");
    }

    return (
        <div className="multilang dropdown disable-autohide me-2">
            {locale == "de-DE" ?
            <div className="dropdown-toggle bg-header rounded-circle border border-1 border-light shadow-lg" 
            style={{ backgroundImage: 'url(/img/lang/de.svg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '36px', height: '36px' }}
            role="button" href="#" data-bs-toggle="dropdown" aria-expanded="true">
            </div>
            :
            <div className="dropdown-toggle bg-header rounded-circle border border-1 border-light shadow-lg" 
            style={{ backgroundImage: 'url(/img/lang/gb.svg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '36px', height: '36px' }}
            role="button" href="#" data-bs-toggle="dropdown" aria-expanded="true">
            </div>
            }

            <ul className="dropdown-menu">
                <li>
                    {/*
                    <Link href={router.pathname} locale="de-DE">
                        <a className="dropdown-item pb-1">
                            <img className="lang-img me-2" src="/img/lang/de.svg" width="16px" height="16px" alt="Deutsch" />
                            <span className="lang-text">
                                Deutsch
                            </span>                        
                        </a>
                    </Link>
                    */}
                    <Link href={rewriteLangPath(router.asPath, "de")}>
                        <a className="dropdown-item pb-1">
                            <img className="lang-img me-2" src="/img/lang/de.svg" width="16px" height="16px" alt="Deutsch" />
                            <span className="lang-text">
                                Deutsch
                            </span>                        
                        </a>
                    </Link>                    
                </li>                
                <li>
                    <Link href={rewriteLangPath(router.asPath, "en")}>
                        <a className="dropdown-item pb-1">
                            <img className="lang-img me-2" src="/img/lang/gb.svg" width="16px" height="16px" alt="English" />
                            <span className="lang-text">
                                Englisch
                            </span>                        
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default LanguageSelector
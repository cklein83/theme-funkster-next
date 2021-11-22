import { Element } from "react-scroll"


function Section({ children, id, classes = "" }) {
    return (
        <>
            <section id={id} className={id + (classes ? " " + classes : " section ")}>
                {children}
            </section>      
        </>
    )
}

export default Section
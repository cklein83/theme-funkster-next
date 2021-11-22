
const SectionHead = ({data}) => {
    return (
    <div className="section-head mb-5">
        <h2 className="section-title" data-section="about">{data.title}</h2>
        <hr className="section-line" />
        <h3 className="section-subtitle">{data.subtitle}. <span className="section-subtitle-second">{data.subtitle2}.</span></h3>
    </div>
    )
}

export default SectionHead
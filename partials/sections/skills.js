
import SectionHead from '../../components/section-head';

import * as api from '../../lib/api'

export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2

    skillsCollection(skip: 0, limit: 10) {
        items {
            ... on Skill {
                name
                value
            }
        }
    }    
    `
    const data = (await api.getData(preview, "skillsPage", fields, locale)) ?? []
    return data
}


export default function Skills({ data }) {
    return (
        <>
            <div className="container">
                <SectionHead data={data.skills} />

                <div className="section-body row g-4 justify-content-center m-2 p-2">
                    <div className="skill-bars col-lg-6 shadow-lg bg-white text-dark rounded-3 mb-3 p-4 wow fadeInUp">

                        {data.skills.skillsCollection.items?.map((skill, index) => 
                        <div key={index} className="bar mb-2">
                            <div className="info mb-1">
                                <span>{skill.name}</span>
                            </div>
                            <div className="progress-line">
                                <span style={{ width: + skill.value + "%" }}></span>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

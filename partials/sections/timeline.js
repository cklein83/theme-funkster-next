
import * as api from '../../lib/api'

import SectionHead from '../../components/section-head';
import RichText from '../../components/richtext';
import ErrorBlock from '../../components/errorblock';

export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2
    timelineEntryCollection(skip: 0, limit: 20) {
      items {
        ... on TimelineEntry {
          title
          date
          description {
            json
          } 
          iconClass
        }
      }
    }
    `
    const data = (await api.getData(preview, "timelinePage", fields, locale)) ?? []
    return data
}


export default function Timeline({ data }) {
    if (typeof data?.timeline === "undefined" || data?.timeline == null) {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 text-center">
                        <ErrorBlock />
                    </div>
                </div>
                
            </div>
        )
    }
    return (
        <>
            <div className="container">
                <SectionHead data={data.timeline} />

                <div className="section-body row g-4 justify-content-center text-center m-2 p-2">

                    <div className="col-lg-10 wow fadeInUp">

                        <div className="timeline-wrapper d-flex flex-column align-items-center">

                            {data.timeline.timelineEntryCollection?.items?.map((timelineEntry, index) => 
                            <div key={index} className="tl-entry right">
                                <div className={"timeline-line" + (index == data.timeline.timelineEntryCollection.items.length - 1 ? " last" : "")}>
                                </div>
                                <div className="card shadow-lg h-100 bg-light bg-gradient text-dark wow fadeInUp">
                                    <div className="card-body pt-4">
                                        <h3>
                                            {timelineEntry.title}
                                        </h3>
                                        <p className="muted">
                                            {new Date(timelineEntry.date).toLocaleDateString("de-DE")}
                                        </p>
                                        <p>
                                            <RichText text={timelineEntry.description} />
                                        </p>
                                    </div>
                                </div>
                                <div className="tl-entry-circle">
                                    <i className={timelineEntry?.iconClass ? timelineEntry.iconClass + " " : "" + "bi bi-box"}></i>
                                </div>
                            </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

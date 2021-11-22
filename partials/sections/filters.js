
import * as api from '../../lib/api'

import SectionHead from '../../components/section-head';
import { useEffect } from 'react';

import $ from 'jquery'


export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2
    `
    const data = (await api.getData(preview, "filtersPage", fields, locale)) ?? []
    return data
}

export default function Filters({ data }) {

    useEffect(() => {
        $(".filters .filter-btn").click(function() {
            var filterPanel = $(this).closest(".filters");

            // ui
            filterPanel.find(".filter-btn")
                .removeClass("btn-primary").addClass("btn-secondary");
            $(this).removeClass("btn-secondary").addClass("btn-primary");

            // filter action
            var filter = $(this).data("filter");
            if (filter === "*") {
                filterPanel.find(".filter-elem").show();    
                return;
            }

            // filter list
            filterPanel.find(".filter-elem").hide();
            filterPanel.find(".filter-elem").filter(function() {
                return $(this).hasClass("filter-" + filter);
            }).show();
        }); 
    })

    return (
        <>
            <div className="container">
                <SectionHead data={data.filters} />

                <div className="section-body row g-4 justify-content-center m-2 p-2">
                    <div className="col-lg-10 filters wow fadeInUp">

                        <div className="row filter-ctrl g-1 justify-content-center mx-2 mb-4">
                            <button className="col-lg-2 filter-btn badge rounded-pill btn btn-primary shadow-lg p-3 m-2" data-filter="*">
                                Alle
                            </button>    
                            
                            <button className="col-lg-2 filter-btn badge rounded-pill btn btn-secondary shadow-lg p-3 m-2" data-filter="spring">
                                Frühling
                            </button>
                            <button className="col-lg-2 filter-btn badge rounded-pill btn btn-secondary shadow-lg p-3 m-2" data-filter="summer">
                                Sommer
                            </button>	      
                            <button className="col-lg-2 filter-btn badge rounded-pill btn btn-secondary shadow-lg p-3 m-2" data-filter="autumn">
                                Herbst
                            </button>
                            <button className="col-lg-2 filter-btn badge rounded-pill btn btn-secondary shadow-lg p-3 m-2" data-filter="winter">
                                Winter
                            </button>	      
                        </div>

                        <div className="row g-3">  
                            <div className="col-lg-4 filter-elem filter-summer">
                                <div className="img"> 
                                    <img src="/img/filters/summer1.jpeg" />
                                </div>
                            </div>
                            <div className="col-lg-4 filter-elem filter-spring"> 
                                <div className="img">	
                                <img src="/img/filters/spring1.jpeg"/>
                                </div>	      	  
                            </div>
                            <div className="col-lg-4 filter-elem filter-autumn">  
                                <div className="img">
                                    <img src="/img/filters/autumn1.jpeg" />
                                </div>	      	  
                            </div>
                            <div className="col-lg-4 filter-elem filter-winter">  
                                <div className="img">
                                    <img src="/img/filters/winter1.jpeg" />
                                </div>	      	  
                            </div>

                            <div className="col-lg-4 filter-elem filter-summer">
                                <div className="img"> 
                                    <img src="/img/filters/summer2.jpeg" />
                                </div>
                            </div>
                            <div className="col-lg-4 filter-elem filter-spring"> 
                                <div className="img">	
                                <img src="/img/filters/spring2.jpeg"/>
                                </div>	      	  
                            </div>
                            <div className="col-lg-4 filter-elem filter-autumn">  
                                <div className="img">
                                    <img src="/img/filters/autumn2.jpeg" />
                                </div>	      	  
                            </div>
                            <div className="col-lg-4 filter-elem filter-winter">  
                                <div className="img">
                                    <img src="/img/filters/winter2.jpeg" />
                                </div>	      	  
                            </div>

                            <div className="col-lg-4 filter-elem filter-summer">
                                <div className="img"> 
                                    <img src="/img/filters/summer3.jpeg" />
                                </div>
                            </div>
                            <div className="col-lg-4 filter-elem filter-spring"> 
                                <div className="img">	
                                <img src="/img/filters/spring3.jpeg"/>
                                </div>	      	  
                            </div>
                            <div className="col-lg-4 filter-elem filter-autumn">  
                                <div className="img">
                                    <img src="/img/filters/autumn3.jpeg" />
                                </div>	      	  
                            </div>
                            <div className="col-lg-4 filter-elem filter-winter">  
                                <div className="img">
                                    <img src="/img/filters/winter3.jpeg" />
                                </div>	      	  
                            </div>

                            <div className="col-lg-4 filter-elem filter-summer">
                                <div className="img"> 
                                    <img src="/img/filters/summer4.jpeg" />
                                </div>
                            </div>
                            <div className="col-lg-4 filter-elem filter-spring"> 
                                <div className="img">	
                                <img src="/img/filters/spring4.jpeg"/>
                                </div>	      	  
                            </div>
                            <div className="col-lg-4 filter-elem filter-autumn">  
                                <div className="img">
                                    <img src="/img/filters/autumn4.jpeg" />
                                </div>	      	  
                            </div>
                            <div className="col-lg-4 filter-elem filter-winter">  
                                <div className="img">
                                    <img src="/img/filters/winter4.jpeg" />
                                </div>	      	  
                            </div>

                            <div className="col-lg-4 filter-elem filter-summer">
                                <div className="img"> 
                                    <img src="/img/filters/summer5.jpeg" />
                                </div>
                            </div>
                            <div className="col-lg-4 filter-elem filter-spring"> 
                                <div className="img">	
                                <img src="/img/filters/spring5.jpeg"/>
                                </div>	      	  
                            </div>
                            <div className="col-lg-4 filter-elem filter-autumn">  
                                <div className="img">
                                    <img src="/img/filters/autumn5.jpeg" />
                                </div>	      	  
                            </div>
                            <div className="col-lg-4 filter-elem filter-winter">  
                                <div className="img">
                                    <img src="/img/filters/winter5.jpeg" />
                                </div>	      	  
                            </div>

                            <div className="col-lg-4 filter-elem filter-summer">
                                <div className="img"> 
                                    <img src="/img/filters/summer6.jpeg" />
                                </div>
                            </div>
                            <div className="col-lg-4 filter-elem filter-spring"> 
                                <div className="img">	
                                <img src="/img/filters/spring6.jpeg"/>
                                </div>	      	  
                            </div>
                            <div className="col-lg-4 filter-elem filter-autumn">  
                                <div className="img">
                                    <img src="/img/filters/autumn6.jpeg" />
                                </div>	      	  
                            </div>
                            <div className="col-lg-4 filter-elem filter-winter">  
                                <div className="img">
                                    <img src="/img/filters/winter6.jpeg" />
                                </div>	      	  
                            </div>

                        </div> 
                    </div>                        
                </div>
            </div>
        </>
    );
}

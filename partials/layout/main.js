
import Section from '../../components/section'

import Banner from '../sections/banner'
import About from '../sections/about'
import Features from '../sections/features'
import Maps from '../sections/maps'
import Contact from '../sections/contact'
import Skills from '../sections/skills'
import CountTo from '../sections/countto'
import Team from '../sections/team'
import Faq from '../sections/faq'
import Pricing from '../sections/pricing'
import Timeline from '../sections/timeline'
import Feedback from '../sections/feedback'
import Quotes from '../sections/quotes'
import Video from '../sections/video'
import Countdown from '../sections/countdown'
import Slider from "../sections/slider";
import Filters from '../sections/filters'
import Gallery from '../sections/gallery'


export default function Main({ data, modules }) {

    return (
        <>
            <Section id="home" classes="banner">
                <Banner data={data} modules={modules} />
            </Section>                         

            <Section id="about">
                <About data={data}/>
            </Section>                         

            {modules.features && (
            <Section id="features">
                <Features data={data}/>
            </Section>              
            )}

            {modules.maps && (
            <Section id="maps">
                <Maps data={data}/>
            </Section>             
            )}  

            {modules.contact && (
            <Section id="contact">
                <Contact data={data}/>
            </Section>             
            )}  

            {modules.skills && (
            <Section id="skills">
                <Skills data={data}/>
            </Section>             
            )}  

            {modules.countto && (
            <Section id="countto">
                <CountTo data={data}/>
            </Section>              
            )} 

            {modules.team && (
            <Section id="team">
                <Team data={data}/>
            </Section>  
            )} 

            {modules.faq && (
            <Section id="faq">
                <Faq data={data}/>
            </Section>  
            )} 

            {modules.slider && (
            <Section id="slider">
                <Slider data={data}/>
            </Section>  
            )}  

            {modules.timeline && (
            <Section id="timeline">
                <Timeline data={data}/>
            </Section>              
            )}   

            {modules.pricing && (
            <Section id="pricing">
                <Pricing data={data}/>
            </Section>             
            )}               

            {modules.feedback && (
            <Section id="feedback">
                <Feedback data={data}/>
            </Section>             
            )}                        

            {modules.quotes && (
            <Section id="quotes">
                <Quotes data={data}/>
            </Section>             
            )}  

            {modules.video && (
            <Section id="video">
                <Video data={data}/>
            </Section>  
            )}   

            {modules.countdown && (
            <Section id="countdown">
                <Countdown data={data}/>
            </Section>               
            )} 

            {modules.filters && (
            <Section id="filters">
                <Filters data={data}/>
            </Section>               
            )} 

            {modules.gallery && (
            <Section id="gallery">
                <Gallery data={data}/>
            </Section>               
            )}                                                                                                                                                                                  
        </>
    );
}

import { useState, useEffect } from "react";

import SectionHead from '../../components/section-head';

import * as api from '../../lib/api'


export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2

    counttoCollection(skip: 0, limit: 10) {
        items {
            ... on Countto {
                name
                offset
                count
                iconClass
            }
        }
    }   
    `
    const data = (await api.getData(preview, "counttoPage", fields, locale)) ?? []
    return data
}

function CountToElement({ data }) {

    const [counter, setCounter] = useState(data.offset)

    useEffect(() => {
        const timer = setTimeout(() => setCounter(counter + 1), 20)
        if (counter == data.count) {
            clearTimeout(timer);
        }
        return () => clearTimeout(timer);
    });    

    return (
        <>
            <div className="col-lg-2 col-md-3 col-sm-4 col-4 p-0 m-1 text-center wow fadeInUp">
                <div className="counter-box card shadow-lg bg-white bg-gradient text-black p-3">
                    <i className={data.iconClass + " fs-2"}></i>
                    <div className="counter mb-0 fs-1" data-target={data.count}>{counter}</div>
                    <div className="text-lead p-2">{data.name}</div>
                </div>
            </div>
        </>
    )
}

export default function CountTo({ data }) {
    return (
        <>
            <div className="container">
                <SectionHead data={data.countto} />

                <div className="section-body row g-4 justify-content-center m-2 p-2">
                    {data.countto.counttoCollection.items?.map((countto, index) =>
                        <CountToElement key={index} data={countto} /> 
                    )}
                </div>
            </div>    
        </>
    );
}

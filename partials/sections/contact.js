
import { useState } from "react";

import SectionHead from '../../components/section-head';

import * as api from '../../lib/api'

export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2

    nameFieldLabel
    nameFieldError
    nameFieldPlaceholder

    emailFieldLabel
    emailFieldError
    emailFieldPlaceholder

    phoneFieldLabel
    phoneFieldError
    phoneFieldPlaceholder

    messageFieldLabel
    messageFieldError
    messageFieldPlaceholder

    submitButtonLabel

    avatarImage {
      url
    }

    address {
        ... on Contact {
            name
            street
            zip
            city
            phone
            email
        }
    }      
    `
    const data = (await api.getData(preview, "contactPage", fields, locale)) ?? []
    return data
}


export default function Contact({ data }) {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add("was-validated")
  
      setValidated(true)
    };

    return (
        <>
            <div className="container">
                <SectionHead data={data.contact} />

                <div className="section-body row g-4 justify-content-center wow fadeInUp">
                    <div className="col-lg-5 col-md-8 col-sm-9 col-8 align-self-center">
                        <div className="card bg-white shadow-lg p-3">

                            <form className="needs-validation" noValidate onSubmit={handleSubmit}>

                                <div className="row form-group mb-3">
                                    <div className="col">
                                        <input type="text" className="form-control" id="name" name="name" placeholder={data.contact.nameFieldLabel} required />
                                        <div className="invalid-feedback">
                                          {data.contact.nameFieldError}
                                        </div>
                                    </div>
                                </div>

                                <div className="row form-group mb-3">
                                    <div className="col">
                                        <input type="email" className="form-control" id="email" name="email" placeholder={data.contact.emailFieldLabel} required />
                                        <div className="invalid-feedback">
                                          {data.contact.emailFieldError}
                                        </div>
                                    </div>
                                </div>

                                <div className="row form-group mb-3">
                                    <div className="col">
                                        <input type="email" className="form-control" id="phone" name="phone" placeholder={data.contact.phoneFieldLabel} required />
                                        <div className="invalid-feedback">
                                          {data.contact.phoneFieldError}
                                        </div>
                                    </div>
                                </div>

                                <div className="row form-group mb-3">
                                    <div className="col">
                                        <textarea className="form-control" id="message" placeholder={data.contact.messageFieldPlaceholder} rows="5" required></textarea>
                                        <div className="invalid-feedback">
                                          {data.contact.messageFieldError}
                                        </div>
                                    </div>
                                </div>

                                <div className="row form-group justify-content-center">
                                    <div className="submit-button text-center">
                                        <button type="submit" className="btn btn-primary">{data.contact.submitButtonLabel}</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-5 col-6 align-self-center">
                        <img src={data.contact.avatarImage.url} className="contact-img img-fluid shadow-lg rounded-circle p-0" alt={data.contact.address.name} />
                    </div>
                </div>
            </div>
        </>
    );
}

import styleContact from "../../styles/Contact.module.css";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Footer from "../Footer/Footer";
import { serviceID, templateID, userID } from "./emailjs.config";
import Notice from "./Notice"

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
    notification: ""
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setInput({
      name: "",
      email: "",
      message: "",
      notification: ""
    });
  }

  const sendEmail = (e) => {
    e.preventDefault();
    if (!input.name || !input.email || !input.message) {
        setInput({ ...input, notification: "Please fill out all the fields" });
        setIsOpen(true);
        return;     
    } 
      emailjs.sendForm(serviceID, templateID, e.target, userID).then(
        (result) => {
          setInput({ ...input, notification: "Thank you for your message!" });
          // setIsOpen(true);
        },
        (error) => {
          setInput({ ...input, notification: "Something wrong with the API, please try again or reach out to me though LinkIn" });
        }
        );
        setIsOpen(true);
  };

  return (
    <div className={styleContact.contact} id="contact">
      <div className="container-fluid">
        <div className={styleContact.contact_row}>
          <div className="col-sm-12 col-md-12 text-center">
            <div className="contact-header">
              <h1>Contact</h1>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-md-6">
            <div className="contact-form-body">
              <form onSubmit={sendEmail}>
                <div className="row">
                  <div className="col-sm-6 col-md-6">
                    <div className="name">
                      <h4>Name</h4>
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={input.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className="email">
                      <h4>Email</h4>
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={input.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className={styleContact.message}>
                      <h4>Message</h4>
                      <textarea
                        placeholder="Message"
                        name="message"
                        value={input.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4 col-md-4 col-sm-offset-4 col-md-offset-4">
                    <div className="submit-contact">
                      <button className={styleContact.submit_contact}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Notice open={isOpen} onClose={handleClose} notification={input.notification} />
      <Footer />
    </div>
  );
}

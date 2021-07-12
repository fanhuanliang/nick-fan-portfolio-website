import styleContact from '../../styles/Contact.module.css'

export default function contact() {
  return (
    <div className={styleContact.contact} id="contact">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 text-center">
            <div className="contact-header">
              <h1>Contact</h1>
            </div>
          </div>
        </div>

        <div className="row">

          <div className="col-sm-6 col-md-6">
            <div className="contact-form-body">
              <form>
                <div className="row">

                  <div className="col-sm-6 col-md-6">
                    <div className="lastname">
                      <h4>Name</h4>
                      <input type="text" placeholder="Name" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className="email">
                      <h4>Email</h4>
                      <input type="text" placeholder="Email" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className="message">
                      <h4>Message</h4>
                      <textarea placeholder="Message"></textarea>
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
    </div>
  );
}

import developerDesign from "../../images/developerdesign.svg";
import responsiveDesign from "../../images/responsivedesign.svg";
import innovativeSolutions from "../../images/innovativesolutions.svg";
import passion from "../../images/passion.svg"
import styleSummary from '../../../styles/Summary.module.css'
import Image from "next/image";

export default function Summary() {
  return (
    <div className={styleSummary.summary}>
      <div className="container-fluid">
        <div className={styleSummary.row}>
          <div className={styleSummary.card_summary}>
            <div className={styleSummary.image_summary}>
              <div className="development-img">
                <Image
                  className="img-responsive"
                  src={developerDesign}
                  alt="developerDesign"
                />
              </div>
            </div>

            <div className={styleSummary.content_summary}>
              <div className="development-description">
                <h3>Development and Design</h3>
                <p>
                  I aim to put my creativity to the test, designing and building
                  unique, meaningful products for clients or merely for my own
                  interests.
                </p>
              </div>
            </div>
          </div>

          <div className={styleSummary.card_summary}>
            <div className={styleSummary.image_summary}>
              <div className="responsive-img">
                <Image
                  className="img-responsive"
                  src={responsiveDesign}
                  alt="responsivedesign"
                />
              </div>
            </div>

            <div className={styleSummary.content_summary}>
              <div className="responsive-description">
                <h3>Responsive Layouts</h3>
                <p>
                  Development and design isnt merely putting information on the
                  site or preferred media outlet. I organize content and present
                  information in an engaging fashion, driving new and unique
                  layouts in tandem with novel solutions and cool animations.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styleSummary.row}>
          <div className={styleSummary.card_summary}>
            <div className={styleSummary.image_summary}>
              <div className="idea-img">
                <Image
                  className="img-responsive"
                  src={innovativeSolutions}
                  alt="innovativesolutions"
                />
              </div>
            </div>

              <div className={styleSummary.content_summary}>
                <div className="idea-description">
                  <h3>Ideas and Solutions</h3>
                  <p>
                    There are still many problems that exist in today society,
                    including laziness. Luckily, I hope to combat these issues
                    by innovating, developing easy-to-use programs, solutions,
                    or products.
                  </p>
                </div>
              </div>
          </div>
          <div className={styleSummary.card_summary}>
            <div className={styleSummary.image_summary}>
              <Image className="img-responsive" src={passion} alt="passion" />
            </div>

            <div className="col-sm-4 col-md-4">
              <div className="passion-description">
                <h3>Passion and Dedication</h3>
                <p>
                  With my profound interest and commitment to my field of study,
                  my projects rarely go unfinished and my problems are never
                  left unresolved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

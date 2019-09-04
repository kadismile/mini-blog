import React from 'react'

class Footer extends React.Component {

  render() {
    return (
      <footer id="footer" className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-md-offset-3">
              <div className="footer-inner">
                <div className="footer-widgets">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="widget">
                        <h2 className="title"><span>About Me</span></h2>
                        <p>
                          I am tancho a Graphic Designer based in New York, specializing in User Interface Design and Development.
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="widget">
                        <h2 className="title"><span>Contact Me</span></h2>
                        <ul>
                          <li>
                            Tel: +123 456 789
                          </li>
                          <li>
                            Email: name@domain.com
                          </li>
                          <li>
                            Address: 820 Utica Ave, Brooklyn, NY
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="widget">
                        <h2 className="title"><span>Web Links</span></h2>
                        <ul>
                          <li><a href="#">Tips &amp; tricks</a></li>
                          <li><a href="#">Examples</a></li>
                          <li><a href="#">Documentation</a></li>
                          <li><a href="#">Support</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="copyright">
                        <p>Tancho @ 2018. Design by <a href="#">Kendy</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
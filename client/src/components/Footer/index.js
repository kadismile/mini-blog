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
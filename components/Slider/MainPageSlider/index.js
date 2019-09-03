import React from "react";
import Slider from 'react-slick'


const BgImage = ({ url, ...rest }) => (
  <div
    style={{
      width: '100%',
      height: '400px',
      backgroundImage: `url(${url})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain'
    }}
    {...rest}
  />
)

class mainPageSlider extends React.Component {
    
  
    render() {
        const sliderSettings = {
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 3,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  arrows: false,
                  centerMode: true,
                  centerPadding: '40px',
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 480,
                settings: {
                  arrows: false,
                  centerMode: true,
                  centerPadding: '40px',
                  slidesToShow: 1
                }
              }
            ]
          }
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Slider {...sliderSettings}>
        <div>
          <a href="#">
            <BgImage url="http://placekitten.com/g/400/200" />
          </a>
        </div>
        <div>
          <a href="#">
            <img src="http://placekitten.com/g/400/200" />
          </a>
        </div>
        <div>
          <a href="#">
            <img src="http://placekitten.com/g/400/200" />
          </a>
        </div>
        <div>
          <a href="#">
            <img src="http://placekitten.com/g/400/200" />
          </a>
        </div>
      </Slider>
    </div>
  )
    }
}
 

export default mainPageSlider;
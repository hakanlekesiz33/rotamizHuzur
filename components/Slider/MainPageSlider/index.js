import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const mainPageSlider = () => (
    <Carousel>
    <div>
        <img src="../static/1.jpeg" />
        <p className="legend">Legend 1</p>
    </div>
    <div>
        <img src="../static/2.jpeg" />
        <p className="legend">Legend 2</p>
    </div>
    <div>
        <img src="../static/3.jpeg" />
        <p className="legend">Legend 3</p>
    </div>
    <div>
        <img src="../static/4.jpeg" />
        <p className="legend">Legend 4</p>
    </div>
</Carousel>
);

export default mainPageSlider;
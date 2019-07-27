import React  from 'react';
import PopularPosts from './PopularPosts';
import Categories from './Categories';
import SiteMap from './SiteMap';


const footer = (  ) => (
    <footer>
        <div className="gridWrapper">
            <div className='footerBorder'></div>
             <PopularPosts />
            <Categories/>
            <SiteMap/>
            <div className='footerCopyright'>
            <p>© Copyright  Designed by <a href="https://www.linkedin.com/in/hakan-lekesiz-7347a28a/">Hakan Lekesiz</a></p>
            </div>
        </div>
    </footer>
);

export default footer;
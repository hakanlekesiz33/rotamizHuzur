import { useRouter } from 'next/router';
import React, { Component } from 'react';
import initsStore from '../store/store';
import { connect } from 'react-redux';
import '../styles/blogDetail.scss';
import '../styles/lightbox.scss';
import renderHTML from 'react-render-html';
import Lightbox from "react-image-lightbox";

class BlogDetail extends Component {
  

    constructor(props) {
        super(props);
    
        this.state = {
          photoIndex: 0,
          isOpen:false
    
        };
      }
    

    handleClickBox = (images) => {

      
        const { photoIndex} = this.state;
        return (
        <Lightbox
        mainSrc={images[photoIndex].imgPath}
        nextSrc={images[(photoIndex + 1) % images.length].imgPath}
        prevSrc={images[(photoIndex + images.length - 1) % images.length].imgPath}
        onCloseRequest={() => this.setState({ isOpen: false })}
        onMovePrevRequest={() =>
          this.setState({
            photoIndex: (photoIndex + images.length - 1) % images.length
          })
        }
        onMoveNextRequest={() =>
          this.setState({
            photoIndex: (photoIndex + 1) % images.length
          })
        }
      />
      );
           
     } 
        
    

    render() {

        const store = this.props.getState();

        let currentBlog = store.layoutItems.blogs.filter(function (blog) {
            return blog.SeoUrl === "bir-tane-antalya-gezisi"
        });

    
 

        return (

            <div id='blogDetails'>
                <div className="bg" style={{ backgroundImage: `url(${currentBlog[0].ShowCaseImg})` }}></div>
                <div className="gridWrapper">
                    <div className="postContent">
                   <div className="postTitle">
                       <h1>{currentBlog[0].PageTitle}</h1>
                        <p className="postShortInfo">
                            <img src="/static/tag.png"  />
                            <a>{currentBlog[0].CategoryName}</a>
                            <img src="/static/oclock.png"  />
                            <a>{currentBlog[0].Date}</a>

                        </p>
                   </div>
                
                    {renderHTML(currentBlog[0].Desc)}
                    <div className="gallery">
                       {this.handleClickBox(currentBlog[0].GaleryImgs)}
                       
                    </div>
                    </div>
                   
                </div>
            </div>

        );
    }
}

export default connect(initsStore)(BlogDetail);
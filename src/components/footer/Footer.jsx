import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logodark from '../../assets/images/logo/logo_dark.png';
import logofooter from '../../assets/images/logo/logo2.png';
import ModalComponent from './ModalComponent';
const Footer = () => {
  const accountList = [
    // {
    //   title: 'Authors',
    //   link: '/authors-01',
    // },
    // {
    //   title: 'Collection',
    //   link: '/wallet-connect',
    // },
    // {
    //   title: 'Author Profile',
    //   link: '/edit-profile',
    // },
    {
      title: 'Create Item',
      link: '/create-book',
    },
  ];
  const resourcesList = [
    // {
    //   title: 'Help & Support',
    //   link: '/help-center',
    // },
    // {
    //   title: 'Live Auctions',
    //   link: '/live-auctions',
    // },
    // {
    //   title: 'Item Details',
    //   link: '/item-details-01',
    // },
    {
      title: 'Activity List',
      link: '/activity-01',
    },
  ];
  const companyList = [
    {
      title: 'Explore',
      link: '/explore',
    },
    {
      title: 'Contact Us',
      link: '/contact',
    },
  ];
  const socialList = [
    {
      icon: 'fab fa-twitter', // twitter
      link: 'https://twitter.com/alforddesign',
    },
    {
      icon: 'icon-fl-vt', // discord
      link: '#',
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div>
      <footer id="footer" className="footer-light-style clearfix bg-style">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-12">
              <div className="widget widget-logo">
                <div className="logo-footer" id="logo-footer">
                  <Link to="/">
                    <img
                      className="logo-dark"
                      id="logo_footer"
                      src={logodark}
                      alt="nft-gaming"
                    />
                    <img
                      className="logo-light"
                      id="logo_footer"
                      src={logofooter}
                      alt="nft-gaming"
                    />
                  </Link>
                </div>
                <p className="sub-widget-logo">
                  Lorem ipsum dolor sit amet,consectetur adipisicing elit. Quis
                  non, fugit totam vel laboriosam vitae.
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-5 col-5">
              <div className="widget widget-menu style-1">
                <h5 className="title-widget">My Account</h5>
                <ul>
                  {accountList.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-7 col-7">
              <div className="widget widget-menu style-2">
                <h5 className="title-widget">Resources</h5>
                <ul>
                  {resourcesList.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-5 col-5">
              <div className="widget widget-menu fl-st-3">
                <h5 className="title-widget">Company</h5>
                <ul>
                  {companyList.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-7 col-12">
              <div className="widget widget-subcribe">
                <h5 className="title-widget">Follow us Social</h5>
                <div style={{ display: 'none' }} className="form-subcribe">
                  <form
                    id="subscribe-form"
                    action="#"
                    method="GET"
                    acceptCharset="utf-8"
                    className="form-submit"
                  >
                    <input
                      name="email"
                      className="email"
                      type="email"
                      placeholder="info@yourgmail.com"
                      required
                    />
                    <button id="submit" name="submit" type="submit">
                      <i className="icon-fl-send"></i>
                    </button>
                  </form>
                </div>
                <div className="widget-social style-1 mg-t32">
                  <ul>
                    {socialList.map((item, index) => (
                      <li key={index}>
                        <Link to={item.link}>
                          <i className={item.icon}></i>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {isVisible && <Link onClick={scrollToTop} to="#" id="scroll-top"></Link>}
      {/* <ModalComponent /> */}
    </div>
  );
};

export default Footer;

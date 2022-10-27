import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logodark from '../../assets/images/logo/bookit-logo.png';
import logofooter from '../../assets/images/logo/logo-no-bg-dark.png';

import './Footer.scss'

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
      testId: 'twitter'
    },
    {
      icon: 'icon-fl-vt', // discord
      link: '#',
      testId: 'discord'
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

  const SubscribeForm = () => (
    <div className="form-subcribe">
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
  )

  return (
    <div>
      <footer data-testid="footer" id="footer" className="footer-light-style clearfix bg-style justify-content-evenly">
        <div className="row">
          <div id="logo-footer" className="col-sm-2 col-md-2">
            <Link to="/" className="logo-footer">
              <img
                className="logo-dark"
                src={logodark}
                alt="bookit-logo-transparent"
              />
              <img
                className="logo-light"
                src={logofooter}
                alt="bookit-logo-light"
              />
            </Link>
          </div>
          <div className="col-sm-2 col-md-2 text-center">
            <div className="widget widget-menu style-1">
              <h5 data-testid="accountTitle" className="title-widget">My Account</h5>
              <ul>
                {accountList.map((item, index) => (
                  <li key={index}>
                    <Link to={item.link}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-sm-2 col-md-2 text-center">
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
          <div className="col-sm-2 col-md-2 text-center">
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
          <div className="col-sm-2 col-md-2 text-center">
            <div className="widget widget-subcribe">
              <h5 className="title-widget">Follow us Social</h5>
              {/* <SubscribeForm /> */}
              <div data-testid="hork" className="widget-social style-1">
                <ul>
                  {socialList.map((item, index) => (
                    <li key={index} data-testid={`socialIcon-${item.testId}`}>
                      <a href={item.link}>
                        <i className={item.icon}></i>
                      </a>
                    </li>
                  ))}
                </ul>
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

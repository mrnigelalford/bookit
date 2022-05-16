import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import menus from '../../pages/menu';
import DarkMode from './DarkMode';
import logoheader from '../../assets/images/logo/logo.png';
import logoheader2x from '../../assets/images/logo/logo@2x.png';
import logodark from '../../assets/images/logo/logo_dark.png';
import logodark2x from '../../assets/images/logo/logo_dark@2x.png';
import imgsun from '../../assets/images/icon/sun.png';
import avt from '../../assets/images/avatar/avt-2.jpg';

import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType, AccountInfo } from '@airgap/beacon-sdk';
import { TezosToolkit } from '@taquito/taquito';
import { PermissionScope } from '@airgap/beacon-sdk';

global.Buffer = global.Buffer || require('buffer').Buffer;

interface HeaderProps {
  wallet?: BeaconWallet;
  Tezos?: TezosToolkit;
}

const Header = ({ wallet, Tezos }: HeaderProps) => {
  const { pathname } = useLocation();

  const headerRef = useRef(null);
  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });
  const isSticky = (e) => {
    const header = document.querySelector('.js-header');
    const scrollTop = window.scrollY;
    scrollTop >= 300
      ? header?.classList.add('is-fixed')
      : header?.classList.remove('is-fixed');
    scrollTop >= 400
      ? header?.classList.add('is-small')
      : header?.classList.remove('is-small');
  };

  const menuLeft = useRef(null);
  const btnToggle = useRef(null);
  const btnSearch = useRef(null);

  const menuToggle = () => {
    // @ts-ignore
    menuLeft.current.classList.toggle('active');
    // @ts-ignore
    btnToggle.current.classList.toggle('active');
  };

  const searchBtn = () => {
    // @ts-ignore
    btnSearch.current.classList.toggle('active');
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };

  const [address, setAddress] = useState<string>();
  const [accountBalance, setAccountBalance] = useState<number>();
  const [activeAccount, setActiveAccount] = useState<any>();
  const [profileVisible, setProfileVisible] = useState<boolean>(false);

  const scopes: PermissionScope[] = [
    PermissionScope.OPERATION_REQUEST,
    PermissionScope.SIGN,
  ];

  const setWalletBalance = async (account: AccountInfo) => {
    const balance = await Tezos?.tz.getBalance(account.address);
    console.log('balance: ', balance?.toNumber());
    setAccountBalance(balance?.toNumber());
  };

  useEffect(() => {
    wallet?.client.getActiveAccount().then((activeAccount) => {
      if (activeAccount) {
        setActiveAccount(activeAccount);
        setAddress(activeAccount?.address);
        setWalletBalance(activeAccount);
        console.log('acc: ', accountBalance);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWalletPermissions = async () => {
    let myAddress: string | undefined;

    // If defined, the user is connected to a wallet?.
    if (activeAccount) {
      myAddress = activeAccount.address;
    } else {
      await wallet?.client.requestPermissions({
        network: {
          type: NetworkType.ITHACANET,
        },
        scopes,
      });

      myAddress = await wallet?.getPKH();
      setAddress(myAddress);
    }
  };

  const disconnectWallet = () => {
    if (activeAccount) {
      wallet?.clearActiveAccount();
      setActiveAccount(null);
      setAddress(undefined);
    }
  };

  return (
    <header id="header_main" className="header_1 js-header" ref={headerRef}>
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div id="site-header-inner">
              <div className="wrap-box flex">
                <div id="site-logo" className="clearfix">
                  <div id="site-logo-inner">
                    <Link to="/" rel="home" className="main-logo">
                      <img
                        className="logo-dark"
                        id="logo_header"
                        src={logodark}
                        srcSet={`${logodark2x}`}
                        alt="nft-gaming"
                      />
                      <img
                        className="logo-light"
                        id="logo_header"
                        src={logoheader}
                        srcSet={`${logoheader2x}`}
                        alt="nft-gaming"
                      />
                    </Link>
                  </div>
                </div>
                <div
                  className="mobile-button"
                  ref={btnToggle}
                  onClick={menuToggle}
                >
                  <span></span>
                </div>
                <nav id="main-nav" className="main-nav" ref={menuLeft}>
                  <ul id="menu-primary-menu" className="menu">
                    {menus.map((data, index) => (
                      <li
                        key={index}
                        onClick={() => handleOnClick(index)}
                        className={`menu-item ${
                          data.namesub ? 'menu-item-has-children' : ''
                        } ${activeIndex === index ? 'active' : ''} `}
                      >
                        <Link to={data.links}>{data.name}</Link>
                        {data.namesub && (
                          <ul className="sub-menu">
                            {data.namesub.map((submenu) => (
                              <li
                                key={submenu.id}
                                className={
                                  pathname === submenu.links
                                    ? 'menu-item current-item'
                                    : 'menu-item'
                                }
                              >
                                <Link to={submenu.links}>{submenu.sub}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="flat-search-btn flex">
                  <div className="header-search flat-show-search" id="s1">
                    <Link
                      to="#"
                      className="show-search header-search-trigger"
                      onClick={searchBtn}
                    >
                      <i className="far fa-search"></i>
                    </Link>
                    <div className="top-search" ref={btnSearch}>
                      <form
                        action="#"
                        method="get"
                        role="search"
                        className="search-form"
                      >
                        <input
                          type="search"
                          id="s"
                          className="search-field"
                          placeholder="Search..."
                          name="s"
                          title="Search for"
                          required={false}
                        />
                        <button
                          className="search search-submit"
                          type="submit"
                          title="Search"
                        >
                          <i className="icon-fl-search-filled"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                  {!address && (
                    <div className="sc-btn-top mg-r-12" id="site-header">
                      <div
                        style={{ cursor: 'pointer' }}
                        className="sc-button header-slider style style-1 wallet fl-button pri-1"
                        onClick={() => getWalletPermissions()}
                      >
                        <span>Wallet connect</span>
                      </div>
                    </div>
                  )}

                  {address && (
                    <div id="header_admin">
                      <div className="header_avatar">
                        <div
                          className="price"
                          onClick={() => setProfileVisible(!profileVisible)}
                        >
                          <span>
                            {accountBalance} <strong>xtz</strong>{' '}
                          </span>
                        </div>
                        <img
                          className="avatar"
                          src={avt}
                          alt="avatar"
                          onClick={() => setProfileVisible(!profileVisible)}
                        />
                        <div
                          className={`avatar_popup mt-20 ${
                            profileVisible ? 'visible' : ''
                          }`}
                        >
                          <div className="d-flex align-items-center copy-text justify-content-between">
                            <span> {address}... </span>
                            <Link to="/" className="ml-2">
                              <i className="fal fa-copy"></i>
                            </Link>
                          </div>
                          <div className="d-flex align-items-center mt-10">
                            <img className="coin" src={imgsun} alt="/" />
                            <div className="info ml-10">
                              <p className="text-sm font-book text-gray-400">
                                Balance
                              </p>
                              <p className="w-full text-sm font-bold text-green-500">
                                16.58 ETH
                              </p>
                            </div>
                          </div>
                          <div className="hr"></div>
                          <div className="links mt-20">
                            <Link to="#">
                              <i className="fab fa-accusoft"></i>{' '}
                              <span> My items</span>
                            </Link>
                            <a className="mt-10" href="/edit-profile">
                              <i className="fas fa-pencil-alt"></i>{' '}
                              <span> Edit Profile</span>
                            </a>
                            <div
                              className="mt-10 copy-text"
                              onClick={() => disconnectWallet()}
                            >
                              <i className="fal fa-sign-out"></i>{' '}
                              <span> Disconnect </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DarkMode />
    </header>
  );
};

export default Header;

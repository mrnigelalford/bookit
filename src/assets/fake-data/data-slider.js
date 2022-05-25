import imgbg1 from '../images/slider/bg_slide_1.png';
import imgbg2 from '../images/slider/bg_slide_1.png';

import img1 from '../../assets/images/box-item/green-ottez.png';
import img2 from '../../assets/images/box-item/space-rabbit.png';
import img3 from '../../assets/images/box-item/vr-kid.png';

const data = [
  {
    title_1: 'Discover, find,',
    title_2: 'Sell extraordinary',
    title_3: 'Monster NFTs',
    description:
      'Marketplace for monster character cllections non fungible token NFTs',
    img: img1,
    imgbg: imgbg1,
    class: 'left',
  },
  {
    title_1: 'Discover, find,',
    title_2: 'Sell extraordinary',
    title_3: 'Monster NFTs',
    description:
      'Marketplace for monster character cllections non fungible token NFTs',
    img: img2,
    imgbg: imgbg2,
    class: 'center',
  },
  {
    title_1: 'Discover, find,',
    title_2: 'Sell extraordinary',
    title_3: 'Monster NFTs',
    description:
      'Marketplace for monster character cllections non fungible token NFTs',
    img: img3,
    imgbg: imgbg2,
    class: 'right',
  },
];

const HeroSliderProps = {
  title: 'Discover your next favorite author',
  description: 'book NFT Marketplace',
  data,
};

export default HeroSliderProps;

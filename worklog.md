### TODO

## Excerpt
- [ ] dynamic page that shows excerpt data created by the user

### In progress

- [x] Homepage buttons route as expected
- [x] Homepage unused sections are removed
- [x] create item card uses new home page card component
- [ ] walk user flow for v1 completeness:
  1. user can create book [x]
  2. user can view book on home page [x]
  3. user can buy book []
  4. user can navigate to book via routing [x]

### Item Details

- [x] 1. add backcover image support
- [ ] 2. add buy button
- [ ] add sample page support
- [ ] likes and watch count component should show and work
- [ ] book should show cover image
- [ ] book should show background image
- [ ] book should show sample content image?
- [ ] show bid history (read block chain data for this)
- [ ] book should support wishlists

### App Routing

- [ ] clean back button history
- [x] pass params to components via routing
- [x] first component: item-details (item id?)
- [ ] first component: author info (item id?)
- [ ] first component: collection info (item id?)

### Activity Page

- [ ] Activity details filter does not work
- [ ] Users should be able to like items.
      \*\*\* define the logic for this, user account needed? show in user profile?

### Auction

- [ ] Auction logic needs attention
      \*\*\* Auctions will use smart contracts

### Header

- [ ] darkmode button in header is not styled correctly. needs to remain in navbar at all screen sizes.
- move header to separate component (see item details and create book component)

### Homepage

- [x] Today's pick item filter needs to work
  - items should load from data vs hardcoded data in each component
- [ ] Top Sellers and Buyers logic?
- [x] Today's Pick (styling)
  - Show book description
  - Book title is too large
  - shrink author name
  - cards should be taller to show more text data
  - center the cover image

#### Popular Collection (v1)

- [ ] build these by hand for now (System built collections)
  - need to add logic to allow users to create collection
  - how will collection make it to home page?
- [ ] Live Auction (v1)
- [ ] Category Select (v1)
- [ ] Top Buyers/Sellers (v1)

#### Footer

- [x] Remove Resources Column
- [x] Remove My Account (Authors, Author Profile, Collection)

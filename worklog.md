### TODO

- [] handle empty state
  - home page, book details, author info, 
- [ ] book creation - read price, royalties, quantity
- [ ] NFT shows as 'unknown token' in Kukai
- [ ] add unit tests
- [ ] add contract tests
- [ ] untangle the code in the book creation
    - move the contract helper code to separate node.js project
- [ ] book creation UI needs to show all info correctly
- [ ] User should be able to update their Author info/profile info¬

## Excerpt
- [ ] dynamic page that shows excerpt data created by the user

### In progress

- [ ] walk user flow for v1 completeness:
  1. user can create book [x]
  2. user can view book on home page [x]
  3. user can buy book []
  4. user can navigate to book via routing [x]

### Item Details

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
- [ ] Top Sellers and Buyers logic?

#### Popular Collection (v1)

- [ ] build these by hand for now (System built collections)
  - need to add logic to allow users to create collection
  - how will collection make it to home page?
- [ ] Live Auction (v1)
- [ ] Category Select (v1)
- [ ] Top Buyers/Sellers (v1)

#### Footer


#### Completed

- [x] resubmit milestone 1 documentation
- [x] update Tezos to kathmandu
- [x] connect graphql
- [x] retrieve author info from graphql

- [x] APP ROUTING - pass params to components via routing
- [x] APP ROUTING - first component: item-details (item id?)

- [x] ITEM DETAILS - add backcover image support

- [x] FOOTER - Remove Resources Column
- [x] FOOTER - Remove My Account (Authors, Author Profile, Collection)

- [x] Homepage buttons route as expected
- [x] Homepage unused sections are removed
- [x] create item card uses new home page card component

- [x] HOMEPAGE - Today's pick item filter needs to work
  - items should load from data vs hardcoded data in each component
- [x] HOMEPAGE - Today's Pick (styling)
  - Show book description
  - Book title is too large
  - shrink author name
  - cards should be taller to show more text data
  - center the cover image

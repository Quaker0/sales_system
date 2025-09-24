# Sales System - A Fictional PoS in TS

## Commands

### Setup

```sh
npm install
```

### Run tests

```sh
npm test
```

## Design

A aimed for a minimal setup with TS/Node and the builtin node test runner.

- I wanted the main logic to exist within the Basket class but easily readable in smaller, self-explainable functions.
- I made sure to define private methods and variables, and only make a select set of public methods available to enforce strict contracts between different models.
- I defined unit tests with good coverage but yet concise as to not bloat and make it unclear if tests are written for each case.
- I moved the test files next to each file it is testing so that you easily can see which files are covered even as the project grows. I also added a coverage report.
- I made the DeliveryChargeTieredRule and HalfOffEveryXProductOffer more general than they perhaps needed to be which I usually would only do if I saw a need for it, but it shows the capabilites of it well. (The getDiscounts in HalfOffEveryXProductOffer could also be written as a formula instead.)
- I tried to keep good separation in the project, it could perhaps be argued that the basket does too much as in maintains the basket and contains the pricing logic.

### Extensibility

The Basket class uses dependency injection to accept different models that it can use, allowing it to use in-memory implementations for unit tests and live databases for production.

The injected models are defined in this structure:

- delivery-charge-rules
- offers
- product-catalogues

That means that you can easily implement and plug in any additional feature you might want or need in the future. You just have to implement the interface of the type DeliveryChargeRule/Offer/ProductCatalogue. Enabling you to support new delivery prices, offers and a product catalogue stored in a production database instead of in-memory.

`productQuantities` is still stored in-memory within the Basket class because that is how I interpreted the assignment. Preferably this one would also be stored in a state manager (Redis) or database and have a defined interface.

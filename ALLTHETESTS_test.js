// This is the main test file containing scenarios for the RealWorld demo site.
// It includes test cases for user registration, article management, and login (not functional).

const Chance = require("chance");
const chance = new Chance();

Feature("RealWorld App E2E Tests");

// Scenario 1: User Registration
Scenario("should allow a new user to register", async ({ I }) => {
  const user = {
    username: (chance.first() + chance.last() + chance.animal()).replace(/\s/g, ''),
    email: chance.email(),
    password: "Password123!",
  };

  I.say("Navigating to the registration page");
  I.amOnPage("/#/register");

  I.say("Filling out the registration form");
  I.fillField("Username", user.username);
  I.fillField("Email", user.email);
  I.fillField("Password", user.password);

  I.say("Clicking the sign up button");
  I.click('button[type="submit"]');

  I.say("Verifying successful registration by checking for username in nav bar");
  I.waitForElement(locate('.nav-link').withText(user.username), 10);
  I.see(user.username, '.nav-link');
});

// Scenario 2: Login — Known Issue with server-side 401 error
Scenario("should show error message when login fails (Known Issue)", async ({ I }) => {
  const existingUser = {
    email: "test@test.com",
    password: "password",
  };

  I.say("This login feature is currently broken due to 401 error on valid credentials.");
  I.amOnPage("/#/login");

  I.say("Filling out login form with valid credentials (known to fail)");
  I.fillField("Email", existingUser.email);
  I.fillField("Password", existingUser.password);

  // Fix: Click the actual button using class selector
  I.say("Clicking the Sign in button using specific locator");
  I.click("button.btn.btn-lg.btn-primary");

  I.say("Expecting to see 'Invalid credentials' error message");
  I.waitForText("Invalid credentials", 10);
});

// Scenario 3: Article Creation and Deletion
Scenario("should allow a registered user to create and delete an article", async ({ I }) => {
  const user = {
    username: chance.first() + chance.last() + chance.animal(),
    email: chance.email(),
    password: "Password123!",
  };

  const article = {
    title: `My New Article: ${chance.sentence({ words: 3 })}`,
    description: chance.sentence({ words: 8 }),
    body: "This is a test article body written for automated test purposes.",
    tags: "qa, codecept, test"
  };

  I.say("Registering a new user");
  I.amOnPage("/#/register");
  I.fillField("Username", user.username);
  I.fillField("Email", user.email);
  I.fillField("Password", user.password);
  I.click({ css: "button.btn.btn-lg.btn-primary.pull-xs-right" });
  I.waitForText(user.username, 10);
  I.see(user.username, ".nav-link");

  I.say("Navigating to New Article page");
  I.click("New Article");

  I.say("Filling out the article form");
  I.fillField('input[formcontrolname="title"]', article.title);
  I.fillField('input[formcontrolname="description"]', article.description);
  I.fillField('textarea[formcontrolname="body"]', article.body);
  I.fillField('input[placeholder="Enter tags"]', article.tags);

  I.say("Publishing the article");
  I.click("Publish Article");

  I.say("Verifying the article was created");
  I.waitForText(article.title, 10);
  I.see(article.title, "h1");

  I.say("Deleting the article");
  I.waitForVisible("button.btn-outline-danger", 10);
  I.click("Delete Article");

  I.say("Verifying the article is deleted");
  I.amOnPage("/");
  I.dontSee(article.title);
});

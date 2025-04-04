import { createUser } from '../../api/api.ts';
import login from '../pages/login.ts';
import home from '../pages/home.ts';
import category from '../pages/category.ts';
import { faker } from '@faker-js/faker';

const baseUrl = 'https://club-administration.qa.qubika.com/#/auth/login';
const categoryPrefix = 'Daniel category ';
const subcategoryPrefix = 'Daniel subcategory '
const categoryCreatedMessage = 'Tipo de categoría adicionada satisfactoriamente'


describe('Qubika Sports Club Management tests - ' + baseUrl, () => {
    let createdUser: { email: string, password: string };
    before(async () => {
        await browser.url(baseUrl);
        await browser.maximizeWindow();
    });

    it('Create a new category and subcategory', async () => {
        // Step 1: Create a new user through API and save the user information
        createdUser = await createUser();
        console.log('Created user:', createdUser);  

        // Step 2: Validate that the login page is displayed correctly
        expect(await login.usernameInput.isDisplayed()).toBe(true);
        expect(await login.passwordInput.isDisplayed()).toBe(true);
        expect(await login.loginBtn.isDisplayed()).toBe(true);

        // Step 3: Log in with the created user
        await login.login(createdUser.email, createdUser.password);

        // Step 4: Validate that the user is logged in
        const isLoggedIn = await home.isDashboardMenuVisible();
        expect(isLoggedIn).toBe(true);

        // Step 5: Go to the Category page
        await home.clickCategory();

        // Step 6: Create a new category and validate that the category was created successfully
        const categoryTitle = categoryPrefix + faker.lorem.words(2);
        await category.clickAdittion();
        await category.createCategory(categoryTitle);
        await category.isCategoryCreated(categoryCreatedMessage);

        // Step 7: Create a sub category and validate it is displayed in the Categories list
        const subCategoryTitle = subcategoryPrefix + faker.lorem.words(2);
        await category.clickAdittion();
        await category.createSubcategory(subCategoryTitle, categoryTitle);
        await browser.pause(100);
        await category.isCategoryCreated(categoryCreatedMessage);

        // await category.clickPageNearToEnd(); // Not the best way to do it, but the app is kinda buggy. No search, no filters, the only way is to check ALL the pages until the subcategory appears...
        await category.goToLastPage();
        await category.validateNewEntry(subCategoryTitle);
    });
});

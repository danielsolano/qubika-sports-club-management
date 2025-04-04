class CategoryPage {

    get aditionButton() {
        return $('button=Adicionar');
    }

    get categoryInput() {
        return $('#input-username');
    }

    get checkboxSubcategory() {
        return $('label.custom-control-label=Es subcategoria?');
    }

    get subCategoryInput() {
        return $('div.ng-input input[type="text"]');
    }

    get acceptButton() {
        return $('button=Aceptar');
    }

    get createCategoryButton() {
        return $('#createCategoryButton');
    }

    get toastContainer() {
        return $('#toast-container');
    }

    get nextButton() {
        return $('li.page-item a.page-link i.fas.fa-angle-right');
    }

    get nearToEndButton() {
        return $(`//li[contains(@class, 'page-item')]/a[text()="328"]`);
    }

    async clickAdittion() {
        await this.aditionButton.click();
    }

    async clickCheckboxSubcategory() {
        await this.checkboxSubcategory.click();
    }

    async createCategory(categoryName: string) {
        await this.categoryInput.setValue(categoryName);
        await this.acceptButton.click();
    }

    async isCategoryCreated(expectedText: string) {
        await this.toastContainer.waitForDisplayed({ timeout: 5000 });
        const actualText = await this.toastContainer.getText();

        if (actualText !== expectedText) {
            throw new Error(`Message is not the same. Expected: "${expectedText}", found: "${actualText}"`);
        }
        console.log(`Message is correct: "${actualText}"`);
    }

    async createSubcategory(subcategoryName: string, categoryName: string) {
        await this.categoryInput.setValue(subcategoryName);
        await this.clickCheckboxSubcategory();
        await this.subCategoryInput.setValue(categoryName);
        await browser.pause(1000);
        await this.subCategoryInput.addValue('\uE007');
        await browser.pause(2000);
        await this.acceptButton.click();
    }

    async clickPageNearToEnd() {
        await this.nearToEndButton.click();
    }

    async goToLastPage() {
        let lastPage = false;
        while (!lastPage) {
            try {
                const isClickable = await this.nextButton.isClickable();

                if (isClickable) {
                    await this.nextButton.click();
                    await browser.pause(500);
                } else {
                    lastPage = true;
                }
            } catch (err) {
                console.warn("Next button not clickable");
                lastPage = true;
            }
        }
    }

    async validateNewEntry(expectedText: string) {
        const row = await $(`//tbody/tr/td[contains(text(), '${expectedText}')]`);
        expect(await row.isDisplayed()).toBe(true);
    }
}

export default new CategoryPage();

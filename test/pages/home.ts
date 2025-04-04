import { $ } from '@wdio/globals';

class HomePage {

    get dashboardMenu() {
        return $('#sidenav-collapse-main');
    }

    get categoryLink() {
        return $('a=Tipos de Categorias');
    }

    async isDashboardMenuVisible() {
        const isVisible = await this.dashboardMenu.isDisplayed();
        return isVisible;
    }

    async clickCategory() {
        await this.categoryLink.click();
    }
}

export default new HomePage();

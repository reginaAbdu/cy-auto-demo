export class ScoreConfigPopUp {

    getUpdateButton() {
        return cy.xpath("//div[@class = 'popup-footer']//button[contains (@class, 'confirm_update_risk')]")
    }

    getCancelButton() {
        return cy.xpath("//div[@class = 'popup-footer']//button[contains (@class, 'popup-close-trigger')]")
    }

    getCrossButton() {
        return cy.xpath("//span[contains (@class, 'popup-close-trigger')]")
    }

}


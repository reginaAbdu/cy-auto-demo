/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

export class AlertGroupingPopUp {


    getGroup1Button() {
        return cy.xpath("//input[@type = 'radio' and @id = 'group-1']");
    }

    getGroup2Button() {
        return cy.xpath("//input[@type = 'radio' and @id = 'group-2']");
    }

    getGroup3Button() {
        return cy.xpath("//input[@type = 'radio' and @id = 'group-3']");
    }

    getGroup4Button() {
        return cy.xpath("//input[@type = 'radio' and @id = 'group-4']");
    }

    getGroup5Button() {
        return cy.xpath("//input[@type = 'radio' and @id = 'group-5']");
    }

    getGroupButton() {
        return cy.xpath("//button[@id = 'ga-btn-group']")
    }

    getCancelButton() {
        return cy.xpath("//button[@id = 'ga-btn-cancel']")
    }

    getCrossButton() {
        return cy.xpath("//span[@id = 'ga-btn-close']")
    }
}



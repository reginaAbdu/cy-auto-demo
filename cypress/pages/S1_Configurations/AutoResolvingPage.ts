/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

export class AutoResolvingPage {

    getS1AlertRiskScoreInput() {
       return cy.xpath("//table[@id = 'AutoTable']//input")
    }

    getEditableScore(index: number) {
        return cy.xpath(`//table[@id = 'mainTable']//tbody//tr[${index}]/td[@class = 'score-container']/input`)
    }

    getCancelButton() {
        return cy.get("button[class *= 'cancel']")
    }

    getUpdateButton() {
        return cy.get("button[class *= 'submit']")
    }

    getApplyButton() {
        return cy.get("button[class *= 'ApplyIOC']")
    }
    
}
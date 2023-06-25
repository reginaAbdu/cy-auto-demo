/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

export class RiskScorePage {

    id = 'mainTable'
    tableHeaders = ['Field', 'Condition', 'Score']
    validMessage = 'Invalid format. Please, enter only numbers up to 5 characters long or use the minus sign for negative numbers.'

    getTab(index: number) {
       return cy.get(`a[id = 'tab-btn-${index}']`)
    }

    getEditableScore(index: number) {
        return cy.xpath(`//table[@id = 'mainTable']//tbody//tr[${index}]/td[@class = 'score-container']/input`)
    }

    getAgentVersion(index:number) {
        return cy.xpath(`//table[@id = 'mainTable']//tbody//tr[${index}]/td[contains(@class, 'version')]/input`)
    }

    getAgentVersionError(index:number) {
        return cy.xpath(`//table[@id = 'mainTable']//tbody//tr[${index}]/td[contains(@class, 'version-container error')]/input`)
    }

    getEditableScoreError(index: number) {
        return cy.xpath(`//table[@id = 'mainTable']//tbody//tr[${index}]/td[@class = 'score-container error']/input`)
    }

    getUpdateButton() {
        return cy.get("button[class *= 'update_risk_scores_btn submit']")
    }

    getCancelButton() {
        cy.get("button[class *= 'btnc cancel-btn']")
    }

    getRiskScoreTab() {
        return this.getTab(1)
    }

    getAutoResolvingTab() {
        return this.getTab(2)
    }

    getActivityLogs() {
        return this.getTab(3)
    }

}

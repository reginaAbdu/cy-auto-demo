/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

export class AlertInvestigationPage {

    getGroupedTab() {
        return cy.xpath("//a[contains(text(), 'Grouped')]")
    }

    getUngroupedTab() {
        return cy.xpath("//a[contains(text(), 'Ungrouped')]")
    }

    getResolvedTab() {
        return cy.xpath("//a[contains(text(), 'Resolved')]")
    }

    getEscalateButton() {
        return cy.xpath('//*[@id="grouped-tab-content"]/div[2]/div/div/button[2]')
        
    }

    getResolveButton() {
        return cy.xpath("//button[contains(text(), 'Resolve')]")
    }

    getElevateButton() {
        return cy.xpath("//button[contains(text(), 'Elevate')]")
    }

    getUngroupedCheckbox(threatId) {
        return cy.xpath(`//input[@value = "${threatId}"]`)
    }

    getGroupButton() {
        return cy.xpath("//button[@id= 'btn-group']")
    }

    getReleaseButton() {
        return cy.xpath("//button[@id= 'btn-release']")
    }

    getAlertIdOnGroupedTab() {
        return cy.xpath("//td[@class = 'column-alert-id']/a")
    }

    getH2() {
        return cy.xpath("//h2")
    }
}

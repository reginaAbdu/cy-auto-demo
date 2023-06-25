/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
export class TriagePage {
    getMessage() {
        return cy.xpath("//tbody//tr[1]//span")
    }
    visit() {
        cy.visit('/DCR/Triage.php')
    }
}
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

export class S1StatsPage {

    getStartDateInput() {
        return cy.xpath("//input[@id = 'startDate']")
    }

    getEndDateInput() {
        return cy.xpath("//input[@id = 'endDate']")
    }

    getApplyButton() {
        return cy.xpath("//input[@type = 'submit' and @value = 'Apply']")
    }

    getExportAlertDetailsButton() {
        return cy.xpath("//a[text()= ' Export Alert Details']")
    }
}
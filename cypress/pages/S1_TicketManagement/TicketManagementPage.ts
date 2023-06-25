/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

export class TicketManagementPage {

    getSerialNumber() {
        return cy.xpath(`//tbody/tr/td[1]`)
    }
}
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

export class CompanyAlertSummaryPage {

    getTitle() {
        return cy.xpath("h1")
    }

    getTableNames() {
        return cy.xpath("//thead/tr/th")
    }

    getTableEntriesCount() {
       return cy.xpath('//tbody/tr')
    }

    getTableEntry(index) {
        return cy.xpath(`//tbody/tr[${index}]`)
    }

    getSerialNumber() {
        return cy.xpath(`//tbody/tr/td[1]`)
    }

    getConsoleName() {
        return cy.xpath('//tbody/tr/td[2]')
    }

    getOrgName() {
        return cy.xpath('//tbody/tr/td[3]')
    }

    getSiteName() {
        return cy.xpath('//tbody/tr/td[4]')
    }

    getRiskScore() {
        return cy.xpath('//tbody/tr/td[5]')
    }

    getAlertCount() {
        return cy.xpath('//tbody/tr/td[6]')
    }

    getSLA() {
        return cy.xpath('//tbody/tr/td[7]')
    }

    getAnalyst() {
        return cy.xpath('//tbody/tr/td[8]')
    }

    getStatus() {
        return cy.xpath('//tbody/tr/td[9]')
    }

    getAction() {
        return cy.xpath('//tbody/tr/td[10]')
    }

    getonHoverAnalysts() {
        return cy.xpath('')
    }

    getClaimButton() {
        return cy.xpath("//button[@class = 'claim' and @data-org-id = '8303185023000000000']")
    }

    getShowMyAlertsButton() {
        return cy.xpath("//button[@class = 'show-my-alerts' and @data-org-id = '8303185023000000000']")
    }

    
    getTableValues(i:number) {
        return cy.xpath(`//tbody/tr[${i}]/td`)
    }
    
}
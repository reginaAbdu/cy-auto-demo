/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

export class EscalationPopup {

    visit(orgname) {
        cy.visit(`/DCR/AlertResolving.php?org_name=${orgname}`)
    }

    getAnalystVerdictDropDown () {
        return cy.xpath('select[id *= "analyst-verdict"]');
    }

    getTicketTemplateDropDown() {
        return cy.xpath('select[id *= "ticket-template"]')
    }

    getFromDropDown() {
        return cy.xpath("//select[@id = 'from']")
    }

    getToDropDown() {
        return cy.xpath('span[id *= "select2-to-container"]')
    }

    getToInput() {
        return cy.xpath('input[class *= "select2-search__field"]')
    }

    getSubjectInput() {
        return cy.xpath('input[id = "subject"]')
    }

    getPriorityDropDown() {
        return cy.xpath("//select[@id = 'priority']")
    }

    getStatusDropDown() {
        return cy.xpath("//select[@id = 'status']")
    }

    getGroupDropDown() {
        return cy.xpath("//select[@id = 'group']")
    }

    getTicketResolutionDropDown() {
        return cy.xpath("//select[@id = 'ticket-resolution-type']")
    }

    getButtonSend() {
        return cy.xpath("//button[@id = 'btn-send']")
    }

    getButtonCancel() {
        return cy.xpath("//button[@id = 'btn-cancel']")
    }
 
}
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

export class EscalationPopup {

    visit(orgname) {
        cy.visit(`/DCR/AlertEscalation.php?org_name=${orgname}`)
    }

    getAnalystVerdictDropDown () {
        return cy.get('select[id *= "analyst-verdict"]');
    }

    getTicketTemplateDropDown() {
        return cy.get('select[id *= "ticket-template"]')
    }

    getFromDropDown() {
        return cy.xpath("//select[@id = 'from']")
    }

    getToDropDown() {
        return cy.get('span[id *= "select2-to-container"]')
    }

    getToInput() {
        return cy.get('input[class *= "select2-search__field"]')
    }

    getToOption() {
        return cy.xpath("//li[@role = 'option']")
    }

    getSubjectInput() {
        return cy.get('input[id = "subject"]')
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
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import { TicketManagementPage } from "../S1_TicketManagement/TicketManagementPage";
import { AlertInvestigationPage } from "./AlertInvestigationPage";
import { CompanyAlertSummaryPage } from "./CompanyAlertSummaryPage";
import { S1StatsPage } from "../S1_Stats/S1StatsPage";
import { RiskScorePage } from "../S1_Configurations/RiskScorePage";
import { AutoResolvingPage } from "../S1_Configurations/AutoResolvingPage";
import { ActivityLogsPage } from "../S1_Configurations/AcitivityLogsPage";


export class MainPage {
   route : string

    constructor(route: string) {
        this.route = route
    }

    visit() {
        const {route} = this
        cy.visit(route)
    }


    get companyalertsummaryPage() {
        return new CompanyAlertSummaryPage()
    }

    get alertinvestigationPage() {
        return new AlertInvestigationPage()
    }

    get ticketmanagementPage() {
        return new TicketManagementPage()
    }

    get statsPage() {
        return new S1StatsPage()
    }

    get riskScorePage() {
        return new RiskScorePage()
    }

    get autoResolvingPage() {
        return new AutoResolvingPage()
    }

    get activityLogsPage() {
        return new ActivityLogsPage()
    }

    getH3Title() {
        return cy.get("h3")
    }

    getTableNames(id: string) {
        return cy.xpath(`//table[@id = '${id}']//thead/tr/th`)
    }

    getText(elements) {
        return Cypress._.map(Cypress.$.makeArray(elements), 'innerText')
    }

    getTitle(title: string) {
        return cy.get("h1").should('have.text', title)
    }

    getTypeOf(elements) {
        return elements.map((el) => typeof(el))
    }

    getTableValues(i:number) {
        return cy.xpath(`//tbody/tr/td[${i}]`)
    }

    isAscending(arr) {
        return arr.every(function (x:number, i:number) {
            return i === 0 || x >= arr[i-1];
        })
    }
}
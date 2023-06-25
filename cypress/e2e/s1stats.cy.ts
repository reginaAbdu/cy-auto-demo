/// <reference types="cypress" />
/// <reference types = "cypress-xpath"/>
import {TriagePage} from "../pages/TriagePage"
import {LoginPage} from "../pages/LoginPage"
import {MainPage} from "../pages/S1_Alerts/Main"
import {SITE_ROUTES} from "../constants/routes"
import {BASIC_AUTH} from "../constants/user"
import {ELEMENTS} from "../constants/elements"
import {Element} from "../pages/elements/Element"
import { threadId } from "worker_threads"


describe.skip('S1 Stats', () => {
    const mainPage = new MainPage(`${SITE_ROUTES.stats}`)
    const {statsPage} = mainPage
    const title = 'S1 Stats'
    const day = new Date().toLocaleDateString().split('/')
    const today = day[2] + '-' + (parseInt(day[0]) < 10 ? '0' + parseInt(day[0])  : (parseInt(day[0]).toString())) + '-' + (parseInt(day[1]) < 10 ? '0' + parseInt(day[1])  : (parseInt(day[1]).toString()))
    const startDate = day[2] + '-' + (parseInt(day[0])-1 < 10 ? '0' + (parseInt(day[0]) -1) : (parseInt(day[0])-1).toString())+ '-' + (parseInt(day[1]) < 10 ? '0' + parseInt(day[1])  : (parseInt(day[1]).toString()))
    const fileName = `Autoresolved Threats from ${startDate} to ${today}.xlsx`
    const tableNames = ['S1 console name', 'Total count of alerts']
    beforeEach(() => {
    cy.login(BASIC_AUTH.username, BASIC_AUTH.password)
    Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })})

  it('should verify end date equals to today', () => {
    mainPage.visit()
    const values = mainPage.getTableValues(2)
    statsPage.getEndDateInput().should('have.attr', 'value',today)
    statsPage.getStartDateInput().should('have.attr', 'value',startDate)
    statsPage.getExportAlertDetailsButton().click()
    const inputFilePath = `../tests/cypress/downloads/Autoresolved Threats from ${startDate} to ${today}.xlsx`
    mainPage.getTableValues(2).then($elms  => {
      const values = mainPage.getText($elms)
      const  alertsNumber = values.reduce((prev, next) => parseInt(prev) + parseInt(next))  
      cy.parseXlsx(inputFilePath).then(
        jsonData => {
          expect(jsonData[0].data.length -1).to.equal(alertsNumber) 
          // expect(jsonData[0].data[1]).to.contain("carvir-bigben") 
        }
      )
    })
   
    // cy.task('readXlsx', { file: fileName, sheet: "Sheet1" }).then((rows) => {
    //     expect(rows.length).to.equal(6)
    //     // expect(rows[0]["column name"]).to.equal(11060)
    //   })
    // cy.task('deleteXlsx', ('stratozen/tests/cypress/downloads/Autoresolved Threats from 2022-09-22 to 2022-10-22.xlsx') )
  })

  it('should verify end date equals to today', () => {
    mainPage.visit()
    statsPage.getStartDateInput().type('12132021')
    const values = mainPage.getTableValues(2)
    statsPage.getEndDateInput().should('have.attr', 'value',today)
    statsPage.getExportAlertDetailsButton().click()
    const inputFilePath = `../tests/cypress/downloads/Autoresolved Threats from 2022-12-13 to ${today}.xlsx`
    mainPage.getTableValues(2).then($elms  => {
      const values = mainPage.getText($elms)
      const  alertsNumber = values.reduce((prev, next) => parseInt(prev) + parseInt(next))  
      cy.parseXlsx(inputFilePath).then(
        jsonData => {
          expect(jsonData[0].data.length -1).to.equal(alertsNumber) 
          // expect(jsonData[0].data[1]).to.contain("carvir-bigben") 
        }
      )
    })
   
    // cy.task('readXlsx', { file: fileName, sheet: "Sheet1" }).then((rows) => {
    //     expect(rows.length).to.equal(6)
    //     // expect(rows[0]["column name"]).to.equal(11060)
    //   })
    // cy.task('deleteXlsx', ('stratozen/tests/cypress/downloads/Autoresolved Threats from 2022-09-22 to 2022-10-22.xlsx') )
  })

})
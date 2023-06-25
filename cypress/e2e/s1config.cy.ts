/// <reference types="cypress" />
/// <reference types = "cypress-xpath"/>
import {MainPage} from "../pages/S1_Alerts/Main"
import {SITE_ROUTES} from "../constants/routes"
import {BASIC_AUTH} from "../constants/user"
import {ELEMENTS} from "../constants/elements"
import {Element} from "../pages/elements/Element"
import { threadId } from "worker_threads"



describe.skip('SFP-751', () => {
    const element = new Element()
    const {scoreConfigPopUp} = element
    const mainPage = new MainPage(`${SITE_ROUTES.configs}`)
    const {activityLogsPage, riskScorePage} = mainPage
    const invalidInputText = ['123456', '025', '', '-123456', ' 12345', '123 45', '12345 ', 'qwer', '21qwe', 'qe123','q123r', '13qe1', '123.12', '.0', '0.', '1234.', ',', '~!@#$%^&*()_+=/-][{}:.,<>?', '1.2e+2', '0xba']
    const validInputText = ['12345', '-12345']
    const query = `SELECT analyst_verdict_updated_at  FROM  s1_threats WHERE site_name = "test_site_aqa" and threat_id ="${alertID}"`

    cy.task('executeSql', query).then(result => {
      expect(result.analyst_verdict_updated_at, `Current time`).to.equal(currentTime);
  })
    beforeEach(() => {
    cy.login(BASIC_AUTH.qa.username, BASIC_AUTH.qa.password)
    Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })})

    it('should check Activity Logs table names', () => {
        mainPage.visit()
        mainPage.getTitle(activityLogsPage.title)
        mainPage.getTableNames(riskScorePage.id).then($elms => {
            const names = mainPage.getText($elms)
            expect(names).to.have.ordered.members(riskScorePage.tableHeaders)
        })
    })

    it('should check validation of invalid input fields on Risk Score page', () => {
        mainPage.visit()
        for(let i = 1; i < 76; i++ ) {
        riskScorePage.getEditableScore(i).clear().type(invalidInputText[0])   
        expect(riskScorePage.getEditableScoreError(i)).to.exist
        riskScorePage.getUpdateButton().invoke('attr', 'title').should('eq', 'Please, update a value to apply the action')
            }
        
    
    })

    it.only('should check validation of valid input fields on Risk Score page', () => {
        mainPage.visit()
        for(let i = 1; i < 73; i++ ) {
        riskScorePage.getEditableScore(i).clear().type(inputText[0])   
        expect(riskScorePage.getEditableScoreError(i)).to.exist
        riskScorePage.getUpdateButton().invoke('attr', 'title').should('eq', 'Please, update a value to apply the action')
            }
        
    
    })

    
})

describe.only('Retrieving alert_id', () => {
    const element = new Element()
    const {scoreConfigPopUp} = element
    const mainPage = new MainPage(`${SITE_ROUTES.configs}`)
    const {activityLogsPage, riskScorePage} = mainPage
    const invalidInputText = ['123456', '025', '', '-123456', ' 12345', '123 45', '12345 ', 'qwer', '21qwe', 'qe123','q123r', '13qe1', '123.12', '.0', '0.', '1234.', ',', '~!@#$%^&*()_+=/-][{}:.,<>?', '1.2e+2', '0xba']
    const validInputText = ['12345', '-12345']
    const query = `SELECT threat_id  FROM  s1_threats LIMIT 100`

    cy.task('executeSql', query).then(result => {
    //   expect(result.analyst_verdict_updated_at, `Current time`).to.equal(currentTime);
    cy.log(result)
  })
})

/// <reference types="cypress" />
import {BASIC_AUTH} from "../constants/user"
Cypress.Commands.add('login', (email, username) => {
    cy.visit('/zen/login.php')
    cy.get('#email').type(email)
    cy.get('#password').type(username)
    cy.get("button[id = 'password_submit']").click()
 })

Cypress.Commands.add('getIframe', () => {
  return  cy.get('iframe[id *= "tiny_ifr"]').its('0.contentDocument.body').should('be.visible')
    .then(cy.wrap)
 })

Cypress.Commands.add('createAlert', () => {
    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    cy.request({
      method: 'POST',
      url: '/configuration/api/threats', // baseUrl is prepend to URL
      body: {
        "s1ConsoleId": "test_aqa",
        "s1ConsoleUrl": "https://carvir-msp.sentinelone.net",
        "threatId": `testendpointsAQA${id}`,
        "threatName": "testendpoints",
        "classification": "ransomware",
        "createdAt": "2022-11-03T17:11:03.684861Z",
        "engines": [
            "Documents, Scripts"
        ],
        "indicators": [
            {
                "category": "Ransomware",
                "description": "Deletes shadow copy.",
                "tactics": [
                    {
                        "name": "Credential Access",
                        "source": "MITRE"
                    },
                    {
                        "name": "Resource Development",
                        "source": "MITRE",
                        "techniques": [
                            {
                                "link": "https://attack.mitre.org/techniques/T1588/004/",
                                "name": "T1588.004"
                            }
                        ]
                    }
                ]
            }
        ],
        "analystVerdict": "false_positive",
        "mitigationStatusDescription": "Mitigated",
        "incidentStatus": "unresolved",
        "mitigationActions": [
            {
                "action": "remediate",
                "actionsCounters": {
                    "success": 6,
                    "total": 6
                },
                "status": "success"
            },
            {
                "action": "quarantine",
                "actionsCounters": {
                    "success": 1,
                    "total": 1
                },
                "status": "pending"
            },
            {
                "action": "kill",
                "actionsCounters": {
                    "success": 3,
                    "total": 3
                },
                "status": "success"
            },
            {
                "action": "rollback",
                "status": "fail"
            },
            {
                "action": "unquarantine",
                "status": "pending"
            }
        ],
        "identifiedAt": "2022-11-03T17:11:02.026000Z",
        "filePath": "\\Users\\HarddiskVolume2\\S1DemoToolkit\\Demo01\\Demo01.ods",
        "maliciousProcessArguments": "\"-o\" \"C:\\S1DemoToolKit\\Demo01\\Demo01.ods\" \"-env:OOO_CWD=2C:\\\\S1DemoToolKit\\\\Demo01\"",
        "processUser": "DESKTOP-0SIQPI6\\sentinelTest",
        "publisherName": "test",
        "certificateId": "test",
        "fileVerificationType": "NotSigned",
        "originatorProcess": "soffice.exe",
        "sha1": "8a9eaf8486935e92dbc48c80dfd941003b6b6f94",
        "detectionType": "static",
        "fileSize": 15831,
        "accountId": "8303185023000000000",
        "accountName": "test_org_aqa",
        "siteId": "11238134273305632661",
        "siteName": "test_site_aqa",
        "groupId": "1123813427338951875",
        "groupName": "Default Test Group",
        "initiatedByDescription": "Agent Policy",
        "riskScore": 10000,
        "operatingSystem": "windows11",
        "agentId": "645885917518993903",
        "agentUuid": "8fa6b8f2089e4e4f907132d2b95f6d52",
        "agentComputerName": "DESKTOP-TEST-ENDPOINT",
        "agentIsActive": true,
        "agentNetworkStatus": "connected",
        "agentPolicy": "protect",
        "agentIsPendingReboot": true,
        "agentVersion": "21.6.5.1072"
    },
    })
  })

Cypress.Commands.add('parseXlsx', (inputFile) => {
    return cy.task('parseXlsx', { filePath: inputFile })
    })


// Cypress.Commands.add('login', () => {
//         cy.request({
//             url: '/zen/login.php',
//             method: 'POST',
//             body: {
//                 email: BASIC_AUTH.username,
//                 password: BASIC_AUTH.password,
//             }
//         }).its('body.token').then(token => {
//             cy.visit('/', {
//                 onBeforeLoad(win) {
//                     win.sessionStorage.setItem('token', token);
//                 }
//             })
//         })
//     }
// )
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
    
    }
  }
}
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


describe.skip('SFP-751', () => {
    const element = new Element()
    const loginPage = new LoginPage()
    const triagePage = new TriagePage()
    const {escalationPopUp} = element
    const mainPage = new MainPage(`${SITE_ROUTES.alerts}`)
    const {companyalertsummaryPage, alertinvestigationPage} = mainPage
    const title = 'Company Alert Summary'
    const triageMessage = 'Keep up the fantastic work and escalations. Please continue to work DCR from the top down.'
    const tableNames = ['№', 'S1 Console Name', 'Org Name', 'Site Name', 'Risk Score', 'Alert Count', 'SLA', 'Analyst', 'Status', 'Action']
    beforeEach(() => {
    cy.login(BASIC_AUTH.username, BASIC_AUTH.password)
    Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })})

  it('should create alert', () => {

    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    cy.request({
      method: 'POST',
      url: '/configuration/api/threats', // baseUrl is prepend to URL
      body: {
        "s1ConsoleId": "test_url",
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
        "accountId": "8303185023694986661",
        "accountName": "test_org_1",
        "siteId": "11238134273305632661",
        "siteName": "test_site_1",
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
    // mainPage.visit()
    // cy.xpath("//button[@class = 'show-my-alerts']").click()
    
    cy.visit('https://sz2.dev.thesoc.us/DCR/AlertInvestigation.php?org_id=8303185023694986661&site_id=11238134273305632661#grouped')
    alertinvestigationPage.getGroupedTab().click()
    
    let newUrl = `https://sz2.dev.thesoc.us/DCR/AlertEscalation.php?org_name=Test1`;
    cy.window().then((win) => {
    cy.stub(win, 'open').as('windowOpen').callsFake(url => {
    newUrl = url;
  });
    })
    alertinvestigationPage.getEscalateButton().click()
    cy.get('@windowOpen').should('be.called');
    cy.visit(newUrl)
    cy.get('select[id *= "analyst-verdict"]').select(1, {force : true})
    cy.get('select[id *= "ticket-template"]').select(1, {force : true})
    cy.get('input[id = "subject"]').type('Test AQA')
    // cy.get('span[id *= "select2-to-container"]').click({force : true})
    // cy.get('input[class *= "select2-search__field"]').type('sabuhi {enter}')
    cy.wait(10000)
    cy.getIframe().clear().type('This is test AQA')
    cy.wait(10000)
    escalationPopUp.getButtonSend().click()
    cy.wait(10000)
    })
   
  
    it('should display greeting message on triage page', () => {
      triagePage.visit()
      triagePage.getMessage().should('have.text', triageMessage)
    })

    it('should display the title of company alert page', () => {
      mainPage.visit()
      mainPage.getTitle(title)
    })

    it('should display the titles of table', () => {
      mainPage.visit()
      companyalertsummaryPage.getTableNames().then(($els) => {
        const parsedTableNames = mainPage.getText($els)
        expect(parsedTableNames).to.have.ordered.members(tableNames)
      })

    })

    it('should display ascending serial number', () => {
      mainPage.visit()
      companyalertsummaryPage.getSerialNumber().then($elms => {
        const serialNumbers = mainPage.getText($elms)
        expect(mainPage.isAscending(serialNumbers)).to.be.true
      })

    })

    it('should display SLA value as integer', () => {
      mainPage.visit()
      companyalertsummaryPage.getSLA().then($elms => {
        const sla = mainPage.getText($elms)
        sla.forEach(element => {
          expect(parseInt(element)).to.not.be.NaN
        });
      })

    })

    it('should display rows marked in red if SLA count is 1 and more', () => {
      mainPage.visit()
      companyalertsummaryPage.getTableEntriesCount().then($elms => {
      const count = $elms.length
      companyalertsummaryPage.getSLA().then($elms => {
        const sla = mainPage.getText($elms)
        sla.forEach(element => {
          if (parseInt(element) > 0) {
            const index = sla.indexOf(element) + 1
            const redEntry = companyalertsummaryPage.getTableEntry(index).should('have.class','sla-highlight-red')
                                      .should('have.css', 'background-color', 'rgb(139, 0, 0)')          
          }
          else if (element === '0') {
            const index = sla.indexOf(element) + 1
            const regularEntry = companyalertsummaryPage.getTableEntry(index).should('have.css', 'background-color', 'rgba(0, 0, 0, 0)') 
                                      
          }
        });
      })
     })
     })

    it('should display analysts name on hover if analyst value >= 2', () => {
      mainPage.visit()
      companyalertsummaryPage.getAnalyst().then($elms => {
        const analysts = mainPage.getText($elms)
        analysts.forEach(analyst => {
            if(parseInt(analyst)!= NaN) {
              const indices = []
              let index = analysts.indexOf(analyst) +1
              indices.push(index)
              // while(index != -1) {
              //   indices.push(index)
              //   index = analyst.indexOf(analyst, index +1)
              // }
              indices.forEach(idx => {
                 const analystsNames = $elms[idx].getAttribute('title')
                 cy.log(analystsNames)
              })
            }

            })

        })
  
      })
     })

describe.skip('SFP-7438', () => {
      const mainPage = new MainPage(`${SITE_ROUTES.templates}`)
      const {ticketmanagementPage} = mainPage
      const title = 'Ticket Template Management'
      const tableNames = ['№', 'Subject', 'Updated By', 'Last Updated On (UTC)', 'Ticket View', 'Status']
      beforeEach(() => {
      cy.login(BASIC_AUTH.username, BASIC_AUTH.password)
      Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })})
  
     
    
      it('should display the correct title', () => {
        mainPage.visit()
        mainPage.getTitle(title)
      })

      
    it('should display ascending serial number', () => {
      mainPage.visit()
      ticketmanagementPage.getSerialNumber().then($elms => {
        const serialNumbers = mainPage.getText($elms)
        expect(mainPage.isAscending(serialNumbers)).to.be.true
      })

    })

    it('should display the titles of table', () => {
      mainPage.visit()
      mainPage.getTableNames().then(($els) => {
        const parsedTableNames = mainPage.getText($els)
        expect(parsedTableNames).to.have.ordered.members(tableNames)
      })

    })

    


    })

describe.skip('SFP-T973', () => {
      const element = new Element()
      const loginPage = new LoginPage()
      const triagePage = new TriagePage()
      const {escalationPopUp, alertGroupingPopUp} = element
      const mainPage = new MainPage(`${SITE_ROUTES.alerts}`)
      const {companyalertsummaryPage, alertinvestigationPage} = mainPage
      const title = 'Company Alert Summary'
      const org = 'test_org_aqa'
      beforeEach(() => {
        cy.viewport(500, 660)
      cy.login(BASIC_AUTH.username, BASIC_AUTH.password)
      Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })})

    
    it('should display SLA value as integer', () => {
      mainPage.visit()
      companyalertsummaryPage.getClaimButtonfortest_org_1().click()
      mainPage.getTitle('Alert Investigation')
      alertinvestigationPage.getH2().then($elms => {
        const h2 = mainPage.getText($elms)
        const str = h2[0].split(';').map(el => el.replaceAll('&emps', '')).join(';')
        str.should.include(" Org Name: Test1" )
      })
    })

    it.only('should create alert', () => {
      const currentTime = Math.floor(Date.now() /1000)
      cy.createAlert().then((response) => {
        const threatid = response.body.threat_id
        const query = `select count(threat_id) as cnt from s1_threats where org_name like 'test_org_aqa' and threat_id like '${threatid}';`

        cy.task('executeSql', query).then(result => {
          expect(result.cnt, 'Is unique threat id').to.equal(1);
      })
        mainPage.visit()
        companyalertsummaryPage.getClaimButton().click({force: true})
        cy.wait(10000)
        alertinvestigationPage.getUngroupedCheckbox(threatid).click()
        alertinvestigationPage.getGroupButton().click()
        alertGroupingPopUp.getGroup5Button().click()
        alertGroupingPopUp.getGroupButton().click()
      })
      
      alertinvestigationPage.getGroupedTab().click({force: true})
      alertinvestigationPage.getAlertIdOnGroupedTab().invoke('text').as('alertID')
      
      let newUrl = `https://sz2.dev.thesoc.us/DCR/AlertEscalation.php?org_name=test_org_aqa`;
      cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen').callsFake(url => {
      newUrl = url;
    });
      })
      alertinvestigationPage.getEscalateButton().click({force: true})
      cy.get('@windowOpen').should('be.called');
      cy.visit(newUrl)
      cy.wait(40000)
      escalationPopUp.getAnalystVerdictDropDown().select(1, {force : true})
      escalationPopUp.getSubjectInput().type('Test AQA')
      cy.wait(5000)
      cy.getIframe().clear().type('This is test AQA')
      cy.wait(5000)
      escalationPopUp.getButtonSend().click()
      cy.wait(10000)
    
      cy.get('@alertID').then(alertID => {

    
      const query = `SELECT analyst_verdict_updated_at  FROM  s1_threats WHERE site_name = "test_site_aqa" and threat_id =	"${alertID}"`

      cy.task('executeSql', query).then(result => {
        expect(result.analyst_verdict_updated_at, `Current time`).to.equal(currentTime);
    })
  })
  })

  it('Update an Entry into the table and verify', function () {
    const dbName = 'stagingA'
    const query = 'SELECT * FROM s1_scores_configs LIMIT 1'

    cy.task('executeSql', query).then(result => {
      expect(result.agent_mode_not_protect, 'Does not equal to 8').to.equal(1000);
  })
})
  })





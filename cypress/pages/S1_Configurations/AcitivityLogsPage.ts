export class ActivityLogsPage {

    title = 'SentinelOne Configurations'
    id = 'ActivityTable'
    tableHeaders = ['UTC Time', 'MTZ Time', 'User Name', 'User Email', 'Section', 'Activity']

    getPaginationArrow(index: number) {
       return cy.get("ul[class = 'ActivityLogsPagination'] li").eq(index)
    }

    setRowsToShowDropDown(rowNumber: number) {
        cy.get("select[id= 'showSelectedRows']").select(`${rowNumber} rows`).should('have.value', rowNumber)
    }

    getActivePage(index: number) {
        cy.get("ul[class = 'ActivityLogsPagination'] li").eq(index).click().should('have.class', 'currentPage')
    }
}

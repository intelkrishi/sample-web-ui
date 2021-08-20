//Tests the creation of a device
const apiResponses = require("../../fixtures/apiResponses.json")
const deviceFixtures = require("../../fixtures/device.json")


//---------------------------- Test section ----------------------------

describe("Test Device Page", () => {
    beforeEach("", () => {
        cy.setup()
    })

    it("pagination for next page", () => {
        cy.myIntercept("GET", "devices?$top=5&$skip=0&$count=true", {
            statusCode: apiResponses.devices.getAll.forPaging.code,
            body: apiResponses.devices.getAll.forPaging.response,
        }).as("get-devices")

        cy.myIntercept("GET", /tags$/, {
            statusCode: apiResponses.tags.getAll.success.code,
            body: apiResponses.tags.getAll.success.response,
          }).as("get-tags")

        cy.myIntercept("GET", "devices?$top=5&$skip=5&$count=true", {
            statusCode: apiResponses.devices.getAll.forPaging.code,
            body: apiResponses.devices.getAll.forPaging.response,
        }).as("get-devices2")

        cy.goToPage("Devices")
        cy.get('.mat-paginator').find('.mat-paginator-range-label').contains(`1 – 5 of ${deviceFixtures.totalCount}`)
        cy.wait('@get-devices')

        cy.get('.mat-paginator').find('button.mat-paginator-navigation-next.mat-icon-button').click();
        cy.get('.mat-paginator').find('.mat-paginator-range-label').contains(`6 – 10 of ${deviceFixtures.totalCount}`)
    })

    it("pagination for previous page", () => {

        cy.myIntercept("GET", "devices?$top=5&$skip=0&$count=true", {
            statusCode: apiResponses.devices.getAll.forPaging.code,
            body: apiResponses.devices.getAll.forPaging.response,
        }).as("get-devices3")

        cy.myIntercept("GET", /tags$/, {
            statusCode: apiResponses.tags.getAll.success.code,
            body: apiResponses.tags.getAll.success.response,
          }).as("get-tags2")

          cy.myIntercept("GET", "devices?$top=5&$skip=5&$count=true", {
            statusCode: apiResponses.devices.getAll.forPaging.code,
            body: apiResponses.devices.getAll.forPaging.response,
        }).as("get-devices4")

        cy.goToPage("Devices")
        cy.get('.mat-paginator').find('.mat-paginator-range-label').contains(`1 – 5 of ${deviceFixtures.totalCount}`)
        cy.wait('@get-devices3')

        cy.get('.mat-paginator').find('button.mat-paginator-navigation-next.mat-icon-button').click();
        cy.get('.mat-paginator').find('.mat-paginator-range-label').contains(`6 – 10 of ${deviceFixtures.totalCount}`)
        cy.get('.mat-paginator').find('button.mat-paginator-navigation-previous.mat-icon-button').click();
        cy.get('.mat-paginator').find('.mat-paginator-range-label').contains(`1 – 5 of ${deviceFixtures.totalCount}`)
    })

    it("pagination for last page", () => {

        cy.myIntercept("GET", "devices?$top=5&$skip=0&$count=true", {
            statusCode: apiResponses.devices.getAll.forPaging.code,
            body: apiResponses.devices.getAll.forPaging.response,
        }).as("get-devices5")

        cy.myIntercept("GET", /tags$/, {
            statusCode: apiResponses.tags.getAll.success.code,
            body: apiResponses.tags.getAll.success.response,
          }).as("get-tags3")

          cy.myIntercept("GET", "devices?$top=5&$skip=15&$count=true", {
            statusCode: apiResponses.devices.getAll.forPaging.code,
            body: apiResponses.devices.getAll.forPaging.response,
        }).as("get-devices6")

        cy.goToPage("Devices")
        cy.get('.mat-paginator').find('.mat-paginator-range-label').contains(`1 – 5 of ${deviceFixtures.totalCount}`)
        cy.wait('@get-devices5')

        cy.get('.mat-paginator').find('button.mat-paginator-navigation-last.mat-icon-button').click();
        cy.get('.mat-paginator').find('.mat-paginator-range-label').contains(`16 – 20 of ${deviceFixtures.totalCount}`)
    })

    it("pagination for first page", () => {

        cy.myIntercept("GET", "devices?$top=5&$skip=0&$count=true", {
            statusCode: apiResponses.devices.getAll.forPaging.code,
            body: apiResponses.devices.getAll.forPaging.response,
        }).as("get-devices7")

        cy.myIntercept("GET", /tags$/, {
            statusCode: apiResponses.tags.getAll.success.code,
            body: apiResponses.tags.getAll.success.response,
          }).as("get-tags4")

          cy.myIntercept("GET", "devices?$top=5&$skip=15&$count=true", {
            statusCode: apiResponses.devices.getAll.forPaging.code,
            body: apiResponses.devices.getAll.forPaging.response,
        }).as("get-devices8")

        cy.goToPage("Devices")
        cy.get('.mat-paginator').find('.mat-paginator-range-label').contains(`1 – 5 of ${deviceFixtures.totalCount}`)
        cy.wait('@get-devices7')

        cy.get('.mat-paginator').find('button.mat-paginator-navigation-last.mat-icon-button').click();
        cy.get('.mat-paginator').find('.mat-paginator-range-label').contains(`16 – 20 of ${deviceFixtures.totalCount}`)
        cy.get('.mat-paginator').find('button.mat-paginator-navigation-first.mat-icon-button').click();
        cy.get('.mat-paginator').find('.mat-paginator-range-label').contains(`1 – 5 of ${deviceFixtures.totalCount}`)
    })

})
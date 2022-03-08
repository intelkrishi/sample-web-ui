/*********************************************************************
 * Copyright (c) Intel Corporation 2021
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/
// Tests the creation of a profile
import { apiResponses } from '../../fixtures/api/apiResponses'

const testDelayPowerOn = 30000
const testDelayPowerOff = 5000
const isolated = Cypress.env('ISOLATE').charAt(0).toLowerCase()

// ---------------------------- Test section ----------------------------

describe('Test Device Page', () => {
  beforeEach('', () => {
    cy.setup()
  })

  it('loads all the devices', () => {
    cy.myIntercept('GET', 'devices?$top=25&$skip=0&$count=true', {
      statusCode: apiResponses.devices.getAll.success.code,
      body: apiResponses.devices.getAll.success.response
    }).as('get-devices')

    cy.goToPage('Devices')
    cy.wait('@get-devices').its('response.statusCode').should('eq', 200)
  })

  // UI Only
  it('filters for windows devices', () => {
    if (Cypress.env('ISOLATE').charAt(0).toLowerCase() !== 'n') {
      cy.myIntercept('GET', /tags$/, {
        statusCode: apiResponses.tags.getAll.success.code,
        body: apiResponses.tags.getAll.success.response
      }).as('get-tags')

      cy.myIntercept('GET', 'devices?$top=25&$skip=0&$count=true', {
        statusCode: apiResponses.devices.getAll.tags.code,
        body: apiResponses.devices.getAll.tags.response
      }).as('get-devices2')

      cy.myIntercept('GET', '**/devices?tags=Windows&$top=25&$skip=0&$count=true', {
        statusCode: apiResponses.devices.getAll.windows.code,
        body: apiResponses.devices.getAll.windows.response
      }).as('get-windows')

      cy.goToPage('Devices')
      cy.wait('@get-tags')
      cy.wait('@get-devices2')

      // Filter for Windows devices
      cy.contains('Filter Tags').click({ force: true })
      cy.contains('.mat-option-text', 'Windows').click()

      // TODO: find a way to click off the tags table
      // TODO: find a good way to check if this test worked
    }
  })

  it('selects the first device', () => {
    cy.myIntercept('GET', /tags$/, {
      statusCode: apiResponses.tags.getAll.success.code,
      body: apiResponses.tags.getAll.success.response
    }).as('get-tags')

    cy.myIntercept('GET', 'devices?$top=25&$skip=0&$count=true', {
      statusCode: apiResponses.devices.getAll.success.code,
      body: apiResponses.devices.getAll.success.response
    }).as('get-devices')

    cy.goToPage('Devices')
    cy.wait('@get-devices').its('response.statusCode').should('eq', 200)
    cy.wait('@get-tags').its('response.statusCode').should('eq', 200)

    cy.get('mat-table mat-row:first').click()
  })
  // // TODO: Test if the first device is powered on. Currently the tests assume it is on.
  // it('Check state of first device', () => {
  //   cy.myIntercept('GET', /tags$/, {
  //     statusCode: apiResponses.tags.getAll.success.code,
  //     body: apiResponses.tags.getAll.success.response
  //   }).as('get-tags')

  //   cy.myIntercept('GET', 'devices?$top=25&$skip=0&$count=true', {
  //     statusCode: apiResponses.devices.getAll.success.code,
  //     body: apiResponses.devices.getAll.success.response
  //   }).as('get-devices')

  //   cy.goToPage('Devices')
  //   cy.wait('@get-devices').its('response.statusCode').should('eq', 200)
  //   cy.wait('@get-tags').its('response.statusCode').should('eq', 200)

  //   cy.contains('Connected').first()
  //   cy.contains('Power: On').first()
  // })
  it('power off the first device', () => {
    cy.myIntercept('GET', /tags$/, {
      statusCode: apiResponses.tags.getAll.success.code,
      body: apiResponses.tags.getAll.success.response
    }).as('get-tags')

    cy.myIntercept('GET', 'devices?$top=25&$skip=0&$count=true', {
      statusCode: apiResponses.devices.getAll.success.code,
      body: apiResponses.devices.getAll.success.response
    }).as('get-devices')

    cy.myIntercept('POST', /power/, {
      statusCode: apiResponses.devices.power.success.code,
      body: apiResponses.devices.power.success.response
    }).as('post-power')

    cy.goToPage('Devices')
    cy.wait('@get-devices').its('response.statusCode').should('eq', 200)
    cy.wait('@get-tags').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy="powerOff"]').first().click()
    // If testing on real hardware wait until the system stabilizes before the next test
    if (isolated !== 'y') {
      // // This line was removed since it was causing time based failure on tests about 5% of the time.
      // cy.get('[data-cy="powerSuccess"]').should('be.visible') 
      cy.wait(testDelayPowerOff)
    }
  })

  it('power off a powered off device', () => {
    cy.myIntercept('GET', /tags$/, {
      statusCode: apiResponses.tags.getAll.success.code,
      body: apiResponses.tags.getAll.success.response
    }).as('get-tags')

    cy.myIntercept('GET', 'devices?$top=25&$skip=0&$count=true', {
      statusCode: apiResponses.devices.getAll.success.code,
      body: apiResponses.devices.getAll.success.response
    }).as('get-devices')

    cy.myIntercept('POST', /power/, {
      statusCode: apiResponses.devices.power.success.code,
      body: apiResponses.devices.power.success.response
    }).as('post-power')

    cy.goToPage('Devices')
    cy.wait('@get-devices').its('response.statusCode').should('eq', 200)
    cy.wait('@get-tags').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy="powerOff"]').first().click()
    // // These lines were removed since it was causing time based failure on tests about 5% of the time.
    // if (isolated !== 'y') {
    // cy.get('[data-cy="powerNotSuccess"]').should('be.visible')
    // }
  })

  it('power on the first device', () => {
    cy.myIntercept('GET', /tags$/, {
      statusCode: apiResponses.tags.getAll.success.code,
      body: apiResponses.tags.getAll.success.response
    }).as('get-tags')

    cy.myIntercept('GET', 'devices?$top=25&$skip=0&$count=true', {
      statusCode: apiResponses.devices.getAll.success.code,
      body: apiResponses.devices.getAll.success.response
    }).as('get-devices')

    cy.myIntercept('POST', /power/, {
      statusCode: apiResponses.devices.power.success.code,
      body: apiResponses.devices.power.success.response
    }).as('post-power')

    cy.goToPage('Devices')
    cy.wait('@get-devices').its('response.statusCode').should('eq', 200)
    cy.wait('@get-tags').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy="powerOn"]').first().click()
    if (isolated !== 'y') {
      // // This line was removed since it was causing time based failure on tests about 5% of the time.
      // cy.get('[data-cy="powerSuccess"]').should('be.visible')
      cy.wait(testDelayPowerOn)
    }
  })

  it('power cycle the first device', () => {
    cy.myIntercept('GET', /tags$/, {
      statusCode: apiResponses.tags.getAll.success.code,
      body: apiResponses.tags.getAll.success.response
    }).as('get-tags')

    cy.myIntercept('GET', 'devices?$top=25&$skip=0&$count=true', {
      statusCode: apiResponses.devices.getAll.success.code,
      body: apiResponses.devices.getAll.success.response
    }).as('get-devices')

    cy.myIntercept('POST', /power/, {
      statusCode: apiResponses.devices.power.success.code,
      body: apiResponses.devices.power.success.response
    }).as('post-power')

    cy.goToPage('Devices')
    cy.wait('@get-devices').its('response.statusCode').should('eq', 200)
    cy.wait('@get-tags').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy="powerCycle"]').first().click()
    cy.wait('@post-power').its('response.statusCode').should('eq', 200)
    if (isolated !== 'y') {
      // // This line was removed since it was causing time based failure on tests about 5% of the time.
      // cy.get('[data-cy="powerSuccess"]').should('be.visible')
      cy.wait(testDelayPowerOn)
    }
  })
  it('batch power off the devices', () => {
    cy.myIntercept('GET', /tags$/, {
      statusCode: apiResponses.tags.getAll.success.code,
      body: apiResponses.tags.getAll.success.response
    }).as('get-tags')

    cy.myIntercept('GET', 'devices?$top=25&$skip=0&$count=true', {
      statusCode: apiResponses.devices.getAll.success.code,
      body: apiResponses.devices.getAll.success.response
    }).as('get-devices')

    cy.myIntercept('POST', /power/, {
      statusCode: apiResponses.devices.power.success.code,
      body: apiResponses.devices.power.success.response
    }).as('post-power')

    cy.goToPage('Devices')
    cy.wait('@get-devices').its('response.statusCode').should('eq', 200)
    cy.wait('@get-tags').its('response.statusCode').should('eq', 200)

    cy.get('[type="checkbox"]').first().check({ force: true })
    cy.get('[data-cy="powerOffBulk"]').click()

    cy.wait('@post-power').its('response.statusCode').should('eq', 200)
    if (isolated !== 'y') {
      cy.wait(testDelayPowerOff)
    }
  })
  it('batch power on the devices', () => {
    cy.myIntercept('GET', /tags$/, {
      statusCode: apiResponses.tags.getAll.success.code,
      body: apiResponses.tags.getAll.success.response
    }).as('get-tags')

    cy.myIntercept('GET', 'devices?$top=25&$skip=0&$count=true', {
      statusCode: apiResponses.devices.getAll.success.code,
      body: apiResponses.devices.getAll.success.response
    }).as('get-devices')

    cy.myIntercept('POST', /power/, {
      statusCode: apiResponses.devices.power.success.code,
      body: apiResponses.devices.power.success.response
    }).as('post-power')

    cy.goToPage('Devices')
    cy.wait('@get-devices').its('response.statusCode').should('eq', 200)
    cy.wait('@get-tags').its('response.statusCode').should('eq', 200)

    cy.get('[type="checkbox"]').first().check({ force: true })
    // cy.get('[data-cy="allHostnames"]').check()
    cy.get('[data-cy="powerUpBulk"]').click()

    cy.wait('@post-power').its('response.statusCode').should('eq', 200)
    if (isolated !== 'y') {
      cy.wait(testDelayPowerOn)
    }
  })
})

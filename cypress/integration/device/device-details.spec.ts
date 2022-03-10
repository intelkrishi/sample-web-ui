/*********************************************************************
 * Copyright (c) Intel Corporation 2021
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/
import { apiResponses } from '../../fixtures/api/apiResponses'

describe('Test device details page', () => {
  beforeEach('', () => {
    cy.setup()
  })

  it('should load the amt features on the device details page', () => {
    cy.myIntercept('GET', 'devices?$top=25&$skip=0&$count=true', {
      statusCode: apiResponses.eventLogs.devices.success.code,
      body: apiResponses.eventLogs.devices.success.response
    }).as('get-devices')

    cy.myIntercept('GET', /tags$/, {
      statusCode: apiResponses.tags.getAll.success.code,
      body: apiResponses.tags.getAll.success.response
    }).as('get-tags')

    cy.myIntercept('GET', /.*version.*/, {
      statusCode: apiResponses.eventLogs.version.success.code,
      body: apiResponses.eventLogs.version.success.response
    }).as('get-version')

    cy.myIntercept('GET', /.*hardwareInfo.*/, {
      statusCode: apiResponses.eventLogs.hardwareInfo.success.code,
      body: apiResponses.eventLogs.hardwareInfo.success.response
    }).as('get-hwInfo')

    cy.myIntercept('GET', /.*audit.*/, {
      statusCode: apiResponses.eventLogs.auditlog.success.code,
      body: apiResponses.eventLogs.auditlog.success.response
    }).as('get-auditlog')

    cy.myIntercept('GET', /.*features.*/, {
      statusCode: apiResponses.eventLogs.amtFeatures.success.code,
      body: apiResponses.eventLogs.amtFeatures.success.response
    }).as('get-features')

    cy.myIntercept('POST', /.*features.*/, {
      statusCode: 200,
      body: { status: 'success' }
    }).as('post-features')

    cy.goToPage('Devices')
    cy.wait('@get-devices').its('response.statusCode').should('eq', 200)

    cy.get('mat-row').click()

    cy.wait('@get-hwInfo').its('response.statusCode').should('eq', 200)
    cy.wait('@get-version').its('response.statusCode').should('eq', 200)
    cy.wait('@get-auditlog').its('response.statusCode').should('eq', 200)
    cy.wait('@get-features').its('response.statusCode').should('eq', 200)

    // System Summary
    cy.get('[data-cy="chipVersion"]').should('not.be.empty')
    cy.get('[data-cy="manufacturer"]').should('not.be.empty')
    // cy.get('[data-cy="manufacturer"]').contains('HP')
    cy.get('[data-cy="model"]').should('not.be.empty')
    cy.get('[data-cy="serialNumber"]').should('not.be.empty')
    cy.get('[data-cy="version"]').should('not.be.empty')
    cy.get('[data-cy="amtVersion"]').should('not.be.empty')

    // AMT Enabled Features
    cy.get('[data-cy="provisioningMode"]').should('not.be.empty')

    // BIOS Summary
    cy.get('[data-cy="biosManufacturer"]').should('not.be.empty')
    cy.get('[data-cy="biosVersion"]').should('not.be.empty')
    cy.get('[data-cy="biosReleaseData"]').should('not.be.empty')
    cy.get('[data-cy="biosTargetOS"]').should('not.be.empty')

    // Memory Summary
    // TODO: Check each channel reported by the device. Currently only checking the first element in the table
    cy.get('[data-cy="bankLabel"]').first().should('not.be.empty')
    cy.get('[data-cy="bankCapacity"]').first().should('not.be.empty')
    cy.get('[data-cy="bankMaxClockSpeed"]').first().should('not.be.empty')
    cy.get('[data-cy="bankSerialNumber"]').first().should('not.be.empty')

    // Audit log entries
    cy.get('[data-cy="auditLogEntry"]').its('length').should('be.gt', 0)

    // Event log entries
    cy.contains('Event Log').click()
    cy.get('[data-cy="eventLogEntry"]').its('length').should('be.gt', 0)

    // cy.get('mat-select').click()
    // cy.get('span').contains('none').click()
    // cy.wait('@post-features').should((req) => {
    //   expect(req.request.method).to.equal('POST')
    //   expect(req.request.body.userConsent).to.equal('none')
    //   expect(req.response.statusCode).to.equal(200)
    // })
  })
})

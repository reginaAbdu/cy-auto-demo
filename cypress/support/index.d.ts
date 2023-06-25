/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

import { config } from "cypress/types/bluebird";
module.exports = (on, config) =>  {
    require('cypress-xpath')     
}


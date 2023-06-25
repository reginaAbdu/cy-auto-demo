/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

import { BASIC_AUTH } from "../constants/user";
export class LoginPage {
    visit() {
        cy.visit('/zen/login.php')
    }

     getinputEmail () {
        return cy.get('#email');
    }

    getinputPassword () {
        return cy.get('#password');
    }

    getbtnSubmit () {
        return cy.xpath("//button[@id = 'password_submit']");
    }

    login() {
        this.visit()
        this.getinputEmail().type(BASIC_AUTH.username)
        this.getinputPassword().type(BASIC_AUTH.password)
        this.getbtnSubmit().click()
    }
}
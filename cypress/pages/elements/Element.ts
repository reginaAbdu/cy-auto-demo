/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import { AlertGroupingPopUp } from "./AlertGroupingPopUp";
import { EscalationPopup } from "./EscalationPopUp";
import { ResolvingPopUp } from "./ResolvingPopUp";
import { ScoreConfigPopUp } from "./ScoreConfigPopUp";



export class Element {
    get escalationPopUp() {
        return new EscalationPopup()
    }

    get resolvingPopUp() {
        return new ResolvingPopUp()
    }

    get alertGroupingPopUp() {
        return new AlertGroupingPopUp()
    }

    get scoreConfigPopUp() {
        return new ScoreConfigPopUp()
    }
}
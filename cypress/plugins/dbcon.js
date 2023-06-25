const mysqlssh = require('mysql-ssh');
const fs = require('fs');
const fse = require('fs-extra')
let threats = require('./threats');
const { arrayBuffer } = require('stream/consumers');
let arr = []
// let threats =[
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     },
//     {
//       "threatId": "2022-11-16T13:15:48.838Z",
//       "activities": [
//         {
//           "type": "incidentStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "unresolved"
//         },
//         {
//           "type": "analystVerdict",
//           "createdAt": "{{IsoTime}}",
//           "status": "true_positive"
//         },
//         {
//           "type": "threatStatus",
//           "createdAt": "{{IsoTime}}",
//           "status": "not_mitigated"
//         },
//         {
//           "type": "kill",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "quarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "success"
//         },
//         {
//           "type": "remediate",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending-reboot"
//         },
//         {
//           "type": "rollback",
//           "createdAt": "{{IsoTime}}",
//           "status": "pending"
//         },
//         {
//           "type": "unquarantine",
//           "createdAt": "{{IsoTime}}",
//           "status": "failed"
//         }
//       ]
//     }
//   ]
 
mysqlssh.connect(
    {
        host: 'sz2.dev.thesoc.us',
        user: 'ec2-user',
        privateKey: fs.readFileSync('C:/Users/R.Abdurakhmanova/.ssh/cw-strat-dev.pem')
    },
    {
        host: "zen-db-dev.c9a9xaaexuwa.us-east-1.rds.amazonaws.com",
        user: "root",
        password: "Ce0t!GCnN2P3!32342dgw",
        database: "zendb"
    }
)
.then(client => {
    client.query('SELECT threat_id FROM `s1_threats` limit 400', function (err, results, fields) {

        if (err) throw err
        for (let i= 0; i < 400; i++) {
           arr.push(results[i].threat_id)
        }
        var stringifiedThreats = JSON.stringify(threats)
var threatsObj = JSON.parse(stringifiedThreats)
for(let i = 0; i<400; i++) {
  stringifiedThreats = stringifiedThreats.replace('2022-11-16T13:15:48.838Z', arr[i])
 

}
stringifiedThreats = stringifiedThreats.replaceAll('IsoTime', "{{IsoTime}}")
const file = './new400.js'
fse.outputFileSync(file, `{"data": ${stringifiedThreats}}`)
        
      
        // console.log(threats[0].threatId)
        // results.map(el=> (el.threat_id).toString())
        // console.log((results[0].threat_id).toString())
        mysqlssh.close()

    })
})
.catch(err => {
    console.log(err)
})




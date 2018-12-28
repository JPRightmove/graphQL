var { buildSchema } = require('graphql');

/*
 {
     "id":"28e64894-bd6d-4647-b8ef-dd7fa6892c1f",
     "roles":["renter"],
     "name":{
         "givenName":"John-Paul",
         "middleName":"Philip",
         "familyName":"Harold"
        },
    "birthday":"1976-12-02T00:00:00Z",
    "contactDetails":{
        "emailAddress":"john-paul.harold@rightmove.co.uk",
        "telephoneNumber":"999"
    },
    "citizenships":["GB"],
    "affordability":{
        "occupations":[
            {
                "occupationType":"full-time-employed",
                "income":{
                    "frequency":"yearly",
                    "value":{
                        "currency":"GBP",
                        "amount":12000
                    }
                },
                "employed":{
                    "jobTitle":"Engineer",
                    "employer":{
                        "name":"Boo"
                    },
                    "startDate":"2015-01-01T00:00:00.000Z"
                },
                "id":"f87418c4-3dfb-41cf-b5b3-8032ed5ea67b"
            }
        ]
    },
        "signedLegalDocuments":[
            {
                "legalDocumentId":"c98a893b-e78c-4dd2-a9a1-ec3b6126de34",
                "signedDate":"2018-11-06T15:40:25.529Z"
            },
            {
                "legalDocumentId":"a096f838-ccea-41bc-b5d0-a428454b904e",
                "signedDate":"2018-12-10T14:21:54.153Z"
            },
            {
                "legalDocumentId":"567d0c15-65ae-4e26-8e6b-68230b86ca9c",
                "signedDate":"2018-12-10T14:21:59.100Z"
            },
            {
                "legalDocumentId":"880950ab-43ea-47d0-82c5-5bfab09d8eed",
                "signedDate":"2018-12-10T14:22:01.973Z"
            },
            {
                "legalDocumentId":"1d02a5be-dfa4-4854-8ed2-4b66c3465a0c",
                "signedDate":"2018-12-10T14:22:04.797Z"
            },
            {
                "legalDocumentId":"5ed37674-5c97-4e75-b013-ac76ca26fa3c",
                "signedDate":"2018-12-10T14:22:07.395Z"
            },
            {
                "legalDocumentId":"6aea37ed-d00c-48bb-85da-761f92b52bf6",
                "signedDate":"2018-12-10T14:22:10.357Z"
            },
            {
                "legalDocumentId":"bfba7b9a-4cff-4469-b139-9938a11db427",
                "signedDate":"2018-12-10T14:23:51.470Z"
            },
            {
                "legalDocumentId":"55f39afe-e58f-4efd-8e1f-97f134bd65e1",
                "signedDate":"2018-12-10T14:23:54.891Z"
            },
            {
                "legalDocumentId":"65d7d9b2-a04c-401a-bb5d-bac26f452629",
                "signedDate":"2018-12-10T14:24:39.504Z"
            }
        ],
        "addresses":[{
            "address":{
                "houseIdentifier":"26",
                "postcode":"N22 6PJ",
                "locality":"London",
                "streetName":"Farrant Avenue",
                "countryCode":"GB",
                "equifaxAddressId":"98000732970"
            },
            "moveInDate":"2015-04-01T11:49:00+01:00",
            "tenureType":"home-owner",
            "displayAddress":"26 Farrant Avenue, London, N22 6PJ"
        }],
        "lastLoggedIn":"2018-12-23T13:55:44.392Z",
        "updateDate":"2018-12-19T17:03:01.198Z",
        "hasApplication":true,
        "hasPassport":true
    }
 */

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Name {
    givenName: String
    middleName: String
    surname: String
  }

  type ContactDetails {
    emailAddress: String
    telephoneNumber: String
  }

  type SignedLegalDocument {
    legalDocumentId: ID!
    signedDate: String
  }

  type PropertyDetails {
    houseIdentifier: String
    postcode: String
    locality: String
    streetName: String
    countryCode: String
    equifaxAddressId: String
  }

  type AddressOverview {
    address: PropertyDetails
    moveInDate: String
    tenureType: String
    displayAddress: String
  }

  type User {
    id: ID!
    name: Name
    birthday: String
    contactDetails: ContactDetails
    signedLegalDocuments: [SignedLegalDocument]
    addresses: [AddressOverview]
  }

  type Query {
    user: User
  }
`);

module.exports = schema
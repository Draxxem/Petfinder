# Petfinder
Automated tests for the Petfinder API

#Setup instructions

Download latest version of Visual Studio Code
1. Create a folder on your C: drive named "CodeRepo", then Clone this repo - https://github.com/Draxxem/Petfinder.git to that location
2. Once cloned open the project in VS Code
3. In the terminal run the following command to get all required dependencies 'npm ci'

How to run the tests
- From terminal
1. To execute all tests run the following command 'npx playwright test'
2. To execute all tests tagged as '@workflow' only, run the following command 'npx playwright test --grep "@workflow"'
3. To view test Report run 'npx monocart show-report test-results/report.html'


#OR

- From Test Explorer
1. Install Playwright Test for VSCode extension
2. Test will be visible from Test Explorer



#Guthub Workflow
A test job is triggered whenever a branch gets merged into main branch
1. You can also view test results of workflow runs on Github Action tab
2. A Test report is available to download by selecting a Workflow run ---> https://github.com/Draxxem/Petfinder/actions
![alt text](image.png)

#Instructions on how to securly setup Petsfinder API Credentials
1. You need to create a PetFiner account https://www.petfinder.com/
2. Once you have the account you would need to be logged in, then visit https://www.petfinder.com/developers/
3. Generate the client id and client secret for Petfinder
4. Create an account with a open source Secrets Manager website
5. Once setup, store the Petfinder API client_id and secret_id on the secret manager's vault
6. generate client_id and client_secret for HashiCorp vault, this is needed to generate access_token to securely call the HashiCorp endpoint
6. Call the vault from the application or test framework in order to retrieve the Petfinder client_id and client_secret, which will be used to generate an access token in order to authorise the call to the petfinder API

#Overview of project structure
- The root directory contains key configuration files such as package.json for dependencies and .env, .gitignore 
- The tests folder contains the file with the tests
- functions folder contains function that handles the secret manager and access token for PetFinder API
- test results gets saved to the test-results folder
- .github/Workflows folder contains the .yml with instructons for Github Workflow

#Any assumptions or decisions made
- I made the decision to make use of HashiCorp vault to manage the secrets used for the PetFinder API oauth2 call as it had a free option
- I decided to use playwright, as it is very easy to use with node.js, very easy to install any required packages, lot's of support for it and out of the box configuration file and easy to setup test reporting

#List of tools and resources used
- VSCode
- Node.js
- HashiCorp Vault
- Playwright


#Evidence
![alt text](20250225_013359.jpg)
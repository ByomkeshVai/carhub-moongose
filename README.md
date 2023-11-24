# CarHub - Express and Mongoose Project

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
- [Linting and Formatting](#linting-and-formatting)
- [Testing](#testing)

## Introduction
CarHub is a project built with Express and Mongoose to manage car-related information.

## Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (Make sure it's running)

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd carHub
npm install
```
## Configuration
- PORT=5000
- DATABASE_URL - "Your MongoDB database"
- BCRYPT_SALT_ROUNDS= "Any Number"

## Running the Application

## Development Mode
```npm run start:dev
The server will be running at http://localhost:5000
```

## Production Mode
```npm run build
npm start:prod
```


## Linting and Formatting

```
Lint the code: npm run lint
```
```
fix litting issues: npm run lint:fix
```

## Format your code:
```
npm run prettier
```


## Testing
```
npm run test
```
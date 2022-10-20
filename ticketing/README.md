# Build a Ticketing App
- Users can list a ticker for an event (convert, sports) for sale
- Other users can purchase this ticket
- Any user can list tickets for sale and purchase tickets
- When a user attempts to purchase a ticket, the ticket is 'locked' for 15 minutes. The user has 15 minutes to enter their payment info.
- While locked, no other user can purchase the ticket. After 15 minutes, the ticket should 'unlock'
- Ticket prices can be edited if they are not locked

## Database
![Database of ticketing project](images/ticketingdb.jpg)

## Services
Introduce about main services we plan to build in this project!

### auth
Everything related to user as: signup/ signin/ signout

### tickets
Ticket creation/ editing. Knows whether a ticket can be updated

### orders
Order creation/ editing

### expiration
Watches for orders to be created, cancels them after 15 minutes

### payments
Handle credit card payments. Cancels orders if payments fails, completes if payment succeeds

## Events
- user-service
  - UserCreated
  - UserUpdated
- orders-service
  - OrderCreated
  - OrderCancelled
  - OrderExpired
- ticket-service
  - TicketCreated
  - TicketUpdated
- payments-service
  - ChargeCreated

## Project Architecture
![Project architecture](images/project_architecture.jpg)

### Steps to create Nodejs service with typescript
Install typescript at global
```
npm install typescript -g
```

Install typescript to Node.js project with command
```
npm install typescript ts-node-dev express @types/express
```

Init the tsconfig file in service
```
tsc --init
```

If you did not see your server restart after changing the index.ts file, do the following
- Open the package.json file in the ‘auth’ directory
- Find the 'start' script
Update the start script to the following:
```
ts-node-dev --poll src/index.ts
```

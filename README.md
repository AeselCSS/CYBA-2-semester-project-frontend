# CYBA-2-semester-project-frontend

## Deployment

Project is deployet at [DigitalOcean](https://cyba-2-semester-project-frontend-9v9wh.ondigitalocean.app/)

## Installation

1. Create a new repository locally on your computer, with a name of your choice.

2. Use the terminal to navigate to the directory

3. Clone repository

```markdown
git clone https://github.com/AeselCSS/CYBA-2-semester-project-frontend.git .
```

4. Install necessary dependencies

```markdown
npm install
```

5. Create an .env file in the root of the project.

6. Copy the .env variables from the appendix in the report.

-   It should look something like this

```
VITE_AUTH0_DOMAIN="Inset domain"
VITE_AUTH0_CLIENT_ID="Inset ID"
VITE_AUTH0_CALLBACK_URL="Inset callback url"
```

7. Before running the frontend, make sure the [backend](https://github.com/YawHB/CYBA-2-semester-project-backend) is running

8. Run the program

```
npm run dev
```

9. Congrats. Now the frontend should be up and running🥳

# Brasimundo web

Next.js site that shows the numbers collected by `brasimundo-data` (the ingestion job).
Each value shows its date, source and status. A value is never shown as current if its
date is in the future or its source is out of date.

## Run it on your computer

    npm install
    cp .env.example .env.local      # then set DATA_BASE_URL (see below)
    npm run dev                     # open http://localhost:3000

## Connect it to your data

`DATA_BASE_URL` must point to the `data` folder of your data repo, on GitHub's raw address:

    DATA_BASE_URL=https://raw.githubusercontent.com/YOUR-USER/brasimundo-data/main/data

The data repo must be **public**, or the site cannot read the files.

## Deploy (free, about 10 minutes)

1. Push this folder to a new GitHub repo, e.g. `brasimundo-web`.
2. Go to vercel.com, sign in with GitHub, choose "Add New Project" and import that repo.
3. Before pressing Deploy, open "Environment Variables" and add `DATA_BASE_URL` with the value above.
4. Press Deploy. Vercel gives you a link like `brasimundo-web.vercel.app`.
5. To change the data address later, edit the variable and redeploy.

The site re-reads the data every 15 minutes, so new collections appear without a redeploy.

## What is in the site

- `/` Terminal: official indicators from the data repo (Selic, IPCA, unemployment, gross debt, Focus IPCA forecast, dollar, euro), plus manual indicators labelled with their date.
- `/status` Status dos dados: live fetch result, data date, age and status for each source.
- `/metodologia` verification levels N1 to N5 and display rules.

Manual values live in `lib/manual.js`. Update them there when you update the numbers.

## Not built yet
- Ibovespa (needs a B3 licence) and the trade surplus (needs an open feed) are still manual.
- Economic calendar, risk tracker, state explorer, price engine and calculators from the original site.

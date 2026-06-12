# ML Engineer Portfolio

Portfolio website for **Semyon Sidorov** — Aspiring Machine Learning Engineer. Built with Next.js 15, TypeScript, and Tailwind CSS. Connects to external FastAPI inference services for live ML demos.

## Features

- **Home** — Landing page with social links and project overview
- **About** — Career transition story and ML engineering focus areas
- **Projects** — Two ML projects with metrics, architecture, GitHub links, and demo sections
- **Fraud Detection Demo** — CSV upload to external `POST /predict_batch` endpoint
- **Exoplanet Demo** — Prediction form connected to external API when configured
- **Contact** — Contact page

## Tech Stack

| Layer    | Technology                        |
| -------- | --------------------------------- |
| Frontend | Next.js 15, React 19, TypeScript |
| Styling  | Tailwind CSS (dark mode)          |
| Charts   | Recharts                          |
| ML APIs  | External FastAPI services         |

## Project Structure

```
portfolio_web/
├── frontend/
│   ├── src/
│   │   ├── app/              # Pages & routing
│   │   ├── components/       # UI, layout, demo components
│   │   └── lib/
│   │       ├── api/          # External API client layer
│   │       ├── constants.ts
│   │       └── types.ts
│   └── package.json
└── README.md
```

This repository contains **only the frontend**. ML inference runs on separate FastAPI services configured via environment variables. No prediction logic exists in this codebase.

## Getting Started

### Prerequisites

- Node.js 18+

### Frontend

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Site: [http://localhost:3000](http://localhost:3000)g

## External API Configuration

### Fraud Detection

Set `NEXT_PUBLIC_FRAUD_API_URL` to your deployed fraud detection FastAPI service.

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| POST   | `/predict_batch` | CSV upload, batch predictions |

Client: `frontend/src/lib/api/fraud.ts`

### Exoplanet Classification

Set `NEXT_PUBLIC_EXOPLANET_API_URL` when the inference service is deployed. Optionally set `NEXT_PUBLIC_EXOPLANET_PREDICT_PATH` (default: `/predict_batch`).

If not configured, the exoplanet demo displays an availability notice.

Client: `frontend/src/lib/api/exoplanet.ts`

## Environment Variables

| Variable                            | Required | Description                              |
| ----------------------------------- | -------- | ---------------------------------------- |
| `NEXT_PUBLIC_FRAUD_API_URL`         | For fraud demo | Base URL of fraud detection API    |
| `NEXT_PUBLIC_EXOPLANET_API_URL`     | For exoplanet demo | Base URL of exoplanet API        |
| `NEXT_PUBLIC_EXOPLANET_PREDICT_PATH`| No       | Predict endpoint path (default: `/predict`) |

## License

MIT

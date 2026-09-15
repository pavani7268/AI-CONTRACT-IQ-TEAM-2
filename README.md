# AI Contract IQ — Backend

FastAPI + PostgreSQL backend for AI Contract IQ. Handles auth, contract file
storage, AI analysis persistence, and PDF report generation. Designed to plug
straight into your existing React/Vite frontend and AI/LLM analysis logic.

## Stack

- **FastAPI** (async) — REST API, Swagger docs at `/docs`
- **PostgreSQL** + **SQLAlchemy 2.0 (async)** — database layer
- **Alembic** — migrations
- **JWT** (python-jose) + **bcrypt** (passlib) — auth
- **reportlab** — PDF report generation

## Project layout

```
app/
  main.py            # FastAPI app, CORS, router wiring
  config.py           # env-based settings
  database.py          # async engine/session
  models/            # SQLAlchemy ORM models (users, contracts, contract_analysis, reports)
  schemas/            # Pydantic request/response schemas
  auth/               # password hashing, JWT, auth dependency
  routers/            # auth, contracts, analysis, reports endpoints
  services/            # file storage, AI analysis hook, PDF generation
  core/               # shared exceptions + handlers
alembic/              # migrations
storage/
  contracts/           # uploaded contract files
  reports/            # generated PDF reports
```

## 1. Setup

```bash
python3 -m venv .venv
source .venv/bin/activate       # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# edit .env: set DATABASE_URL, DATABASE_URL_SYNC, JWT_SECRET_KEY, etc.
```

Create the database:

```bash
createdb ai_contract_iq
# or: psql -U postgres -c "CREATE DATABASE ai_contract_iq;"
```

## 2. Run migrations

```bash
alembic upgrade head
```

This creates `users`, `contracts`, `contract_analysis`, and `reports` tables
with the foreign keys wired up (see `alembic/versions/0001_initial_schema.py`).

If you change any model later, generate a new migration:

```bash
alembic revision --autogenerate -m "describe your change"
alembic upgrade head
```

## 3. Run the server

```bash
uvicorn app.main:app --reload --port 8000
```

- API base URL: `http://localhost:8000`
- Swagger docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- Health check: `GET /api/health`

CORS is pre-configured for `http://localhost:3000` (set via `CORS_ORIGINS` in `.env`).

## 4. Connect your AI/LLM analysis logic

All AI integration lives in **one file**: `app/services/ai_analysis.py`.
It ships with a working placeholder so the API is fully functional end-to-end
immediately. Replace the body of `run_analysis()` with a call into your
existing analysis code — the function just needs to return a
`ContractAnalysisCreate` (risk score, risk level, summary, key clauses,
compliance flags). Nothing else in the backend needs to change.

## 5. API endpoints

All routes are prefixed `/api`.

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/register` | — | Register a new user, returns tokens |
| POST | `/api/login` | — | Log in, returns access + refresh tokens |
| POST | `/api/refresh` | — | Exchange refresh token for new access token |
| GET | `/api/me` | ✓ | Current user profile |
| POST | `/api/contracts` | ✓ | Upload a contract file (multipart/form-data, field `file`) |
| GET | `/api/contracts` | ✓ | List current user's contracts (optional `?status=` filter) |
| GET | `/api/contracts/{id}` | ✓ | Get contract detail + analysis |
| DELETE | `/api/contracts/{id}` | ✓ | Delete a contract (file + DB rows) |
| POST | `/api/contracts/{id}/analyze` | ✓ | Trigger AI analysis, persist results |
| GET | `/api/contracts/{id}/analysis` | ✓ | Get stored analysis results |
| POST | `/api/contracts/{id}/report` | ✓ | Generate a PDF report from the analysis |
| GET | `/api/contracts/{id}/reports` | ✓ | List generated reports for a contract |
| GET | `/api/reports/{report_id}/download` | ✓ | Download a report PDF |
| GET | `/api/health` | — | Health check |

Protected routes expect `Authorization: Bearer <access_token>`.

### Register / Login payloads

```json
// POST /api/register
{ "email": "user@example.com", "full_name": "Jane Doe", "password": "SecurePass123" }

// POST /api/login
{ "email": "user@example.com", "password": "SecurePass123" }
```

Both return:

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "token_type": "bearer",
  "user": { "id": "...", "email": "...", "full_name": "...", "is_active": true, "created_at": "..." }
}
```

> **Note:** these payload field names (`email`, `full_name`, `password`) are a
> best-effort match to typical React auth forms. If your existing frontend
> sends different field names (e.g. `name` instead of `full_name`, or uses
> `username`), update `app/schemas/user.py` / `app/schemas/auth.py` to match —
> it's a one-line change per field.

## 6. File upload constraints

Configured via `.env`:
- `ALLOWED_UPLOAD_EXTENSIONS` (default `.pdf,.docx`)
- `MAX_UPLOAD_SIZE_MB` (default `15`)

Invalid type → `415 Unsupported Media Type`. Oversized file → `413 Request
Entity Too Large` (streamed check, not loaded fully into memory first).

## 7. Error format

All errors return:

```json
{ "detail": "human readable message" }
```

with correct status codes (`400`, `401`, `403`, `404`, `409`, `413`, `415`,
`422`, `500`).

## 8. Production notes

- Set a strong random `JWT_SECRET_KEY`.
- Put `storage/` behind a real object store (S3/GCS) for production — swap
  the internals of `app/services/file_storage.py`.
- Run behind a reverse proxy (nginx) with HTTPS.
- Consider a short-lived access token + refresh-token rotation policy.

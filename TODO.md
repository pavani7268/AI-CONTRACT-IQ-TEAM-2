# AI Contract IQ - Feature Enhancement TODO

## Backend (ai-contract-iq/)

- [ ] Step 1: Add `pypdf` and `python-docx` to requirements.txt (fixes broken text extraction / risk detection)
- [ ] Step 2: Install pypdf + python-docx in the venv
- [ ] Step 3: Add `GET /api/report?contract_id=` endpoint in reports.py for the Compliance Report page
- [ ] Step 4: Log analyze/chat/compare/report actions to history (for a complete History page)

## Frontend (frontend/)

- [ ] Step 5: Add report generation/download functions to services/api.js
- [ ] Step 6: Fix ContractViewer.jsx (real backend fields, risk gauge, real analysis, PDF report download)
- [ ] Step 7: Rewrite CompareContracts.jsx (select 2 analyzed contracts → real /compare API)
- [ ] Step 8: Rewrite ComplianceReport.jsx (select a contract → real /api/report data)
- [ ] Step 9: Update Chat.jsx (contract selector → real /api/chat knowledge base)
- [ ] Step 10: Update Dashboard.jsx (real risk counts from analysis data)

## Verification

- [ ] Step 11: Rebuild frontend, restart backend, test full flow (register → upload → analyze → risks → compare → chat → report)


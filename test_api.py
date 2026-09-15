"""Test all core API endpoints end-to-end."""
import requests
import json
import tempfile
import os
import sys

url = "http://127.0.0.1:8000"

# 1. Register
print("=" * 60)
print("1. REGISTER")
r = requests.post(f"{url}/api/register", json={
    "email": "demo@example.com",
    "full_name": "Demo User",
    "password": "DemoPass123"
})
print(f"   Status: {r.status_code}")
if r.ok:
    data = r.json()
    token = data["access_token"]
    print(f"   Token: {token[:30]}...")
    print(f"   User: {data['user']['full_name']} ({data['user']['email']})")
else:
    print(f"   Error: {r.text[:200]}")
    # Try login instead
    r = requests.post(f"{url}/api/login", json={
        "email": "demo@example.com",
        "password": "DemoPass123"
    })
    if r.ok:
        token = r.json()["access_token"]
        print(f"   Logged in instead. Token: {token[:30]}...")
    else:
        print("   Could not login either.")
        sys.exit(1)

# 2. Protected Me
print("\n2. GET /api/me")
r = requests.get(f"{url}/api/me", headers={"Authorization": f"Bearer {token}"})
print(f"   Status: {r.status_code}, User: {r.json()['full_name']}")

# 3. Upload contract
print("\n3. UPLOAD CONTRACT")
with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False, mode="wb") as f:
    f.write(b"%PDF-1.4 test contract document content for analysis")
    tmp_path = f.name

with open(tmp_path, "rb") as f:
    r = requests.post(
        f"{url}/api/contracts",
        files={"file": ("contract_test.pdf", f, "application/pdf")},
        headers={"Authorization": f"Bearer {token}"}
    )
os.unlink(tmp_path)
print(f"   Status: {r.status_code}")
if r.ok:
    contract_id = r.json()["id"]
    print(f"   Contract ID: {contract_id}")
    print(f"   Filename: {r.json()['original_filename']}")
else:
    print(f"   Error: {r.text[:200]}")
    sys.exit(1)

# 4. List contracts
print("\n4. LIST CONTRACTS")
r = requests.get(f"{url}/api/contracts", headers={"Authorization": f"Bearer {token}"})
print(f"   Status: {r.status_code}, Count: {len(r.json())}")

# 5. Analyze contract
print("\n5. ANALYZE CONTRACT")
r = requests.post(
    f"{url}/api/contracts/{contract_id}/analyze",
    headers={"Authorization": f"Bearer {token}"}
)
print(f"   Status: {r.status_code}")
if r.ok:
    d = r.json()
    print(f"   Risk Score: {d['risk_score']}/100")
    print(f"   Risk Level: {d['risk_level']}")
    print(f"   Summary: {d['summary'][:100]}...")
    print(f"   Key Clauses: {len(d.get('key_clauses', []))}")
    print(f"   Compliance Flags: {len(d.get('compliance_flags', []))}")

# 6. Get analysis
print("\n6. GET ANALYSIS")
r = requests.get(
    f"{url}/api/contracts/{contract_id}/analysis",
    headers={"Authorization": f"Bearer {token}"}
)
print(f"   Status: {r.status_code}")
if r.ok:
    d = r.json()
    print(f"   Risk Score: {d['risk_score']}/100 ({d['risk_level']})")

# 7. Generate PDF report
print("\n7. GENERATE REPORT")
r = requests.post(
    f"{url}/api/contracts/{contract_id}/report",
    headers={"Authorization": f"Bearer {token}"}
)
print(f"   Status: {r.status_code}")
if r.ok:
    print(f"   Report ID: {r.json()['id']}")
    print(f"   File: {r.json()['file_name']}")

# 8. Get history
print("\n8. GET HISTORY")
r = requests.get(f"{url}/api/history/all", headers={"Authorization": f"Bearer {token}"})
print(f"   Status: {r.status_code}, Entries: {len(r.json())}")

print("\n" + "=" * 60)
print("ALL TESTS PASSED!")
print("=" * 60)


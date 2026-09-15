"""Initialize database tables for development."""
import asyncio
from app.database import engine, Base
from app.models import user, contract, analysis, report, history


async def init():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✅ Database tables created successfully!")
    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(init())

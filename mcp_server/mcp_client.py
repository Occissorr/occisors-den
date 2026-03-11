import atexit
import asyncio
from fastmcp.client.client import Client

_mcp_client: Client | None = None

MCP_URL = "https://viper-bot.onrender.com/mcp"

async def start_mcp():
    global _mcp_client
    if _mcp_client is None:
        _mcp_client = Client(MCP_URL)
        await _mcp_client.__aenter__()
        print("✅ MCP client connected")

def get_mcp_client() -> Client:
    if _mcp_client is None:
        raise RuntimeError("MCP client not started. Call start_mcp() first.")
    return _mcp_client

async def stop_mcp():
    global _mcp_client
    if _mcp_client is not None:
        await _mcp_client.__aexit__(None, None, None)
        _mcp_client = None
        print("🛑 MCP client closed")

@atexit.register
def _cleanup():
    try:
        if _mcp_client is None:
            return

        try:
            loop = asyncio.get_running_loop()
            loop.create_task(stop_mcp())
        except RuntimeError:
            asyncio.run(stop_mcp())

    except Exception:
        pass

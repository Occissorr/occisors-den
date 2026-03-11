from mcp_server.mcp_client import get_mcp_client

async def mcp_greet(name: str) -> str:
    client = get_mcp_client()

    result = await client.call_tool(
        "get_greeting",
        {"name": name}
    )

    if result.is_error:
        raise Exception(f"MCP Tool Error: {result.error_message}")

    return result.data

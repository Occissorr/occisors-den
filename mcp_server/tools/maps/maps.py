from mcp_server.mcp_client import get_mcp_client

async def mcp_get_all_maps():
    client = get_mcp_client()

    result = await client.call_tool("get_all_maps", {})

    if result.is_error:
        raise Exception(result.error_message)

    return result.data


async def mcp_get_map_info(map_id: str):
    client = get_mcp_client()

    result = await client.call_tool(
        "get_map_info",
        {"map_id": map_id}
    )

    if result.is_error:
        raise Exception(result.error_message)

    return result.data


async def mcp_is_map_active(map_id: str):
    client = get_mcp_client()

    result = await client.call_tool(
        "is_map_active",
        {"map_id": map_id}
    )

    if result.is_error:
        raise Exception(result.error_message)

    return result.data

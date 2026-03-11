from fastmcp import FastMCP

# import map tools
from mcp_server.tools.maps.maps import (
    mcp_get_all_maps,
    mcp_get_map_info,
    mcp_is_map_active
)

mcp = FastMCP("viper-mcp-server")

# register map tools
mcp.tool()(mcp_get_all_maps)
mcp.tool()(mcp_get_map_info)
mcp.tool()(mcp_is_map_active)

def run_mcp():
    mcp.run(
        transport="http",
        host="0.0.0.0",
        port=8765,
    )

run_mcp()
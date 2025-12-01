export const isLocalNetwork = () => {
  const { hostname } = window.location;

  // localhost or .local domains
  if (hostname === "localhost" || hostname.endsWith(".local")) {
    return true;
  }

  // IPv6 loopback (with or without brackets)
  if (hostname === "::1" || hostname === "[::1]") {
    return true;
  }

  // IPv6 link-local and unique local addresses (brackets stripped for comparison)
  const ipv6 = hostname.startsWith("[") ? hostname.slice(1, -1) : hostname;
  if (
    ipv6.toLowerCase().startsWith("fe80:") ||
    ipv6.toLowerCase().startsWith("fc00:") ||
    ipv6.toLowerCase().startsWith("fd00:")
  ) {
    return true;
  }

  // IPv4 loopback addresses (127.x.x.x)
  if (hostname.startsWith("127.")) {
    return true;
  }

  // IPv4 private network ranges
  // 192.168.x.x
  if (hostname.startsWith("192.168.")) {
    return true;
  }

  // 10.x.x.x
  if (hostname.startsWith("10.")) {
    return true;
  }

  // 172.16.x.x to 172.31.x.x
  if (hostname.startsWith("172.")) {
    const secondOctet = Number.parseInt(hostname.split(".")[1] as string);
    if (secondOctet >= 16 && secondOctet <= 31) {
      return true;
    }
  }

  return false;
};

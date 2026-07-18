FROM catthehacker/ubuntu:act-latest
COPY ca-bundle.crt /usr/local/share/ca-certificates/ccr-proxy.crt
RUN update-ca-certificates
# drop blocked third-party apt sources (packagecloud git-lfs 403s via egress policy)
RUN rm -f /etc/apt/sources.list.d/*git-lfs* /etc/apt/sources.list.d/*github* 2>/dev/null || true
# bake Google Chrome (dl.google.com reachable in-container once CA is trusted),
# then wrap the binary so it always runs with --no-sandbox (act runs as root)
RUN deb="$(mktemp --suffix=.deb)" && \
    curl -fsSL -o "$deb" https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get update && apt-get install -y "$deb" && rm -f "$deb" && \
    mv /opt/google/chrome/chrome /opt/google/chrome/chrome.real && \
    printf '#!/bin/bash\nexec /opt/google/chrome/chrome.real --no-sandbox --disable-gpu --disable-dev-shm-usage "$@"\n' > /opt/google/chrome/chrome && \
    chmod +x /opt/google/chrome/chrome && \
    google-chrome-stable --version

function openLink(link) {
    if (link.startsWith("http"))
        ipc.send("openLink", link);
    else window.location.href = link;
}

function send(channel, data) {
    return ipc.send(channel, data);
}

window.send = send;
export { openLink };
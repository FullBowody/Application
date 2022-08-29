function openLink(link) {
    if (link.startsWith("http"))
        ipc.send("openLink", link);
    else window.location.href = link;
}

export { openLink };
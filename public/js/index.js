if ('serviceWorker' in navigator && 'PushManager' in window) {
    addEventListener('load', async() => {
        let sw = await navigator.serviceWorker.register('./sw.js');
        console.log(sw);

        let sws = await navigator.serviceWorker.ready;
        let push = await sws.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BNBAt-CItQKq7rOT3SibPF9HVv70peMAirxLrrNVFsSatt3FvsUJygD9tuZWaBH_A3CinHn7580Ler6tAYi9ALs'
        })
        console.log(JSON.stringify(push));
    })
} else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
}
readyPromise.then(() => {
    avatarGenerator(document.body, 'poide');
    avatarGenerator(document.body, 'Erzat', { background: '#fffdf0' });
    avatarGenerator(document.body, 'Plok');
    avatarGenerator(document.body, 'Plok', { size: 150 });
})

readyPromise.then(() => {
    const nameElement = document.getElementById('name');
    const nameShown = document.getElementById('nameShown');
    const avatar = document.getElementById('avatar');
    const form = document.getElementById('form');

    const onChange = () => {
        let name = nameElement.value || '';
        name = name.trim();
        if (name === '') {
            name = md5(`${Math.random()}`).slice(0, 8)
        }
        if (name !== '') {
            avatarGenerator(avatar, name);
        } else {
            avatar.innerHTML = '';
        }
        nameShown.textContent = `~ ${name} ~`;
    }
    onChange();
    nameElement.addEventListener('input', (e) => onChange());
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onChange();
        return false;
    });
})

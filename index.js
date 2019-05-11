readyPromise.then(() => {
    const nameElement = document.getElementById('name');
    const nameShown = document.getElementById('nameShown');
    const avatar = document.getElementById('avatar');
    const form = document.getElementById('form');

    const getHash = () => {
        let hash = window.location.hash;
        if (hash.length>0 && hash.startsWith('#')) {
            hash = hash.slice(1);
        }
        return decodeURI(hash);
    };
    const setHash = (name) => {
        let hash = getHash();
        if (hash !== name) {
            window.location.hash = name;
        }
    };
    const getInput = () => nameElement.value;
    const setInput = (name) => {
        let input = getInput();
        if (input !== name) {
            nameElement.value = name;
        }
    }

    const generateNewAvatar = (name) => {
        name = name || '';
        name = name.trim();
        setInput(name);
        setHash(name);
        if (name === '') {
            name = md5(`${Math.random()}`).slice(0, 8)
        }
        if (name !== '') {
            avatarGenerator(avatar, name);
        } else {
            avatar.innerHTML = '';
        }
        nameShown.textContent = `~ ${name} ~`;
    };
    const onChange = () => {
        const name = getInput();
        generateNewAvatar(name);
    }
    const onHashChange = () => {
        const name = getHash();
        generateNewAvatar(name);
    }
    onHashChange();
    window.addEventListener('hashchange', (e) => onHashChange());
    nameElement.addEventListener('input', (e) => onChange());
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onChange();
        return false;
    });
})

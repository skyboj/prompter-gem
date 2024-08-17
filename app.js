const inputField = document.getElementById('synced-text');

// Инициализация Replicache
const replicache = new window.Replicache({
    name: 'my-replicache',
    mutators: {
        updateText: async (_, { text }) => {
            await replicache.put('text', text);
        },
    },
});

// Синхронизация текста
async function syncText() {
    const text = await replicache.get('text');
    inputField.value = text || '';

    inputField.addEventListener('input', async () => {
        await replicache.mutate.updateText({ text: inputField.value });
    });
}

syncText();

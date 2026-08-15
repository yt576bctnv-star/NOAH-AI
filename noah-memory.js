const NOAH_MEMORY_KEY = "noah_memory";

function getMemory() {
    const savedMemory = localStorage.getItem(NOAH_MEMORY_KEY);

    if (!savedMemory) {
        return [];
    }

    try {
        return JSON.parse(savedMemory);
    } catch (error) {
        console.error("Error leyendo la memoria de Noah:", error);
        return [];
    }
}

function saveMemory(memory) {
    localStorage.setItem(
        NOAH_MEMORY_KEY,
        JSON.stringify(memory)
    );
}

function remember(text) {
    const memory = getMemory();

    memory.push({
        id: Date.now(),
        text: text,
        createdAt: new Date().toISOString()
    });

    saveMemory(memory);

    return true;
}

function forget(text) {
    const memory = getMemory();

    const updatedMemory = memory.filter(
        item => item.text.toLowerCase() !== text.toLowerCase()
    );

    saveMemory(updatedMemory);

    return memory.length !== updatedMemory.length;
}

function getAllMemories() {
    return getMemory();
}

function clearMemory() {
    localStorage.removeItem(NOAH_MEMORY_KEY);
}
